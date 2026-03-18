import { veterinarioConfiguracionService } from "../services/veterinarioConfiguracion.service";

export const changePasswordVetUseCase = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<void> => {
  if (!currentPassword.trim())
    throw new Error("Ingresa tu contraseña actual.");
  if (newPassword.length < 8)
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  if (newPassword !== confirmPassword)
    throw new Error("Las contraseñas no coinciden.");
  await veterinarioConfiguracionService.changePassword({ 
    currentPassword, 
    newPassword, 
    confirmPassword 
  });
};