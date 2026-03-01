import { ClienteConfiguracionDTO, ChangePasswordDTO } from "./dto";
import { ClienteConfiguracionUI, ChangePasswordFormUI } from "./ui.model";

export function mapClienteConfiguracionDTOtoUI(dto: ClienteConfiguracionDTO): ClienteConfiguracionUI {
  return {
    id: dto.id,
    nombreCompleto: dto.nombreCompleto,
    correoElectronico: dto.correoElectronico,
    telefono: dto.telefono,
    rol: dto.rol,
  };
}

export function mapClienteConfiguracionUItoDTO(ui: ClienteConfiguracionUI): ClienteConfiguracionDTO {
  return {
    id: ui.id,
    nombreCompleto: ui.nombreCompleto,
    correoElectronico: ui.correoElectronico,
    telefono: ui.telefono,
    rol: ui.rol,
  };
}

export function mapChangePasswordFormUItoDTO(form: ChangePasswordFormUI): ChangePasswordDTO {
  return {
    passwordActual: form.passwordActual,
    nuevaPassword: form.nuevaPassword,
    confirmarPassword: form.confirmarPassword,
  };
}