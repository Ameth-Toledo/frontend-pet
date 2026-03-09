export type UserRole = 'CLIENTE' | 'ADMIN' | 'VETERINARIO';

export interface UserUIModel {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  isStaff: boolean;
}

export interface AuthStateUIModel {
  user: UserUIModel | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}