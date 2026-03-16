import { CitaVetUI } from "../../ui.model";

export interface CitasVetTableProps {
  citas: CitaVetUI[];
  onVerCita: (cita: CitaVetUI) => void;
  onEditarCita: (cita: CitaVetUI) => void;
}