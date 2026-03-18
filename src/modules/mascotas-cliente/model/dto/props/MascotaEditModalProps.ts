import { MascotaUI } from "../../ui.model";

export interface MascotaEditModalProps {
  mascota:   MascotaUI;
  onClose:   () => void;
  onGuardar: () => void;
}