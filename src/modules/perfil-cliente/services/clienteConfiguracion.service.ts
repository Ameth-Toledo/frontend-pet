import { apiClient } from "@/lib/axios";
import { ClienteConfiguracionResponseDTO } from "../model/dto/response/ClienteConfiguracionResponseDTO";
import { UpdateClienteConfiguracionRequestDTO } from "../model/dto/request/UpdateClienteConfiguracionRequestDTO";
import { ChangePasswordClienteRequestDTO } from "../model/dto/request/ChangePasswordClienteRequestDTO";
import { mockClienteConfiguracion } from "./clienteConfiguracion.mock";

export const clienteConfiguracionService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<ClienteConfiguracionResponseDTO>('/cliente/configuracion');
   * return res.data;
   */
  getConfiguracion: (): Promise<ClienteConfiguracionResponseDTO> =>
    new Promise((resolve) => setTimeout(() => resolve({ ...mockClienteConfiguracion }), 800)),

  updateConfiguracion: (dto: UpdateClienteConfiguracionRequestDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockClienteConfiguracion, dto);
        resolve();
      }, 800);
    }),

  changePassword: (dto: ChangePasswordClienteRequestDTO): Promise<void> =>
    new Promise((resolve) => setTimeout(() => resolve(), 800)),
};

void apiClient; 