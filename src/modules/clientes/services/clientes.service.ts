import { apiClient } from "@/lib/axios";
import { ClienteResponseDTO } from "../model/dto/response/ClienteResponseDTO";
import { mockClientes } from "./clientes.mock";

export const clientesService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<ClienteResponseDTO[]>('/admin/clientes');
   * return res.data;
   */
  getClientes: (): Promise<ClienteResponseDTO[]> => Promise.resolve(mockClientes),
};

void apiClient;