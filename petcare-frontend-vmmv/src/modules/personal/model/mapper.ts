import { VeterinarioDTO, CreatePersonalDTO, RolDTO } from "./dto";
import { VeterinarioUI, VeterinarioEstadoUI } from "./ui.model";
import { CreatePersonalUI, RolUI } from "./create.ui.model";

function mapEstado(estado: VeterinarioDTO["estado"]): VeterinarioEstadoUI {
  return estado === "ACTIVO" ? "Activo" : "Inactivo";
}

export function mapVeterinarioDTOtoUI(dto: VeterinarioDTO): VeterinarioUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    especialidad: dto.especialidad,
    telefono: dto.telefono,
    email: dto.email,
    cedula: dto.cedula,
    estado: mapEstado(dto.estado),
    avatarInitials: dto.avatarInitials,
  };
}

const rolMap: Record<RolUI, RolDTO> = {
  Administrador: "ADMINISTRADOR",
  Veterinario: "VETERINARIO",
};

export function mapCreatePersonalUItoDTO(ui: CreatePersonalUI): CreatePersonalDTO {
  return {
    rol: rolMap[ui.rol],
    nombreCompleto: ui.nombreCompleto,
    correoElectronico: ui.correoElectronico,
    cedulaProfesional: ui.cedulaProfesional,
    contrasenaTemporal: ui.contrasenaTemporal,
  };
}