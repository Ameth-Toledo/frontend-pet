export interface VeterinarioProfileDTO {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  cedula: string;
}

export interface DayScheduleDTO {
  enabled: boolean;
  start: string;
  end: string;
}

export type ScheduleDTO = Record<string, DayScheduleDTO>;

export interface ChangePasswordDTO {
  newPassword: string;
  confirmPassword: string;
}
