import { apiClient } from '@/lib/axios';
import { LoginRequestDTO } from '@/modules/auth/model/dto/request/LoginRequestDTO';
import { ForgotPasswordRequestDTO } from '@/modules/auth/model/dto/request/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '@/modules/auth/model/dto/request/ResetPasswordRequestDTO';
import { LoginResponseDTO } from '@/modules/auth/model/dto/response/LoginResponseDTO';
import { RegisterResponseDTO } from '@/modules/auth/model/dto/response/RegisterResponseDTO';
import { ForgotPasswordResponseDTO } from '@/modules/auth/model/dto/response/ForgotPasswordResponseDTO';
import { ResetPasswordResponseDTO } from '@/modules/auth/model/dto/response/ResetPasswordResponseDTO';

export const authService = {
  register: (data: FormData) =>
    apiClient.post<RegisterResponseDTO>('/auth/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  login: (data: LoginRequestDTO) =>
    apiClient.post<LoginResponseDTO>('/auth/login', data),

  getMe: () =>
    apiClient.get<LoginResponseDTO['user']>('/auth/me'),

  forgotPassword: (data: ForgotPasswordRequestDTO) =>
    apiClient.post<ForgotPasswordResponseDTO>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequestDTO) =>
    apiClient.post<ResetPasswordResponseDTO>('/auth/reset-password', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.put('/veterinarios/cambiar-password', data),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

export const AuthService = authService;