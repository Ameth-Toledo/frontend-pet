import { PetResponseDTO } from "./PetResponseDTO";
import { AppointmentResponseDTO } from "./AppointmentResponseDTO";

export interface ClienteDashboardResponseDTO {
  usuarioNombre: string;
  usuarioMembresia: string;
  mascotas: PetResponseDTO[];
  proximasCitas: AppointmentResponseDTO[];
}