import { PacienteUI } from "../../ui.model";

export interface PacienteRowProps {
  paciente: PacienteUI;
  onVer: () => void;
}
