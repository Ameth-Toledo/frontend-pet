import { CitaVetEstadoDTO, ServicioVetDTO } from "../dto/response/CitaVetResponseDTO";

export interface Appointment {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio: ServicioVetDTO;
  fecha: string;
  hora: string;
  estado: CitaVetEstadoDTO;
}