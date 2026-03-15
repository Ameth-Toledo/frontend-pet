import { VeterinarioResponseDTO } from "../model/dto/response/VeterinarioResponseDTO";

export const mockVeterinarios: VeterinarioResponseDTO[] = [
  { id: "VET-001", nombre: "Dra. Sarah Jenkins", especialidad: "Cirugía General",           telefono: "+34 612 345 678", email: "sarah@petcare.com", cedula: "#04291-SP", estado: "ACTIVO",   avatarInitials: "SJ" },
  { id: "VET-002", nombre: "Dra. Linda Garcia",  especialidad: "Cardiología Veterinaria",   telefono: "+34 655 432 109", email: "linda@petcare.com", cedula: "#04302-LG", estado: "INACTIVO", avatarInitials: "LG" },
  { id: "VET-003", nombre: "Dr. James Wilson",   especialidad: "Dermatología Veterinaria",  telefono: "+34 699 871 234", email: "james@petcare.com", cedula: "#04318-JW", estado: "ACTIVO",   avatarInitials: "JW" },
  { id: "VET-004", nombre: "Dra. Emma Davis",    especialidad: "Oftalmología Veterinaria",  telefono: "+34 611 234 567", email: "emma@petcare.com",  cedula: "#04325-ED", estado: "ACTIVO",   avatarInitials: "ED" },
];

export function generarId(): string {
  return `VET-${String(Math.floor(Math.random() * 900) + 100)}`;
}

export function generarContrasena(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 3; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `PetCare-2024-${suffix}`;
}