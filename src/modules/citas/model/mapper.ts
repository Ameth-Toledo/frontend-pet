import { CitaVetResponseDTO, CitaVetEstadoDTO } from './dto/response/CitaVetResponseDTO';
import { Appointment } from './entities/Appoiment';
import { CitaVetUI, CitaVetEstadoUI } from './ui.model';

const estadoMap: Record<CitaVetEstadoDTO, CitaVetEstadoUI> = {
  PENDIENTE:  'Pendiente',
  CONFIRMADA: 'Confirmada',
  CANCELADA:  'Cancelada',
  ATENDIDA:   'Atendida',
};

export class CitasVetMapper {
  static toEntity(dto: CitaVetResponseDTO): Appointment {
    return {
      id:          dto.id,
      paciente:    dto.paciente,
      raza:        dto.raza,
      species:     dto.species,
      propietario: dto.propietario,
      servicio:    dto.servicio,
      fecha:       dto.fecha,
      hora:        dto.hora,
      estado:      dto.estado,
    };
  }

  static toUIModel(entity: Appointment): CitaVetUI {
    return {
      id:          entity.id,
      paciente:    entity.paciente,
      raza:        entity.raza,
      species:     entity.species,
      propietario: entity.propietario,
      servicio:    entity.servicio,
      fecha:       entity.fecha,
      hora:        entity.hora,
      estado:      estadoMap[entity.estado as CitaVetEstadoDTO] ?? 'Pendiente',
    };
  }

  static fromDTOtoUI(dto: CitaVetResponseDTO): CitaVetUI {
    return CitasVetMapper.toUIModel(CitasVetMapper.toEntity(dto));
  }
}