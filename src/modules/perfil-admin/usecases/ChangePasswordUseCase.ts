import { perfilService } from "../services/perfil.service";

export const changePasswordUseCase = async (newPassword: string): Promise<void> => {
  if (newPassword.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }
  await perfilService.changePassword({ newPassword });
};