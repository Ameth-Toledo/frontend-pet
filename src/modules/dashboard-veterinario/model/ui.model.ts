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
  _raw?: {
    estado: string;
    motivoDetalle: string;
    emailCliente: string;
    telefonoCliente: string;
    fecha: string;
    especie: string;
    sexo: string;
    peso: string;
  };
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