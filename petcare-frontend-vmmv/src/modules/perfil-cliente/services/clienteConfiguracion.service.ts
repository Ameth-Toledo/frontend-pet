import { ClienteConfiguracionDTO, ChangePasswordDTO } from "../model/dto";

const mockConfiguracion: ClienteConfiguracionDTO = {
  id: "cli-001",
  nombreCompleto: "Juan Pérez",
  correoElectronico: "juan.perez@example.com",
  telefono: "+52 555 123 4567",
  rol: "Cliente",
};

export const clienteConfiguracionService = {
  getConfiguracion: (): Promise<ClienteConfiguracionDTO> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockConfiguracion });
      }, 800);
    }),

  updateConfiguracion: (dto: ClienteConfiguracionDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockConfiguracion, dto);
        console.log("[clienteConfiguracionService] Perfil actualizado:", dto);
        resolve();
      }, 800);
    }),

  changePassword: (dto: ChangePasswordDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("[clienteConfiguracionService] Contraseña cambiada:", dto);
        resolve();
      }, 800);
    }),
};