import { DashboardMetricsResponseDTO } from "./dto/response/MetricsResponseDTO";
import { DashboardMetrics } from "./entities/DashboardMetrics";
import { DashboardMetricsUI } from "./metrics.ui.model";

function formatTrend(value: number): string {
  return value >= 0 ? `+${value}%` : `${value}%`;
}

function formatTotal(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export class AnalisisMapper {
  static toEntity(dto: DashboardMetricsResponseDTO): DashboardMetrics {
    return {
      citasDelMes:          dto.citasDelMes,
      citasTrend:           dto.citasTrend,
      nuevosPacientes:      dto.nuevosPacientes,
      nuevosPacientesTrend: dto.nuevosPacientesTrend,
      totalServicios:       dto.totalServicios,
      appointmentsByMonth:  dto.appointmentsByMonth,
      serviceDistribution:  dto.serviceDistribution,
    };
  }

  static toUIModel(entity: DashboardMetrics): DashboardMetricsUI {
    return {
      citasDelMes:                  entity.citasDelMes,
      citasTrendLabel:              formatTrend(entity.citasTrend),
      citasTrendPositive:           entity.citasTrend >= 0,
      nuevosPacientes:              entity.nuevosPacientes,
      nuevosPacientesTrendLabel:    formatTrend(entity.nuevosPacientesTrend),
      nuevosPacientesTrendPositive: entity.nuevosPacientesTrend >= 0,
      totalServiciosLabel:          formatTotal(entity.totalServicios),
      appointmentsByMonth:          entity.appointmentsByMonth,
      serviceDistribution:          entity.serviceDistribution,
    };
  }

  static fromDTOtoUI(dto: DashboardMetricsResponseDTO): DashboardMetricsUI {
    return AnalisisMapper.toUIModel(AnalisisMapper.toEntity(dto));
  }
}