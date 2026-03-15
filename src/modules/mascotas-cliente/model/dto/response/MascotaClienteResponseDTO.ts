export type EspecieDTO = "PERRO" | "GATO" | "AVE" | "OTRO";

export interface MascotaClienteResponseDTO {
  id: string;
  nombre: string;
  especie: EspecieDTO;
  edad: number;
}