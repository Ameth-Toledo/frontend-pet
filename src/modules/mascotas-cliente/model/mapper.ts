import { MascotaClienteResponseDTO, EspecieDTO } from './dto/response/MascotaClienteResponseDTO';
import { MascotaCliente } from './entities/MascotaCliente';
import { MascotaUI, IconType } from './ui.model';

const iconMap: Record<EspecieDTO, IconType> = {
  Perro: 'perro',
  Gato:  'gato',
};

const especieLabelMap: Record<EspecieDTO, string> = {
  Perro: 'Perro',
  Gato:  'Gato',
};

export class MascotaClienteMapper {
  static toEntity(dto: MascotaClienteResponseDTO): MascotaCliente {
    return {
      id:               dto.id,
      id_user:          dto.id_user,
      nombre:           dto.nombre,
      especie:          dto.especie,
      fecha_nacimiento: dto.fecha_nacimiento ?? null,
      sexo:             dto.sexo ?? null,
      peso:             dto.peso ?? null,
      activo:           dto.activo,
    };
  }

  static toUIModel(entity: MascotaCliente): MascotaUI {
    return {
      id:               entity.id,
      nombre:           entity.nombre,
      especie:          especieLabelMap[entity.especie] ?? entity.especie,
      icon:             iconMap[entity.especie] ?? 'perro',
      sexo:             entity.sexo,
      peso:             entity.peso,
      fecha_nacimiento: entity.fecha_nacimiento,
    };
  }

  static fromDTOtoUI(dto: MascotaClienteResponseDTO): MascotaUI {
    return MascotaClienteMapper.toUIModel(MascotaClienteMapper.toEntity(dto));
  }
}