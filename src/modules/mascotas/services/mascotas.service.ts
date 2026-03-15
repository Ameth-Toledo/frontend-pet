import { apiClient } from "@/lib/axios";
import { MascotaResponseDTO } from "../model/dto/response/MascotaResponseDTO";
import { mockMascotas } from "./mascotas.mock";

export const mascotasService = {
  getMascotas: (): Promise<MascotaResponseDTO[]> => Promise.resolve(mockMascotas),
};

void apiClient;