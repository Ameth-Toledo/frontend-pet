export interface VeterinarioProfileUI {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  cedula: string;
}

export interface VeterinarioProfileFormUI {
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  cedula: string;
}

export interface DayScheduleUI {
  enabled: boolean;
  start: string;
  end: string;
}

export type ScheduleUI = Record<string, DayScheduleUI>;