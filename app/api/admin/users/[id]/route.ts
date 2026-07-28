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

    const { data: profile, error } = await auth.adminClient
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !profile) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const { data: devices } = await auth.adminClient
      .from('user_devices')
      .select('*')
      .eq('user_id', id)
      .order('last_active_at', { ascending: false });

    const { data: payments } = await auth.adminClient
      .from('payments')
      .select('*')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({ profile, devices: devices || [], payments: payments || [] });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { id } = await params;

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.is_active !== undefined) updates.is_active = body.is_active;
    if (body.max_devices !== undefined) updates.max_devices = body.max_devices;
    if (body.full_name !== undefined) updates.full_name = body.full_name;
    if (body.subscription_status !== undefined) updates.subscription_status = body.subscription_status;

    const { error } = await auth.adminClient
      .from('profiles')
      .update(updates)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { id } = await params;

    const { error } = await auth.adminClient.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
