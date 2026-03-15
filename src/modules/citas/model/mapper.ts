import { CitaVetResponseDTO, ServicioVetDTO, CitaVetEstadoDTO } from "./dto/response/CitaVetResponseDTO";
import { Appointment } from "./entities/Appoiment";
import { CitaVetUI, ServicioVetUI, CitaVetEstadoUI } from "./ui.model";

const servicioLabelMap: Record<ServicioVetDTO, ServicioVetUI> = {
  CHEQUEO_MEDICO: "Chequeo médico",
  LIMPIEZA_DENTAL: "Limpieza dental",
  CONTROL_PESO:   "Control de peso",
  VACUNACION:     "Vacunación",
  CIRUGIA:        "Cirugía",
};

const estadoMap: Record<CitaVetEstadoDTO, CitaVetEstadoUI> = {
  CONFIRMADA: "Confirmada",
  CANCELADA:  "Cancelada",
  PENDIENTE:  "Pendiente",
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
    const servicio: ServicioVetDTO = entity.servicio;
    const estado: CitaVetEstadoDTO = entity.estado;
    return {
      id:          entity.id,
      paciente:    entity.paciente,
      raza:        entity.raza,
      species:     entity.species,
      propietario: entity.propietario,
      servicio:    servicioLabelMap[servicio],
      fecha:       entity.fecha,
      hora:        entity.hora,
      estado:      estadoMap[estado],
    };
  }

  static fromDTOtoUI(dto: CitaVetResponseDTO): CitaVetUI {
    return CitasVetMapper.toUIModel(CitasVetMapper.toEntity(dto));
  }
}