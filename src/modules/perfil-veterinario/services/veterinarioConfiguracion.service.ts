import { apiClient } from '@/lib/axios';
import { VeterinarioProfileResponseDTO } from '../model/dto/response/VeterinarioProfileResponseDTO';
import { ScheduleResponseDTO } from '../model/dto/response/ScheduleResponseDTO';
import { SaveScheduleRequestDTO } from '../model/dto/request/SaveScheduleRequestDTO';
import { ChangePasswordVetRequestDTO } from '../model/dto/request/ChangePasswordVetRequestDTO';
import { DEFAULT_SCHEDULE } from './veterinarioConfiguracion.mock';

const DIAS_MAP: Record<string, string> = {
  lunes:     'Lunes',
  martes:    'Martes',
  miercoles: 'Miércoles',
  jueves:    'Jueves',
  viernes:   'Viernes',
  sabado:    'Sábado',
  domingo:   'Domingo',
};

const DOW_MAP: Record<string, number> = {
  lunes:     1,
  martes:    2,
  miercoles: 3,
  jueves:    4,
  viernes:   5,
  sabado:    6,
  domingo:   0,
};

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

  saveSchedule: async (dto: SaveScheduleRequestDTO, duration: string): Promise<void> => {
    for (const day in dto) {
      const d = dto[day];
      if (d.enabled && d.start >= d.end) {
        throw new Error(`Horario inválido en ${day}`);
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('vet_schedule', JSON.stringify(dto));
      localStorage.setItem('appointment_duration', duration);
    }

    const stored = localStorage.getItem('user');
    if (!stored) return;
    const user = JSON.parse(stored);
    const vetId = user.id;

    const hoy = new Date();
    const slots: Promise<unknown>[] = [];

    for (let i = 0; i < 30; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const dow = fecha.getDay();

      for (const day in dto) {
        const d = dto[day];
        if (!d.enabled) continue;
        if (DOW_MAP[day] !== dow) continue;

        const fechaStr = fecha.toISOString().split('T')[0];
        slots.push(
          apiClient.post('/agenda', {
            veterinario_id: vetId,
            fecha:          fechaStr,
            dia_nombre:     DIAS_MAP[day],
            hora_inicio:    d.start,
            hora_fin:       d.end,
          }).catch((err) => console.error('Error agenda:', err.response?.data))
        );
      }
    }

    await Promise.all(slots);
  },

  changePassword: async (dto: ChangePasswordVetRequestDTO): Promise<void> => {
    await apiClient.put('/veterinarios/cambiar-password', {
      password_actual: dto.currentPassword,
      password_nueva:  dto.newPassword,
    });
  },

  getDuration: (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appointment_duration') ?? '30';
    }
    return '30';
  },
};