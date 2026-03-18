import { apiClient } from '@/lib/axios';
import { VetAppointmentResponseDTO } from '../model/dto/response/VetAppointmentResponseDTO';
import { VetPatientResponseDTO } from '../model/dto/response/VetPatientResponseDTO';
import { VetDashboardStatsResponseDTO } from '../model/dto/response/VetDashboardStatsResponseDTO';

export const veterinarioDashboardService = {

  getStats: async (): Promise<VetDashboardStatsResponseDTO> => {
    const stored = localStorage.getItem('user');
    if (!stored) return { appointmentsToday: 0, appointmentsTrend: '0 citas en total', activePatients: 0, newPatientsThisWeek: 0 };
    const user = JSON.parse(stored);
    const vetNombre = user.fullName ?? '';

    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    const misCitas = data.filter((c: { veterinario: string | null }) =>
      c.veterinario && c.veterinario.toLowerCase().includes(
        vetNombre.toLowerCase().split(' ')[0]
      )
    );

    const hoy = new Date().toDateString();
    const citasHoy = misCitas.filter((c: { fecha_cita: string }) =>
      new Date(c.fecha_cita).toDateString() === hoy
    ).length;

    const mascotasUnicas = new Set(misCitas.map((c: { mascota: string }) => c.mascota)).size;

    return {
      appointmentsToday:   citasHoy,
      appointmentsTrend:   `${misCitas.length} citas en total`,
      activePatients:      mascotasUnicas,
      newPatientsThisWeek: 0,
    };
  },

  getUpcomingAppointments: async (): Promise<VetAppointmentResponseDTO[]> => {
    const stored = localStorage.getItem('user');
    if (!stored) return [];
    const user = JSON.parse(stored);
    const vetNombre = user.fullName ?? '';

    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    const typeMap: Record<string, VetAppointmentResponseDTO['type']> = {
      'Consulta general': 'checkup',
      'Vacunación':       'vaccination',
      'Baño y corte':     'grooming',
      'Cirugía menor':    'surgery',
      'Desparasitación':  'checkup',
    };

    return data
      .filter((c: { veterinario: string | null }) =>
        c.veterinario && c.veterinario.toLowerCase().includes(
          vetNombre.toLowerCase().split(' ')[0]
        )
      )
      .slice(0, 5)
      .map((c: {
        id_cita: number; mascota: string; especie: string;
        dueno: string; fecha_cita: string; servicio: string;
      }) => ({
        id:             String(c.id_cita),
        patientName:    c.mascota,
        patientBreed:   c.especie,
        patientSpecies: c.especie === 'Perro' ? 'dog' : c.especie === 'Gato' ? 'cat' : 'other',
        ownerName:      c.dueno,
        time:           new Date(c.fecha_cita).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true }),
        service:        c.servicio,
        type:           typeMap[c.servicio] ?? 'checkup',
      }));
  },

  getRecentPatients: async (): Promise<VetPatientResponseDTO[]> => {
    const stored = localStorage.getItem('user');
    if (!stored) return [];
    const user = JSON.parse(stored);
    const vetNombre = user.fullName ?? '';

    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    const misCitas = data.filter((c: { veterinario: string | null }) =>
      c.veterinario && c.veterinario.toLowerCase().includes(
        vetNombre.toLowerCase().split(' ')[0]
      )
    );

    const mascotasMap = new Map<string, VetPatientResponseDTO>();
    misCitas.forEach((c: { id_cita: number; mascota: string; especie: string }) => {
      if (!mascotasMap.has(c.mascota)) {
        mascotasMap.set(c.mascota, {
          id:    String(c.id_cita),
          name:  c.mascota,
          breed: c.especie,
        });
      }
    });

    return Array.from(mascotasMap.values()).slice(0, 5);
  },
};