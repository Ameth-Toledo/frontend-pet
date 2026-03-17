import { apiClient } from '@/lib/axios';
import { VeterinarioProfileResponseDTO } from '../model/dto/response/VeterinarioProfileResponseDTO';
import { ScheduleResponseDTO } from '../model/dto/response/ScheduleResponseDTO';
import { SaveScheduleRequestDTO } from '../model/dto/request/SaveScheduleRequestDTO';
import { ChangePasswordVetRequestDTO } from '../model/dto/request/ChangePasswordVetRequestDTO';
import { DEFAULT_SCHEDULE } from './veterinarioConfiguracion.mock';

export const veterinarioConfiguracionService = {

  getProfile: async (): Promise<VeterinarioProfileResponseDTO> => {
    const stored = localStorage.getItem('user');
    if (!stored) throw new Error('No hay sesión activa');
    const user = JSON.parse(stored);
    return {
      id:                String(user.id),
      nombreCompleto:    user.fullName  ?? '',
      correoElectronico: user.email     ?? '',
      telefono:          user.telefono  ?? '',
      cedula:            '',
    };
  },

  updateProfile: async (): Promise<void> => {
    // No hay endpoint de update para veterinarios por ahora
    return Promise.resolve();
  },

  getSchedule: (): Promise<ScheduleResponseDTO> =>
    new Promise((resolve) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('vet_schedule');
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('vet_schedule', JSON.stringify(dto));
          localStorage.setItem('appointment_duration', duration);
        }
        resolve();
      }, 0);
    }),

  changePassword: async (dto: ChangePasswordVetRequestDTO): Promise<void> => {
    await apiClient.put('/veterinarios/cambiar-password', {
      password_nueva: dto.newPassword,
    });
  },

  getDuration: (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appointment_duration') ?? '30';
    }
    return '30';
  },
};