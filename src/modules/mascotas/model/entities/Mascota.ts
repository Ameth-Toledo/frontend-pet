import { EstadoMascotaDTO } from "../dto/response/MascotaResponseDTO";

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  propietario: string;
  estado: EstadoMascotaDTO;
}