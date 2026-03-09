import { apiClient } from '@/lib/axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/modules/auth/interfaces/auth.interfaces';

export const authService = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<RegisterResponse>('/auth/register', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post('/auth/change-password', data),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};
// Alias para compatibilidad
export const AuthService = authService;
