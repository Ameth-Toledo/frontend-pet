import { CitaVetDTO, ServicioVetDTO, CitaVetEstadoDTO } from "./dto";
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

export function mapCitaVetDTOtoUI(dto: CitaVetDTO): CitaVetUI {
  return {
    id:          dto.id,
    paciente:    dto.paciente,
    raza:        dto.raza,
    species:     dto.species,
    propietario: dto.propietario,
    servicio:    servicioLabelMap[dto.servicio],
    fecha:       dto.fecha,
    hora:        dto.hora,
    estado:      estadoMap[dto.estado],
  };
}
