export interface AppointmentsByMonth {
  month: string;
  count: number;
}

export interface ServiceDistribution {
  label: string;
  percentage: number;
  color: string;
}

export interface DashboardMetrics {
  citasDelMes: number;
  citasTrend: number;
  nuevosPacientes: number;
  nuevosPacientesTrend: number;
  totalServicios: number;
  appointmentsByMonth: AppointmentsByMonth[];
  serviceDistribution: ServiceDistribution[];
}