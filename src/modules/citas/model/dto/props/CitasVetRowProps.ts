import { CitaVetUI } from "../../ui.model";

export interface CitasVetRowProps {
  cita: CitaVetUI;
  onVer: () => void;
  onEditar: () => void;
}
