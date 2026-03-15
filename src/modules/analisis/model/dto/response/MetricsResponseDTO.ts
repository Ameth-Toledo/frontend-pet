export interface AppointmentsByMonthDTO {
  month: string;
  count: number;
}

export interface ServiceDistributionDTO {
  label: string;
  percentage: number;
  color: string;
}

export interface DashboardMetricsResponseDTO {
  citasDelMes: number;
  citasTrend: number;
  nuevosPacientes: number;
  nuevosPacientesTrend: number;
  totalServicios: number;
  appointmentsByMonth: AppointmentsByMonthDTO[];
  serviceDistribution: ServiceDistributionDTO[];
}