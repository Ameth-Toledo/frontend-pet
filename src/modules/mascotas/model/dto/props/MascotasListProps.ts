import { MascotaUI } from "../../ui.model";

export interface MascotasListProps {
  mascotas:         MascotaUI[];
  total:            number;
  onVerMascota:     (mascota: MascotaUI) => void;
  onEditarMascota?: (mascota: MascotaUI) => void;
}