import { apiClient } from '@/lib/axios';
import { GetCitaResponse } from '../model/dto/response/AppointmentResponseDTO';

export const clienteDashboardService = {
  getCitas: async (userId: number): Promise<GetCitaResponse[]> => {
    const res = await apiClient.get('/citas');
    const data = Array.isArray(res.data) ? res.data
      : Array.isArray(res.data?.data) ? res.data.data
      : [];
    return data.filter((c: GetCitaResponse) => c.id_user === userId);
  },
};