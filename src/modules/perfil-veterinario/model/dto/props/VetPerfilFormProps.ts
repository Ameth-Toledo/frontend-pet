import { VeterinarioProfileFormUI } from "../../ui.model";

export interface VetPerfilFormProps {
  form: VeterinarioProfileFormUI;
  saving: boolean;
  saved: boolean;
  onFieldChange: (field: keyof VeterinarioProfileFormUI, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChangePassword: () => void;
}