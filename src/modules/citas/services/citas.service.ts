import { apiClient } from "@/lib/axios";
import { CitaVetResponseDTO } from "../model/dto/response/CitaVetResponseDTO";
import { mockCitas } from "./citas.mock";

export const citasVetService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<CitaVetResponseDTO[]>('/citas/veterinario');
   * return res.data;
   */
  getCitas: (): Promise<CitaVetResponseDTO[]> => Promise.resolve(mockCitas),
};

void apiClient;