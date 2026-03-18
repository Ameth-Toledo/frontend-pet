import { perfilService } from "../services/perfil.service";

export const changePasswordUseCase = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  if (!currentPassword.trim())
    throw new Error("Ingresa tu contraseña actual.");
  if (newPassword.length < 8)
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  await perfilService.changePassword({ currentPassword, newPassword });
};