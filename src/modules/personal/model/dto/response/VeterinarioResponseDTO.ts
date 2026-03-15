export type VeterinarioEstadoDTO = "ACTIVO" | "INACTIVO";
export type RolDTO = "ADMINISTRADOR" | "VETERINARIO";

export interface VeterinarioResponseDTO {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  cedula: string;
  estado: VeterinarioEstadoDTO;
  avatarInitials: string;
}