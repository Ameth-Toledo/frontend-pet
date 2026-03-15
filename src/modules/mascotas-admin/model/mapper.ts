import { PacienteResponseDTO, EspecieDTO, PacienteEstadoDTO } from "./dto/response/PacienteResponseDTO";
import { Paciente } from "./entities/Paciente";
import { PacienteUI, EspecieIconUI, PacienteEstadoUI } from "./ui.model";

const especieLabelMap: Record<EspecieDTO, string> = {
  PERRO: "Perro",
  GATO:  "Gato",
  AVE:   "Ave",
  OTRO:  "Otro",
};

const especieIconMap: Record<EspecieDTO, EspecieIconUI> = {
  PERRO: "dog",
  GATO:  "cat",
  AVE:   "bird",
  OTRO:  "other",
};

const estadoMap: Record<PacienteEstadoDTO, PacienteEstadoUI> = {
  ACTIVO:   "Activo",
  INACTIVO: "Inactivo",
};

export class PacienteMapper {
  static toEntity(dto: PacienteResponseDTO): Paciente {
    return {
      id:          dto.id,
      nombre:      dto.nombre,
      especie:     dto.especie,
      raza:        dto.raza,
      propietario: dto.propietario,
      estado:      dto.estado,
    };
  }

  static toUIModel(entity: Paciente): PacienteUI {
    const especie: EspecieDTO       = entity.especie;
    const estado: PacienteEstadoDTO = entity.estado;
    return {
      id:           entity.id,
      nombre:       entity.nombre,
      especieLabel: especieLabelMap[especie],
      especieIcon:  especieIconMap[especie],
      raza:         entity.raza,
      propietario:  entity.propietario,
      estado:       estadoMap[estado],
    };
  }

  static fromDTOtoUI(dto: PacienteResponseDTO): PacienteUI {
    return PacienteMapper.toUIModel(PacienteMapper.toEntity(dto));
  }
}