import { MascotaUI } from "../../ui.model";

export interface MascotaDetalleModalProps {
  mascota: MascotaUI;
  onClose: () => void;
}