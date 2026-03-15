import { CitaAdminResponseDTO, ServicioDTO, CitaEstadoDTO } from "./dto/response/CitaAdminResponseDTO";
import { CitaAdmin } from "./entities/CitaAdmin";
import { CitaUI, ServicioUI, CitaEstadoUI } from "./ui.model";

const servicioLabelMap: Record<ServicioDTO, ServicioUI> = {
  CHEQUEO_MEDICO:  "Chequeo médico",
  LIMPIEZA_DENTAL: "Limpieza dental",
  CONTROL_PESO:    "Control de peso",
  VACUNACION:      "Vacunación",
  CIRUGIA:         "Cirugía",
};

const servicioSubtituloMap: Record<ServicioDTO, string> = {
  CHEQUEO_MEDICO:  "Revisión general",
  LIMPIEZA_DENTAL: "Higiene bucal",
  CONTROL_PESO:    "Seguimiento nutricional",
  VACUNACION:      "Inmunización anual",
  CIRUGIA:         "Procedimiento quirúrgico",
};

const estadoMap: Record<CitaEstadoDTO, CitaEstadoUI> = {
  CONFIRMADA: "Confirmada",
  CANCELADA:  "Cancelada",
};

function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

export class CitaAdminMapper {
  static toEntity(dto: CitaAdminResponseDTO): CitaAdmin {
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

  static toUIModel(entity: CitaAdmin): CitaUI {
    const servicio: ServicioDTO = entity.servicio;
    const estado: CitaEstadoDTO = entity.estado;
    return {
      id:                entity.id,
      paciente:          entity.paciente,
      raza:              entity.raza,
      species:           entity.species,
      iniciales:         getIniciales(entity.paciente),
      propietario:       entity.propietario,
      servicio:          servicioLabelMap[servicio],
      servicioSubtitulo: servicioSubtituloMap[servicio],
      fecha:             entity.fecha,
      hora:              entity.hora,
      estado:            estadoMap[estado],
    };
  }

  static fromDTOtoUI(dto: CitaAdminResponseDTO): CitaUI {
    return CitaAdminMapper.toUIModel(CitaAdminMapper.toEntity(dto));
  }
}