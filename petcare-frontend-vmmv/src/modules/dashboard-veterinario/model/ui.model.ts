export interface VetAppointmentUI {
  id: string;
  patientName: string;
  patientBreed: string;
  patientSpecies: "dog" | "cat" | "bird" | "other";
  ownerName: string;
  time: string;
  service: string;
  badgeLabel: string;
  badgeVariant: "checkup" | "grooming";
}

export interface VetPatientUI {
  id: string;
  name: string;
  breed: string;
}

export interface VetStatsUI {
  appointmentsToday: number;
  appointmentsTrend: string;
  activePatients: number;
  newPatientsThisWeek: number;
}
