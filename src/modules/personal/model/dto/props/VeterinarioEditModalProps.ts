import { VeterinarioUI } from "../../ui.model";

export interface VeterinarioEditModalProps {
  veterinario: VeterinarioUI;
  onClose: () => void;
}