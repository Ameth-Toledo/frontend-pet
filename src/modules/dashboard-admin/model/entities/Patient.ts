export interface Patient {
  id: string;
  name: string;
  breed: string;
  species: "dog" | "cat" | "bird" | "other";
  lastSeenAt: string;
}