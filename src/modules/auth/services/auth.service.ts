import { apiClient } from '@/lib/axios';
import { LoginRequestDTO } from '@/modules/auth/model/dto/request/LoginRequestDTO';
import { RegisterRequestDTO } from '@/modules/auth/model/dto/request/RegisterRequestDTO';
import { ForgotPasswordRequestDTO } from '@/modules/auth/model/dto/request/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '@/modules/auth/model/dto/request/ResetPasswordRequestDTO';
import { LoginResponseDTO } from '@/modules/auth/model/dto/response/LoginResponseDTO';
import { RegisterResponseDTO } from '@/modules/auth/model/dto/response/RegisterResponseDTO';
import { ForgotPasswordResponseDTO } from '@/modules/auth/model/dto/response/ForgotPasswordResponseDTO';
import { ResetPasswordResponseDTO } from '@/modules/auth/model/dto/response/ResetPasswordResponseDTO';

export const authService = {
  login: (data: LoginRequestDTO) =>
    apiClient.post<LoginResponseDTO>('/auth/login', data),

  register: (data: RegisterRequestDTO) =>
    apiClient.post<RegisterResponseDTO>('/auth/register', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post('/auth/change-password', data),

  forgotPassword: (data: ForgotPasswordRequestDTO) =>
    apiClient.post<ForgotPasswordResponseDTO>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequestDTO) =>
    apiClient.post<ResetPasswordResponseDTO>('/auth/reset-password', data),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

export const AuthService = authService;