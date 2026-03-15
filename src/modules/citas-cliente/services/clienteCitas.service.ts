import { apiClient } from "@/lib/axios";
import { CitaClienteResponseDTO } from "../model/dto/response/CitaClienteResponseDTO";
import { mockCitasCliente } from "./clienteCitas.mock";

export const clienteCitasService = {
  getCitas: (): Promise<CitaClienteResponseDTO[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockCitasCliente), 500)),
};

void apiClient;