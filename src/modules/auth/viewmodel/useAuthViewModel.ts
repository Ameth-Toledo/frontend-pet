import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUseCase } from '../usecases/LoginUseCase';
import { registerUseCase } from '../usecases/RegisterUseCase';
import { changePasswordUseCase } from '../usecases/ChangePasswordUseCase';
import { logoutUseCase } from '../usecases/LogoutUseCase';
import { authService } from '../services/auth.service';
import { LoginRequestDTO } from '../model/dto/request/LoginRequestDTO';
import { RegisterRequestDTO } from '../model/dto/request/RegisterRequestDTO';
import { ForgotPasswordRequestDTO } from '../model/dto/request/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../model/dto/request/ResetPasswordRequestDTO';
import { ChangePasswordRequestDTO } from '../model/dto/request/ChangePasswordRequestDTO';

export function useAuthViewModel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginUseCase(credentials);
      router.push(result.redirectTo);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Credenciales incorrectas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUseCase(data);
      router.push('/login');
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.forgotPassword(data);
      const result = response.data;
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.message || 'Error al enviar email');
        return { success: false, message: result.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar email de recuperación';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.resetPassword(data);
      const result = response.data;
      if (result.success) {
        router.push('/login');
        return { success: true, message: result.message };
      } else {
        setError(result.message || 'Error al cambiar contraseña');
        return { success: false, message: result.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      await changePasswordUseCase(data);
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUseCase();
  };

  return {
    isLoading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
  };
}