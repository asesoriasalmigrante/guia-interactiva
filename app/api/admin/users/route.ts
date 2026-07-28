import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  const array = new Uint8Array(12);
  crypto.getRandomValues(array);
  for (let i = 0; i < 12; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: NextResponse.json({ error: 'No autenticado' }, { status: 401 }) };
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') return { error: NextResponse.json({ error: 'No autorizado' }, { status: 403 }) };
  return { user, adminClient: createAdminClient() };
}

export async function GET() {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;

    const { data: profiles, error: profilesError } = await auth.adminClient
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    const { data: deviceCounts } = await auth.adminClient
      .from('user_devices')
      .select('user_id');

    const counts: Record<string, number> = {};
    if (deviceCounts) {
      for (const d of deviceCounts) {
        counts[d.user_id] = (counts[d.user_id] || 0) + 1;
      }
    }

    const usersWithCounts = (profiles || []).map((p) => ({
      ...p,
      device_count: counts[p.id] || 0,
    }));

    return NextResponse.json({ users: usersWithCounts });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;

    const body = await request.json();
    const { email, full_name, max_devices = 3 } = body;

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'El correo es requerido' }, { status: 400 });
    }

    const tempPassword = generateTempPassword();

    const { data: authUser, error: createError } = await auth.adminClient.auth.admin.createUser({
      email: email.trim(),
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || '',
        role: 'user',
      },
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }

    await auth.adminClient
      .from('profiles')
      .update({
        full_name: full_name || '',
        max_devices,
        created_by: auth.user.id,
      })
      .eq('id', authUser.user.id);

    return NextResponse.json({
      user: {
        id: authUser.user.id,
        email: authUser.user.email,
        full_name,
        temp_password: tempPassword,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
