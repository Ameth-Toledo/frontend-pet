import { VetAppointmentDTO, VetPatientDTO, VetDashboardStatsDTO } from "../model/dto";

const mockStats: VetDashboardStatsDTO = {
  appointmentsToday: 12,
  appointmentsTrend: "+15% respecto a ayer",
  activePatients: 48,
  newPatientsThisWeek: 8,
};

const mockAppointments: VetAppointmentDTO[] = [
  {
    id: "apt-1",
    patientName: "Buddy",
    patientBreed: "Golden Retriever",
    patientSpecies: "dog",
    ownerName: "Sarah Jenkins",
    time: "09:30 AM",
    service: "Chequeo médico",
    type: "checkup",
  },
  {
    id: "apt-2",
    patientName: "Luna",
    patientBreed: "Siamese Cat",
    patientSpecies: "cat",
    ownerName: "Mark Thompson",
    time: "11:15 AM",
    service: "Corte de pelo y baño",
    type: "grooming",
  },
];

const mockRecentPatients: VetPatientDTO[] = [
  { id: "pat-1", name: "Maximus", breed: "Golden Retriever" },
  { id: "pat-2", name: "Misty",   breed: "Siamés" },
  { id: "pat-3", name: "Bella",   breed: "Pastor Alemán" },
];

export const veterinarioDashboardService = {
  getStats: (): Promise<VetDashboardStatsDTO> =>
    Promise.resolve(mockStats),

  getUpcomingAppointments: (): Promise<VetAppointmentDTO[]> =>
    Promise.resolve(mockAppointments),

  getRecentPatients: (): Promise<VetPatientDTO[]> =>
    Promise.resolve(mockRecentPatients),
};
