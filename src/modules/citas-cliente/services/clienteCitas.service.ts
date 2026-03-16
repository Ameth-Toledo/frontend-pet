import { apiClient } from '@/lib/axios';
import { CitaClienteResponseDTO } from '../model/dto/response/CitaClienteResponseDTO';

export const clienteCitasService = {
  getCitas: async (userId: number): Promise<CitaClienteResponseDTO[]> => {
    const res = await apiClient.get('/citas');
    const data = Array.isArray(res.data) ? res.data
      : Array.isArray(res.data?.data) ? res.data.data
      : [];
    return data.filter((c: CitaClienteResponseDTO) => c.id_user === userId);
  },
};