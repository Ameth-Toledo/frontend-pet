export interface VetChangePasswordModalProps {
  onClose:            () => void;
  currentPassword:    string;
  setCurrentPassword: (v: string) => void;
  newPassword:        string;
  setNewPassword:     (v: string) => void;
  confirmPassword:    string;
  setConfirmPassword: (v: string) => void;
  passwordError:      string | null;
  passwordSaving:     boolean;
  onSubmit:           () => void;
}