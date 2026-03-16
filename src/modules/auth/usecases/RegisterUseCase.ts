import { authService } from '@/modules/auth/services/auth.service';
import { RegisterRequestDTO } from '@/modules/auth/model/dto/request/RegisterRequestDTO';
import { RegisterResultDTO } from '@/modules/auth/model/dto/response/RegisterResultDTO';

export const registerUseCase = async (data: RegisterRequestDTO): Promise<RegisterResultDTO> => {
  const payload = new FormData();
  payload.append('nombre', data.nombre);
  payload.append('apellido', data.apellido);
  payload.append('email', data.email);
  payload.append('telefono', data.telefono);
  payload.append('password', data.password);
  payload.append('rolId', '3');
  if (data.imagenPerfil) {
    payload.append('imagenPerfil', data.imagenPerfil);
  }

  const response = await authService.register(payload);
  const result = response.data;

  if (!result.success) {
    throw new Error(result.message || 'Error en el registro');
  }

  return { success: true, message: result.message };
};