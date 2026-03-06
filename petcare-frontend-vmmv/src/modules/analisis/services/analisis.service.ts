import { DashboardMetricsDTO } from "../model/metrics.dto";

const mockMetrics: DashboardMetricsDTO = {
  citasDelMes: 458,
  citasTrend: 12,
  nuevosPacientes: 124,
  nuevosPacientesTrend: 8,
  totalServicios: 1200,
  appointmentsByMonth: [
    { month: "Ene", count: 40 },
    { month: "Feb", count: 85 },
    { month: "Mar", count: 60 },
    { month: "Abr", count: 120 },
    { month: "May", count: 90 },
    { month: "Jun", count: 150 },
  ],
  serviceDistribution: [
    { label: "Vacunas",    percentage: 45, color: "#4F8A7C" },
    { label: "Baño & Corte", percentage: 30, color: "#F59E0B" },
    { label: "Consultas",  percentage: 15, color: "#93C5FD" },
    { label: "Cirugías",   percentage: 10, color: "#1F2937" },
  ],
};

export const analisisService = {
  getDashboardMetrics: (): Promise<DashboardMetricsDTO> =>
    new Promise((resolve) => setTimeout(() => resolve(mockMetrics), 700)),
};