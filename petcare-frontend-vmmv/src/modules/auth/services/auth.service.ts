import { apiClient } from '@/lib/axios';
import { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RegisterRequestDTO,
  RegisterResponseDTO,
  ForgotPasswordRequestDTO,
  ForgotPasswordResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO
} from '../model/dto';
import { AuthMapper } from '../model/mapper';
import { UserUIModel } from '../model/ui.model';

export class AuthService {
  // Login
  static async login(credentials: LoginRequestDTO): Promise<{ user: UserUIModel; token: string }> {
    const response = await apiClient.post<LoginResponseDTO>('/api/auth/login', credentials);
    
    const user = AuthMapper.toUserUIModel(response.data.user);
    const token = response.data.token;

    return { user, token };
  }

  // Register
  static async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const response = await apiClient.post<RegisterResponseDTO>('/api/auth/register', data);
    return response.data;
  }

  // Forgot Password
  static async forgotPassword(data: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> {
    const response = await apiClient.post<ForgotPasswordResponseDTO>('/api/auth/forgot-password', data);
    return response.data;
  }

  // Reset Password
  static async resetPassword(data: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> {
    const response = await apiClient.post<ResetPasswordResponseDTO>('/api/auth/reset-password', data);
    return response.data;
  }

  // Logout
  static async logout(): Promise<void> {
    // Opcional: llamar endpoint de logout si existe
  }
}