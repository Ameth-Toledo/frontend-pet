import { Pet } from "./Pet";
import { Appointment } from "./Appointment";

export interface ClienteDashboard {
  usuarioNombre: string;
  usuarioMembresia: string;
  mascotas: Pet[];
  proximasCitas: Appointment[];
}