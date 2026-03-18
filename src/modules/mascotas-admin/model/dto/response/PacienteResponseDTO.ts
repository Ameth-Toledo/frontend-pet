export type PacienteEstadoDTO = "ACTIVO" | "INACTIVO";
export type EspecieDTO = "PERRO" | "GATO" | "AVE" | "OTRO";

export interface PacienteResponseDTO {
  id:               string;
  nombre:           string;
  especie:          EspecieDTO;
  raza:             string;
  propietario:      string;
  emailPropietario: string;
  estado:           PacienteEstadoDTO;
}