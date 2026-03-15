import { apiClient } from "@/lib/axios";
import { MascotaClienteResponseDTO } from "../model/dto/response/MascotaClienteResponseDTO";
import { mockMascotasCliente } from "./clienteMascotas.mock";

export const clienteMascotasService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<MascotaClienteResponseDTO[]>('/cliente/mascotas');
   * return res.data;
   */
  getMascotas: (): Promise<MascotaClienteResponseDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockMascotasCliente), 500)),
};

void apiClient;