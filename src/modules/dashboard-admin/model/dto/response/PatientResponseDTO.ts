export interface PatientResponseDTO {
  id: string;
  name: string;
  breed: string;
  species: "dog" | "cat" | "bird" | "other";
  lastSeenAt: string;
}