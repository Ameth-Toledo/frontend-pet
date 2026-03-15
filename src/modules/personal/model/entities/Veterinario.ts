import { VeterinarioEstadoDTO, RolDTO } from "../dto/response/VeterinarioResponseDTO";

export interface Veterinario {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  cedula: string;
  estado: VeterinarioEstadoDTO;
  avatarInitials: string;
}