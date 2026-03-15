import { MascotaClienteResponseDTO, EspecieDTO } from "./dto/response/MascotaClienteResponseDTO";
import { MascotaCliente } from "./entities/MascotaCliente";
import { MascotaUI, IconType } from "./ui.model";

const iconMap: Record<EspecieDTO, IconType> = {
  PERRO: "perro",
  GATO:  "gato",
  AVE:   "ave",
  OTRO:  "otro",
};

const especieLabelMap: Record<EspecieDTO, string> = {
  PERRO: "Perro",
  GATO:  "Gato",
  AVE:   "Ave",
  OTRO:  "Otro",
};

export class MascotaClienteMapper {
  static toEntity(dto: MascotaClienteResponseDTO): MascotaCliente {
    return {
      id:      dto.id,
      nombre:  dto.nombre,
      especie: dto.especie,
      edad:    dto.edad,
    };
  }

  static toUIModel(entity: MascotaCliente): MascotaUI {
    const especie: EspecieDTO = entity.especie;
    return {
      id:      entity.id,
      nombre:  entity.nombre,
      especie: especieLabelMap[especie],
      edad:    entity.edad,
      icon:    iconMap[especie],
    };
  }

  static fromDTOtoUI(dto: MascotaClienteResponseDTO): MascotaUI {
    return MascotaClienteMapper.toUIModel(MascotaClienteMapper.toEntity(dto));
  }
}