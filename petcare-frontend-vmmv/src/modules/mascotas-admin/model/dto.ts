export type PacienteEstadoDTO = "ACTIVO" | "INACTIVO";
export type EspecieDTO = "PERRO" | "GATO" | "AVE" | "OTRO";

export interface PacienteDTO {
  id: string;
  nombre: string;
  especie: EspecieDTO;
  raza: string;
  propietario: string;
  estado: PacienteEstadoDTO;
}