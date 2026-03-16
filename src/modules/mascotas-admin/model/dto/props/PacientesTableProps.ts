import { PacienteUI } from "../../ui.model";

export interface PacientesTableProps {
  pacientes: PacienteUI[];
  onVerPaciente: (paciente: PacienteUI) => void;
}