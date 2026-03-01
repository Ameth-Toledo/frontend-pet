import { PacienteDTO, EspecieDTO, PacienteEstadoDTO } from "./dto";
import { PacienteUI, EspecieIconUI, PacienteEstadoUI } from "./ui.model";

const especieLabelMap: Record<EspecieDTO, string> = {
  PERRO: "Perro",
  GATO: "Gato",
  AVE: "Ave",
  OTRO: "Otro",
};

const especieIconMap: Record<EspecieDTO, EspecieIconUI> = {
  PERRO: "dog",
  GATO: "cat",
  AVE: "bird",
  OTRO: "other",
};

function mapEstado(estado: PacienteEstadoDTO): PacienteEstadoUI {
  return estado === "ACTIVO" ? "Activo" : "Inactivo";
}

export function mapPacienteDTOtoUI(dto: PacienteDTO): PacienteUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    especieLabel: especieLabelMap[dto.especie],
    especieIcon: especieIconMap[dto.especie],
    raza: dto.raza,
    propietario: dto.propietario,
    estado: mapEstado(dto.estado),
  };
}