import { PacienteUI } from "../../ui.model";

export interface PacienteHistorialModalProps {
  paciente: PacienteUI;
  onClose: () => void;
}