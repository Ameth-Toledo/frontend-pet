import { apiClient } from '@/lib/axios';
import { AppointmentResponseDTO } from '../model/dto/response/AppointmentResponseDTO';
import { PatientResponseDTO } from '../model/dto/response/PatientResponseDTO';
import { DashboardStatsResponseDTO } from '../model/dto/response/DashboardStatsResponseDTO';

export const dashboardService = {

  getStats: async (): Promise<DashboardStatsResponseDTO> => {
    const [citasRes, petsRes] = await Promise.all([
      apiClient.get('/citas/detalle'),
      apiClient.get('/pets/detalle'),
    ]);

    const citas = Array.isArray(citasRes.data?.data) ? citasRes.data.data : [];
    const pets  = Array.isArray(petsRes.data?.data)  ? petsRes.data.data  : [];

    const hoy = new Date().toDateString();
    const citasHoy = citas.filter((c: { fecha_cita: string }) =>
      new Date(c.fecha_cita).toDateString() === hoy
    ).length;

    const hace7dias = new Date();
    hace7dias.setDate(hace7dias.getDate() - 7);
    const nuevosEstaSemana = pets.filter((p: { fecha_nacimiento?: string }) =>
      p.fecha_nacimiento && new Date(p.fecha_nacimiento) >= hace7dias
    ).length;

    return {
      appointmentsToday:   citasHoy,
      appointmentsTrend:   `${citas.length} citas en total`,
      activePatients:      pets.filter((p: { activo: boolean }) => p.activo).length,
      newPatientsThisWeek: nuevosEstaSemana,
    };
  },

  getUpcomingAppointments: async (): Promise<AppointmentResponseDTO[]> => {
    const res  = await apiClient.get('/citas/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    const typeMap: Record<string, AppointmentResponseDTO['type']> = {
      'Consulta general': 'checkup',
      'Vacunación':       'vaccination',
      'Baño y corte':     'grooming',
      'Cirugía menor':    'surgery',
      'Desparasitación':  'checkup',
    };

    return data
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
        type:           typeMap[c.servicio] ?? 'checkup',
      }));
  },

  getRecentPatients: async (): Promise<PatientResponseDTO[]> => {
    const res  = await apiClient.get('/pets/detalle');
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    return data
      .slice(0, 5)
      .map((p: {
        id_mascota: number; nombre: string; especie: string; fecha_nacimiento?: string;
      }) => ({
        id:         String(p.id_mascota),
        name:       p.nombre,
        breed:      p.especie,
        species:    p.especie === 'Perro' ? 'dog' : p.especie === 'Gato' ? 'cat' : 'other',
        lastSeenAt: p.fecha_nacimiento ?? '',
      }));
  },
};