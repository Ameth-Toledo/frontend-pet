import { dashboardService } from "../services/dashboard.service";
import { DashboardMapper } from "../model/mapper";
import { AppointmentUI, PatientUI, StatsUI } from "../model/ui.model";

export interface DashboardData {
  stats: StatsUI;
  appointments: AppointmentUI[];
  patients: PatientUI[];
}

export const getDashboardUseCase = async (): Promise<DashboardData> => {
  const [statsDTO, appointmentsDTO, patientsDTO] = await Promise.all([
    dashboardService.getStats(),
    dashboardService.getUpcomingAppointments(),
    dashboardService.getRecentPatients(),
  ]);

  return {
    stats:        DashboardMapper.statsFromDTOtoUI(statsDTO),
    appointments: appointmentsDTO.map(DashboardMapper.appointmentFromDTOtoUI),
    patients:     patientsDTO.map(DashboardMapper.patientFromDTOtoUI),
  };
};