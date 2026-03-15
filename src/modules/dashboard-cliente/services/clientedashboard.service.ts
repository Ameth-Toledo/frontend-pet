import { apiClient } from "@/lib/axios";
import { ClienteDashboardResponseDTO } from "../model/dto/response/ClienteDashboardResponseDTO";
import { mockClienteDashboard } from "./clientedashboard.mock";

export const clienteDashboardService = {
  /**
   * TODO: reemplazar mock por:
   * const res = await apiClient.get<ClienteDashboardResponseDTO>('/cliente/dashboard');
   * return res.data;
   */
  getDashboard: (): Promise<ClienteDashboardResponseDTO> =>
    new Promise((resolve) => setTimeout(() => resolve(mockClienteDashboard), 600)),
};

void apiClient;