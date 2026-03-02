import axios from 'axios';
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

// Cliente específico para Auth Service (puerto 3001)
const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para errores
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export class AuthService {
  // Login
  static async login(credentials: LoginRequestDTO): Promise<{ user: UserUIModel; token: string }> {
    const response = await authClient.post<LoginResponseDTO>('/api/auth/login', credentials);
    
    const user = AuthMapper.toUserUIModel(response.data.user);
    const token = response.data.token;

    return { user, token };
  }

  // Register
  static async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const response = await authClient.post<RegisterResponseDTO>('/api/auth/register', data);
    return response.data;
  }

  // Forgot Password
  static async forgotPassword(data: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> {
    const response = await authClient.post<ForgotPasswordResponseDTO>('/api/auth/forgot-password', data);
    return response.data;
  }

  // Reset Password
  static async resetPassword(data: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> {
    const response = await authClient.post<ResetPasswordResponseDTO>('/api/auth/reset-password', data);
    return response.data;
  }

  // Logout
  static async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
