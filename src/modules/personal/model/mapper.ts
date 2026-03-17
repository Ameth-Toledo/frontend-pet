import { VeterinarioResponseDTO, VeterinarioEstadoDTO, RolDTO } from './dto/response/VeterinarioResponseDTO';
import { CreatePersonalRequestDTO } from './dto/request/CreatePersonalRequestDTO';
import { Veterinario } from './entities/Veterinario';
import { VeterinarioUI, VeterinarioEstadoUI } from './ui.model';
import { CreatePersonalUI, RolUI } from './create.ui.model';

const estadoMap: Record<VeterinarioEstadoDTO, VeterinarioEstadoUI> = {
  ACTIVO:   'Activo',
  INACTIVO: 'Inactivo',
};

const rolMap: Record<RolUI, RolDTO> = {
  Administrador: 'ADMINISTRADOR',
  Veterinario:   'VETERINARIO',
};

export class PersonalMapper {
  static toEntity(dto: VeterinarioResponseDTO): Veterinario {
    return {
      id:             dto.id,
      nombre:         dto.nombre,
      especialidad:   dto.especialidad,
      telefono:       dto.telefono,
      email:          dto.email,
      cedula:         dto.cedula,
      estado:         dto.estado,
      avatarInitials: dto.avatarInitials,
      rol:            dto.rol,
    };
  }

  static toUIModel(entity: Veterinario): VeterinarioUI {
    return {
      id:             entity.id,
      nombre:         entity.nombre,
      especialidad:   entity.especialidad,
      telefono:       entity.telefono,
      email:          entity.email,
      cedula:         entity.cedula,
      estado:         estadoMap[entity.estado as VeterinarioEstadoDTO],
      avatarInitials: entity.avatarInitials,
      rol:            entity.rol as 'ADMINISTRADOR' | 'VETERINARIO',
    };
  }

  static fromDTOtoUI(dto: VeterinarioResponseDTO): VeterinarioUI {
    return PersonalMapper.toUIModel(PersonalMapper.toEntity(dto));
  }

  static toRequestDTO(ui: CreatePersonalUI): CreatePersonalRequestDTO {
    return {
      rol:                rolMap[ui.rol],
      nombreCompleto:     ui.nombreCompleto,
      correoElectronico:  ui.correoElectronico,
      cedulaProfesional:  ui.cedulaProfesional,
      contrasenaTemporal: ui.contrasenaTemporal,
    };
  }
}