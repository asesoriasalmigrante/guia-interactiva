export type UserRole = 'admin' | 'user';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  profile: Profile | null;
}

// Helper to check if user is admin
export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === 'admin';
}
