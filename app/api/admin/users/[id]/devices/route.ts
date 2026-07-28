import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: NextResponse.json({ error: 'No autenticado' }, { status: 401 }) };
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') return { error: NextResponse.json({ error: 'No autorizado' }, { status: 403 }) };
  return { user, adminClient: createAdminClient() };
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { id } = await params;

    const { data: devices, error } = await auth.adminClient
      .from('user_devices')
      .select('*')
      .eq('user_id', id)
      .order('last_active_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ devices: devices || [] });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
