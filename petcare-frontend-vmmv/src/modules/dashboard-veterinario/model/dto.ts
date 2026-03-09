export interface VetAppointmentDTO {
  id: string;
  patientName: string;
  patientBreed: string;
  patientSpecies: "dog" | "cat" | "bird" | "other";
  ownerName: string;
  time: string;
  service: string;
  type: "checkup" | "grooming" | "vaccination" | "surgery";
}

export interface VetPatientDTO {
  id: string;
  name: string;
  breed: string;
}

export interface VetDashboardStatsDTO {
  appointmentsToday: number;
  appointmentsTrend: string;
  activePatients: number;
  newPatientsThisWeek: number;
}
