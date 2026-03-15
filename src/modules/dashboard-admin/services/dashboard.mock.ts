import { AppointmentResponseDTO } from "../model/dto/response/AppointmentResponseDTO";
import { PatientResponseDTO } from "../model/dto/response/PatientResponseDTO";
import { DashboardStatsResponseDTO } from "../model/dto/response/DashboardStatsResponseDTO";

export const mockStats: DashboardStatsResponseDTO = {
  appointmentsToday:   12,
  appointmentsTrend:   "+15% más que ayer",
  activePatients:      48,
  newPatientsThisWeek: 8,
};

export const mockAppointments: AppointmentResponseDTO[] = [
  { id: "apt-1", patientName: "Buddy", patientBreed: "Golden Retriever", patientSpecies: "dog", ownerName: "Sarah Jenkins", time: "09:30 AM", type: "checkup"     },
  { id: "apt-2", patientName: "Luna",  patientBreed: "Siamese Cat",      patientSpecies: "cat", ownerName: "Mark Thompson", time: "11:15 AM", type: "grooming"    },
  { id: "apt-3", patientName: "Max",   patientBreed: "Labrador",         patientSpecies: "dog", ownerName: "Emily Carter",  time: "01:00 PM", type: "vaccination" },
];

export const mockRecentPatients: PatientResponseDTO[] = [
  { id: "pat-1", name: "Maximus", breed: "Beagle",         species: "dog", lastSeenAt: "Seen 2h ago"    },
  { id: "pat-2", name: "Misty",   breed: "Tabby",          species: "cat", lastSeenAt: "Seen 4h ago"    },
  { id: "pat-3", name: "Bella",   breed: "Border Terrier", species: "dog", lastSeenAt: "Seen yesterday" },
];