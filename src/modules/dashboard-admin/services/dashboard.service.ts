import { apiClient } from "@/lib/axios";
import { AppointmentResponseDTO } from "../model/dto/response/AppointmentResponseDTO";
import { PatientResponseDTO } from "../model/dto/response/PatientResponseDTO";
import { DashboardStatsResponseDTO } from "../model/dto/response/DashboardStatsResponseDTO";
import { mockStats, mockAppointments, mockRecentPatients } from "./dashboard.mock";

export const dashboardService = {
  /**
   * TODO: reemplazar mocks por:
   * const res = await apiClient.get<DashboardStatsResponseDTO>('/admin/dashboard/stats');
   * return res.data;
   */
  getStats: (): Promise<DashboardStatsResponseDTO> =>
    Promise.resolve(mockStats),

  getUpcomingAppointments: (): Promise<AppointmentResponseDTO[]> =>
    Promise.resolve(mockAppointments),

  getRecentPatients: (): Promise<PatientResponseDTO[]> =>
    Promise.resolve(mockRecentPatients),
};

void apiClient;