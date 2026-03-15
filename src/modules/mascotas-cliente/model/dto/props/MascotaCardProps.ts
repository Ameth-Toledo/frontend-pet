import { MascotaUI } from "../../ui.model";

export interface MascotaCardProps {
  mascota: MascotaUI;
  onVer: (id: string) => void;
  onEditar: (id: string) => void;
}