import { PacienteUI } from "../../ui.model";

export interface PacientesTableProps {
  pacientes: PacienteUI[];
  total?: number;
}