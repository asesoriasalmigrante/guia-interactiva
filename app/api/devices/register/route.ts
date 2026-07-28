import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_active, max_devices')
      .eq('id', user.id)
      .single();

    if (!profile || !profile.is_active) {
      return NextResponse.json({ error: 'Cuenta desactivada' }, { status: 403 });
    }

    const body = await request.json();
    const { device_fingerprint, device_name, user_agent } = body;

    if (!device_fingerprint) {
      return NextResponse.json({ error: 'device_fingerprint requerido' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: existing } = await adminClient
      .from('user_devices')
      .select('id')
      .eq('user_id', user.id)
      .eq('device_fingerprint', device_fingerprint)
      .single();

    if (existing) {
      await adminClient
        .from('user_devices')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', existing.id);

      return NextResponse.json({ success: true, device_id: existing.id });
    }

    const { count } = await adminClient
      .from('user_devices')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count && count >= profile.max_devices) {
      return NextResponse.json({
        error: `Has alcanzado el límite de ${profile.max_devices} dispositivos. Elimina uno existente para registrar uno nuevo.`,
        code: 'DEVICE_LIMIT_REACHED',
      }, { status: 403 });
    }

    const { data: newDevice, error: insertError } = await adminClient
      .from('user_devices')
      .insert({
        user_id: user.id,
        device_fingerprint,
        device_name: device_name || null,
        user_agent: user_agent || null,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
      })
      .select('id')
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, device_id: newDevice.id });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
