import { TipoPetDTO } from "../dto/response/PetResponseDTO";

export interface Pet {
  id: string;
  nombre: string;
  tipo: TipoPetDTO;
  raza: string;
}