import { VeterinarioUI } from "../../ui.model";

export interface PersonalTableProps {
  veterinarios: VeterinarioUI[];
  onEditarVeterinario: (vet: VeterinarioUI) => void;
}