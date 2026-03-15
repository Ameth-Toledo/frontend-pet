export interface AppointmentResponseDTO {
  id: string;
  patientName: string;
  patientBreed: string;
  patientSpecies: "dog" | "cat" | "bird" | "other";
  ownerName: string;
  time: string;
  type: "checkup" | "grooming" | "vaccination" | "surgery";
}