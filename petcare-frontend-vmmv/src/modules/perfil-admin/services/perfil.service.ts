import { ProfileDTO } from "../model/profile.dto";
import { ChangePasswordDTO } from "../model/password.dto";

const mockProfile: ProfileDTO = {
  id: "USR-001",
  nombreCompleto: "Juan Pérez",
  correoElectronico: "juan.perez@example.com",
  telefono: "+52 555 123 4567",
  rol: "Administrador",
};

export const perfilService = {
  getProfile: (): Promise<ProfileDTO> =>
    new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 800)),

  updateProfile: (dto: ProfileDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockProfile, dto);
        console.log("[perfilService] Perfil actualizado:", dto);
        resolve();
      }, 800);
    }),

  changePassword: (dto: ChangePasswordDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("[perfilService] Contraseña cambiada:", dto);
        resolve();
      }, 800);
    }),
};