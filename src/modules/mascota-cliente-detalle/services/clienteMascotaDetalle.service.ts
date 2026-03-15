import { apiClient } from "@/lib/axios";
import { MascotaDetalleResponseDTO } from "../model/dto/response/MascotaDetalleResponseDTO";
import { HistorialResponseDTO } from "../model/dto/response/HistorialResponseDTO";
import { VacunaResponseDTO } from "../model/dto/response/VacunaResponseDTO";
import { mockMascotas, mockHistorial, mockVacunas } from "./clienteMascotaDetalle.mock";

export const clienteMascotaDetalleService = {
  /**
   * TODO: reemplazar mocks por:
   * const res = await apiClient.get<MascotaDetalleResponseDTO>(`/cliente/mascotas/${mascotaId}`);
   * return res.data;
   */
  getMascotaDetalle: (mascotaId: string): Promise<MascotaDetalleResponseDTO | null> =>
    new Promise((resolve) => setTimeout(() => resolve(mockMascotas[mascotaId] ?? null), 400)),

  getHistorialByMascotaId: (mascotaId: string): Promise<HistorialResponseDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockHistorial[mascotaId] ?? []), 400)),

  getVacunasByMascotaId: (mascotaId: string): Promise<VacunaResponseDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockVacunas[mascotaId] ?? []), 400)),
};

void apiClient;