import { clienteConfiguracionService } from "../services/clienteConfiguracion.service";
import { ClienteConfiguracionMapper } from "../model/mapper";
import { ChangePasswordFormUI } from "../model/ui.model";

export const changePasswordClienteUseCase = async (
  form: ChangePasswordFormUI
): Promise<void> => {
  if (form.nuevaPassword.length < 8)
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  if (form.nuevaPassword !== form.confirmarPassword)
    throw new Error("Las contraseñas no coinciden.");

  const dto = ClienteConfiguracionMapper.toChangePasswordRequestDTO(form);
  await clienteConfiguracionService.changePassword(dto);
};