import { apiClient } from '@/lib/axios';
import { MascotaClienteResponseDTO } from '../model/dto/response/MascotaClienteResponseDTO';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';

export const clienteMascotasService = {

  getMascotas: async (userId: number): Promise<MascotaClienteResponseDTO[]> => {
    const res = await apiClient.get<MascotaClienteResponseDTO[]>(`/api/pets/user/${userId}`);
    return res.data;
  },

  createMascota: async (data: CreateMascotaRequestDTO): Promise<MascotaClienteResponseDTO> => {
    const res = await apiClient.post<MascotaClienteResponseDTO>('/api/pets', data);
    return res.data;
  },
};