export type VeterinarioEstadoDTO = "ACTIVO" | "INACTIVO";
export type RolDTO = "ADMINISTRADOR" | "VETERINARIO";

export interface VeterinarioDTO {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  cedula: string;
  estado: VeterinarioEstadoDTO;
  avatarInitials: string;
}

export interface CreatePersonalDTO {
  rol: RolDTO;
  nombreCompleto: string;
  correoElectronico: string;
  cedulaProfesional: string;
  contrasenaTemporal: string;
}