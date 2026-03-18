import { PacienteEstadoDTO, EspecieDTO } from "../dto/response/PacienteResponseDTO";

export interface Paciente {
  id:               string;
  nombre:           string;
  especie:          EspecieDTO;
  raza:             string;
  propietario:      string;
  emailPropietario: string;
  estado:           PacienteEstadoDTO;
}