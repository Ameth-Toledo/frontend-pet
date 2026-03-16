import { MascotaUI } from "../../ui.model";

export interface MascotaCardProps {
  mascota: MascotaUI;
  onVer: () => void;
  onEditar: () => void;
}