import { authService } from '@/modules/auth/services/auth.service';
import { RegisterRequestDTO } from '@/modules/auth/model/dto/request/RegisterRequestDTO';
import { RegisterResultDTO } from '@/modules/auth/model/dto/response/RegisterResultDTO';

export const registerUseCase = async (data: RegisterRequestDTO): Promise<RegisterResultDTO> => {
  const response = await authService.register(data);
  const result = response.data;

  if (!result.success) {
    throw new Error(result.message || 'Error en el registro');
  }

  return { success: true, message: result.message };
};