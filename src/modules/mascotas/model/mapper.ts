import { MascotaResponseDTO, EstadoMascotaDTO } from "./dto/response/MascotaResponseDTO";
import { Mascota } from "./entities/Mascota";
import { MascotaUI, EstadoMascotaUI } from "./ui.model";

const estadoMap: Record<EstadoMascotaDTO, EstadoMascotaUI> = {
  ACTIVO:   "ACTIVO",
  INACTIVO: "INACTIVO",
};

export class MascotaMapper {
  static toEntity(dto: MascotaResponseDTO): Mascota {
    return {
      id:          dto.id,
      nombre:      dto.nombre,
      especie:     dto.especie,
      raza:        dto.raza,
      propietario: dto.propietario,
      estado:      dto.estado,
    };
  }

  static toUIModel(entity: Mascota): MascotaUI {
    const estado: EstadoMascotaDTO = entity.estado;
    return {
      id:          entity.id,
      nombre:      entity.nombre,
      especie:     entity.especie,
      raza:        entity.raza,
      propietario: entity.propietario,
      estado:      estadoMap[estado],
    };
  }

  static fromDTOtoUI(dto: MascotaResponseDTO): MascotaUI {
    return MascotaMapper.toUIModel(MascotaMapper.toEntity(dto));
  }
}