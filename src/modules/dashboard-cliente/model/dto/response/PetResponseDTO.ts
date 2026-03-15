export type TipoPetDTO = "PERRO" | "GATO" | "AVE" | "OTRO";

export interface PetResponseDTO {
  id: string;
  nombre: string;
  tipo: TipoPetDTO;
  raza: string;
}