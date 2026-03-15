export interface VetChangePasswordModalProps {
  onClose: () => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordError: string | null;
  passwordSaving: boolean;
  onSubmit: () => void;
}