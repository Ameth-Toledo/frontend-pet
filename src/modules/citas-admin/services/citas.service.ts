import { apiClient } from '@/lib/axios';
import { CitaAdminResponseDTO } from '../model/dto/response/CitaAdminResponseDTO';

export const citasAdminService = {
  getCitas: async (): Promise<CitaAdminResponseDTO[]> => {
    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];
    return data;
  },
};