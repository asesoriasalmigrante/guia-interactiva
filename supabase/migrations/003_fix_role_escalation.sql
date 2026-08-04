-- Migration 003: Fix privilege escalation in handle_new_user() trigger
-- The previous trigger read role from raw_user_meta_data, allowing any user
-- to self-assign admin role during signup. This fix always assigns 'user' role.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
