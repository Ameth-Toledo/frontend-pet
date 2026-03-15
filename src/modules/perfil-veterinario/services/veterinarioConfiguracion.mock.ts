import { VeterinarioProfileResponseDTO } from "../model/dto/response/VeterinarioProfileResponseDTO";
import { ScheduleResponseDTO } from "../model/dto/response/ScheduleResponseDTO";

export const mockVetProfile: VeterinarioProfileResponseDTO = {
  id:                "VET-001",
  nombreCompleto:    "Dr. Smith",
  correoElectronico: "dr.smith@petcare.com",
  telefono:          "+52 555 987 6543",
  cedula:            "12345678",
};

export const DEFAULT_SCHEDULE: ScheduleResponseDTO = {
  lunes:     { enabled: true,  start: "09:00", end: "18:00" },
  martes:    { enabled: true,  start: "09:00", end: "18:00" },
  miercoles: { enabled: true,  start: "09:00", end: "18:00" },
  jueves:    { enabled: true,  start: "09:00", end: "18:00" },
  viernes:   { enabled: true,  start: "09:00", end: "14:00" },
  sabado:    { enabled: false, start: "09:00", end: "14:00" },
  domingo:   { enabled: false, start: "09:00", end: "14:00" },
};