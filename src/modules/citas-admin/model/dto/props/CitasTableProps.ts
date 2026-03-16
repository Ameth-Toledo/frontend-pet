import { CitaUI } from "../../ui.model";

export interface CitasTableProps {
  citas: CitaUI[];
  onVerCita: (cita: CitaUI) => void;
}
