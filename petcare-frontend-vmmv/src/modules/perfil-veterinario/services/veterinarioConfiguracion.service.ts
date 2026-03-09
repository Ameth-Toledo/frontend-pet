import { VeterinarioProfileDTO, ScheduleDTO, ChangePasswordDTO } from "../model/dto";

const DEFAULT_SCHEDULE: ScheduleDTO = {
  lunes:    { enabled: true,  start: "09:00", end: "18:00" },
  martes:   { enabled: true,  start: "09:00", end: "18:00" },
  miercoles:{ enabled: true,  start: "09:00", end: "18:00" },
  jueves:   { enabled: true,  start: "09:00", end: "18:00" },
  viernes:  { enabled: true,  start: "09:00", end: "14:00" },
  sabado:   { enabled: false, start: "09:00", end: "14:00" },
  domingo:  { enabled: false, start: "09:00", end: "14:00" },
};

const mockProfile: VeterinarioProfileDTO = {
  id: "VET-001",
  nombreCompleto: "Dr. Smith",
  correoElectronico: "dr.smith@petcare.com",
  telefono: "+52 555 987 6543",
  cedula: "12345678",
};

export const veterinarioConfiguracionService = {
  getProfile: (): Promise<VeterinarioProfileDTO> =>
    new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 600)),

  updateProfile: (dto: VeterinarioProfileDTO): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockProfile, dto);
        resolve();
      }, 600);
    }),

  getSchedule: (): Promise<ScheduleDTO> =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("vet_schedule");
          if (stored) return resolve(JSON.parse(stored));
        }
        resolve({ ...DEFAULT_SCHEDULE });
      }, 0);
    }),

  saveSchedule: (dto: ScheduleDTO, duration: string): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        for (const day in dto) {
          const d = dto[day];
          if (d.enabled && d.start >= d.end) {
            reject(new Error(`Horario inv\u00e1lido en ${day}`));
            return;
          }
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("vet_schedule", JSON.stringify(dto));
          localStorage.setItem("appointment_duration", duration);
        }
        resolve();
      }, 0);
    }),

  changePassword: (_dto: ChangePasswordDTO): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, 600)),

  getDuration: (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("appointment_duration") ?? "30";
    }
    return "30";
  },
};
