import { apiClient } from "@/lib/axios";
import { DashboardMetricsResponseDTO } from "../model/dto/response/MetricsResponseDTO";
import { mockMetrics } from "./analisis.mock";

export const analisisService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<DashboardMetricsResponseDTO>('/admin/analisis');
   * return res.data;
   */
  getDashboardMetrics: (): Promise<DashboardMetricsResponseDTO> =>
    new Promise((resolve) => setTimeout(() => resolve(mockMetrics), 700)),
};

void apiClient;