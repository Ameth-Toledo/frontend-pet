import { ChangePasswordFormUI } from "../../ui.model";

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: ChangePasswordFormUI) => void;
  loading: boolean;
  error: string | null;
}