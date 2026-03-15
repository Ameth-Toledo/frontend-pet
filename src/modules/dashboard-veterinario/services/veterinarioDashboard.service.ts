import { apiClient } from "@/lib/axios";
import { VetAppointmentResponseDTO } from "../model/dto/response/VetAppointmentResponseDTO";
import { VetPatientResponseDTO } from "../model/dto/response/VetPatientResponseDTO";
import { VetDashboardStatsResponseDTO } from "../model/dto/response/VetDashboardStatsResponseDTO";
import { mockVetStats, mockVetAppointments, mockVetRecentPatients } from "./veterinarioDashboard.mock";

export const veterinarioDashboardService = {
  /**
   * TODO: reemplazar mocks por:
   * const res = await apiClient.get<VetDashboardStatsResponseDTO>('/veterinario/dashboard/stats');
   * return res.data;
   */
  getStats: (): Promise<VetDashboardStatsResponseDTO> =>
    Promise.resolve(mockVetStats),

  getUpcomingAppointments: (): Promise<VetAppointmentResponseDTO[]> =>
    Promise.resolve(mockVetAppointments),

  getRecentPatients: (): Promise<VetPatientResponseDTO[]> =>
    Promise.resolve(mockVetRecentPatients),
};

void apiClient;