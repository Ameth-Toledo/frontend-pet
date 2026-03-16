import { apiClient } from '@/lib/axios';
import { MascotaClienteResponseDTO } from '../model/dto/response/MascotaClienteResponseDTO';
import { CreateMascotaRequestDTO } from '../model/dto/request/CreateMascotaRequestDTO';

export const clienteMascotasService = {

  getMascotas: async (userId: number): Promise<MascotaClienteResponseDTO[]> => {
    const res = await apiClient.get(`/pets/user/${userId}`);
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.pets)) return data.pets;
    return [];
  },

  createMascota: async (data: CreateMascotaRequestDTO): Promise<MascotaClienteResponseDTO> => {
    const res = await apiClient.post<MascotaClienteResponseDTO>('/pets', data);
    return res.data;
  },
};