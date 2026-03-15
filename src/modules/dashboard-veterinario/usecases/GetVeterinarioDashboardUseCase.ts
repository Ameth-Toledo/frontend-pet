import { veterinarioDashboardService } from "../services/veterinarioDashboard.service";
import { VeterinarioDashboardMapper } from "../model/mapper";
import { VetAppointmentUI, VetPatientUI, VetStatsUI } from "../model/ui.model";

export interface VeterinarioDashboardData {
  stats: VetStatsUI;
  appointments: VetAppointmentUI[];
  patients: VetPatientUI[];
}

export const getVeterinarioDashboardUseCase = async (): Promise<VeterinarioDashboardData> => {
  const [statsDTO, appointmentsDTO, patientsDTO] = await Promise.all([
    veterinarioDashboardService.getStats(),
    veterinarioDashboardService.getUpcomingAppointments(),
    veterinarioDashboardService.getRecentPatients(),
  ]);

  return {
    stats:        VeterinarioDashboardMapper.statsFromDTOtoUI(statsDTO),
    appointments: appointmentsDTO.map(VeterinarioDashboardMapper.appointmentFromDTOtoUI),
    patients:     patientsDTO.map(VeterinarioDashboardMapper.patientFromDTOtoUI),
  };
};