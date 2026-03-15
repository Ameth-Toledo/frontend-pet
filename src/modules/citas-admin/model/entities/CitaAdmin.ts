import { CitaEstadoDTO, ServicioDTO } from "../dto/response/CitaAdminResponseDTO";

export interface CitaAdmin {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio: ServicioDTO;
  fecha: string;
  hora: string;
  estado: CitaEstadoDTO;
}