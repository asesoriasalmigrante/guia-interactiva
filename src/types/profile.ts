export type UserRole = 'admin' | 'user';
export type SubscriptionStatus = 'active' | 'inactive' | 'expired' | 'trial';
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'refunded' | 'cancelled';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  max_devices: number;
  subscription_status: SubscriptionStatus;
  mercado_pago_subscription_id: string | null;
  last_login_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserDevice {
  id: string;
  user_id: string;
  device_fingerprint: string;
  device_name: string | null;
  user_agent: string | null;
  ip_address: string | null;
  last_active_at: string;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  external_id: string | null;
  status: PaymentStatus;
  amount: number;
  currency: string;
  payment_method: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  profile: Profile | null;
  device_count?: number;
}

export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === 'admin';
}

export function isActive(profile: Profile | null): boolean {
  return profile?.is_active === true;
}

export function hasActiveSubscription(profile: Profile | null): boolean {
  return profile?.subscription_status === 'active';
}
