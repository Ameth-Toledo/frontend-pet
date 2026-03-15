import { apiClient } from "@/lib/axios";
import { CitaAdminResponseDTO } from "../model/dto/response/CitaAdminResponseDTO";
import { mockCitas } from "./citas.mock";

export const citasAdminService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<CitaAdminResponseDTO[]>('/admin/citas');
   * return res.data;
   */
  getCitas: (): Promise<CitaAdminResponseDTO[]> => Promise.resolve(mockCitas),
};

void apiClient;