import { ProfileFormUI } from "../../profile.ui.model";

export interface PerfilFormProps {
  form: ProfileFormUI;
  saving: boolean;
  saved: boolean;
  onFieldChange: (field: keyof ProfileFormUI, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChangePassword: () => void;
}