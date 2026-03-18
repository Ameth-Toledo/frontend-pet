import { apiClient } from '@/lib/axios';
import { DashboardMetricsResponseDTO } from '../model/dto/response/MetricsResponseDTO';

export const analisisService = {
  getDashboardMetrics: async (): Promise<DashboardMetricsResponseDTO> => {
    const [citasRes, petsRes] = await Promise.all([
      apiClient.get('/citas/detalle'),
      apiClient.get('/pets/detalle'),
    ]);

    const citas = Array.isArray(citasRes.data?.data) ? citasRes.data.data : [];
    const pets  = Array.isArray(petsRes.data?.data)  ? petsRes.data.data  : [];

    const ahora    = new Date();
    const mesActual = ahora.getMonth();
    const anioActual = ahora.getFullYear();
    const citasDelMes = citas.filter((c: { fecha_cita: string }) => {
      const d = new Date(c.fecha_cita);
      return d.getMonth() === mesActual && d.getFullYear() === anioActual;
    }).length;

    const nuevosPacientes = pets.filter((p: { fecha_nacimiento?: string }) => {
      if (!p.fecha_nacimiento) return false;
      const d = new Date(p.fecha_nacimiento);
      return d.getMonth() === mesActual && d.getFullYear() === anioActual;
    }).length;

    const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const appointmentsByMonth = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(anioActual, mesActual - 5 + i, 1);
      const m = d.getMonth();
      const a = d.getFullYear();
      const count = citas.filter((c: { fecha_cita: string }) => {
        const cd = new Date(c.fecha_cita);
        return cd.getMonth() === m && cd.getFullYear() === a;
      }).length;
      return { month: MESES[m], count };
    });

    const servicioCount: Record<string, number> = {};
    citas.forEach((c: { servicio: string }) => {
      servicioCount[c.servicio] = (servicioCount[c.servicio] ?? 0) + 1;
    });
    const total = citas.length || 1;
    const colors = ['#4F8A7C', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'];
    const serviceDistribution = Object.entries(servicioCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count], i) => ({
        label,
        percentage: Math.round((count / total) * 100),
        color: colors[i] ?? '#9CA3AF',
      }));

    return {
      citasDelMes,
      citasTrend:           0,
      nuevosPacientes,
      nuevosPacientesTrend: 0,
      totalServicios:       citas.length,
      appointmentsByMonth,
      serviceDistribution,
    };
  },
};