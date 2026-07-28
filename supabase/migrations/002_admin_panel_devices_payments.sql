-- =============================================
-- Migration 002: Admin panel, device tracking, MercadoPago prep
-- =============================================

-- Add new columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_devices INTEGER NOT NULL DEFAULT 3;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'inactive';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mercado_pago_subscription_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- =============================================
-- User Devices table
-- =============================================
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  device_fingerprint TEXT NOT NULL,
  device_name TEXT,
  user_agent TEXT,
  ip_address TEXT,
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, device_fingerprint)
);

ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

-- Users can read their own devices
CREATE POLICY "Users can view own devices"
  ON user_devices FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all devices
CREATE POLICY "Admins can view all devices"
  ON user_devices FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert devices
CREATE POLICY "Admins can insert devices"
  ON user_devices FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete devices
CREATE POLICY "Admins can delete devices"
  ON user_devices FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Service role can do everything (for API routes using admin client)
CREATE POLICY "Service role full access on devices"
  ON user_devices FOR ALL
  USING (true);

-- =============================================
-- Payments table (MercadoPago prep)
-- =============================================
CREATE TYPE payment_status AS ENUM ('pending', 'approved', 'rejected', 'refunded', 'cancelled');

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  external_id TEXT UNIQUE,
  status payment_status NOT NULL DEFAULT 'pending',
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all payments
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert payments
CREATE POLICY "Admins can insert payments"
  ON payments FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Service role full access
CREATE POLICY "Service role full access on payments"
  ON payments FOR ALL
  USING (true);

-- =============================================
-- Functions
-- =============================================

-- Count devices for a user
CREATE OR REPLACE FUNCTION public.count_user_devices(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*)::INTEGER FROM user_devices WHERE user_id = p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user can register a new device
CREATE OR REPLACE FUNCTION public.can_register_device(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_count INTEGER;
BEGIN
  SELECT * INTO v_profile FROM profiles WHERE id = p_user_id;
  IF NOT FOUND OR NOT v_profile.is_active THEN
    RETURN false;
  END IF;
  SELECT COUNT(*) INTO v_count FROM user_devices WHERE user_id = p_user_id;
  RETURN v_count < v_profile.max_devices;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update updated_at on profiles
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_profiles_updated_at();

-- =============================================
-- Create admin service role for API routes
-- =============================================
-- NOTE: You need to create a service_role key in Supabase Dashboard:
-- Settings > API > service_role (secret)
-- Add it to .env.local as SUPABASE_SERVICE_ROLE_KEY
