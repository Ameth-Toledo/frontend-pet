export interface ChangePasswordVetRequestDTO {
  currentPassword: string;
  newPassword:     string;
  confirmPassword: string;
}