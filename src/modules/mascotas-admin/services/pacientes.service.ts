import { apiClient } from "@/lib/axios";
import { PacienteResponseDTO } from "../model/dto/response/PacienteResponseDTO";
import { mockPacientes } from "./pacientes.mock";

export const pacientesService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<PacienteResponseDTO[]>('/admin/mascotas');
   * return res.data;
   */
  getPacientes: (): Promise<PacienteResponseDTO[]> => Promise.resolve(mockPacientes),
};

void apiClient;