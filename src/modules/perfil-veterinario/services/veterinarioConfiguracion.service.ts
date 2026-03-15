import { apiClient } from "@/lib/axios";
import { VeterinarioProfileResponseDTO } from "../model/dto/response/VeterinarioProfileResponseDTO";
import { ScheduleResponseDTO } from "../model/dto/response/ScheduleResponseDTO";
import { UpdateVetProfileRequestDTO } from "../model/dto/request/UpdateVetProfileRequestDTO";
import { SaveScheduleRequestDTO } from "../model/dto/request/SaveScheduleRequestDTO";
import { ChangePasswordVetRequestDTO } from "../model/dto/request/ChangePasswordVetRequestDTO";
import { mockVetProfile, DEFAULT_SCHEDULE } from "./veterinarioConfiguracion.mock";

export const veterinarioConfiguracionService = {
  getProfile: (): Promise<VeterinarioProfileResponseDTO> =>
    new Promise((resolve) => setTimeout(() => resolve({ ...mockVetProfile }), 600)),

  updateProfile: (dto: UpdateVetProfileRequestDTO): Promise<void> =>
    new Promise((resolve) => setTimeout(() => { Object.assign(mockVetProfile, dto); resolve(); }, 600)),

  getSchedule: (): Promise<ScheduleResponseDTO> =>
    new Promise((resolve) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("vet_schedule");
        if (stored) return resolve(JSON.parse(stored));
      }
      resolve({ ...DEFAULT_SCHEDULE });
    }),

  saveSchedule: (dto: SaveScheduleRequestDTO, duration: string): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        for (const day in dto) {
          const d = dto[day];
          if (d.enabled && d.start >= d.end) {
            reject(new Error(`Horario inválido en ${day}`));
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

  changePassword: (dto: ChangePasswordVetRequestDTO): Promise<void> =>
    new Promise((resolve) => setTimeout(() => resolve(), 600)),

  getDuration: (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("appointment_duration") ?? "30";
    }
    return "30";
  },
};

void apiClient;