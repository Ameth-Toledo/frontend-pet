import { apiClient } from "@/lib/axios";
import { MascotaDetalleResponseDTO } from "../model/dto/response/MascotaDetalleResponseDTO";
import { HistorialResponseDTO } from "../model/dto/response/HistorialResponseDTO";
import { VacunaResponseDTO } from "../model/dto/response/VacunaResponseDTO";

export const clienteMascotaDetalleService = {
  getMascotaDetalle: async (mascotaId: string): Promise<MascotaDetalleResponseDTO | null> => {
    const res = await apiClient.get<MascotaDetalleResponseDTO>(`/cliente/mascotas/${mascotaId}`);
    return res.data;
  },

  getHistorialByMascotaId: async (mascotaId: string): Promise<HistorialResponseDTO[]> => {
    const res = await apiClient.get<HistorialResponseDTO[]>(`/cliente/mascotas/${mascotaId}/historial`);
    return res.data;
  },

  getVacunasByMascotaId: async (mascotaId: string): Promise<VacunaResponseDTO[]> => {
    const res = await apiClient.get<VacunaResponseDTO[]>(`/cliente/mascotas/${mascotaId}/vacunas`);
    return res.data;
  },
};
