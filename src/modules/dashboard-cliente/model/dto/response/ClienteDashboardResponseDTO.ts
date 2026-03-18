import { PetResponseDTO } from "./PetResponseDTO";
import { GetCitaResponse } from "./AppointmentResponseDTO";

export interface ClienteDashboardResponseDTO {
  usuarioNombre: string;
  usuarioMembresia: string;
  mascotas: PetResponseDTO[];
  proximasCitas: GetCitaResponse[];
}