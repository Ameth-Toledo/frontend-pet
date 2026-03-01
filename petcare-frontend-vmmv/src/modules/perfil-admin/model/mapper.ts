import { ProfileDTO } from "./profile.dto";
import { ProfileUI, ProfileFormUI } from "./profile.ui.model";

export function mapProfileDTOtoUI(dto: ProfileDTO): ProfileUI {
  return {
    id: dto.id,
    nombreCompleto: dto.nombreCompleto,
    correoElectronico: dto.correoElectronico,
    telefono: dto.telefono,
    rol: dto.rol,
  };
}

export function mapProfileFormUItoDTO(id: string, form: ProfileFormUI): ProfileDTO {
  return {
    id,
    nombreCompleto: form.nombreCompleto,
    correoElectronico: form.correoElectronico,
    telefono: form.telefono,
    rol: "",
  };
}