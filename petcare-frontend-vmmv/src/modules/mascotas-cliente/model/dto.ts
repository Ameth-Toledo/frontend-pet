export type EspecieDTO = "PERRO" | "GATO" | "AVE" | "OTRO";

export interface MascotaDTO {
  id: string;
  nombre: string;
  especie: EspecieDTO;
  edad: number;
}