export type VeterinarioEstadoUI = 'Activo' | 'Inactivo';
export type RolUI = 'ADMINISTRADOR' | 'VETERINARIO';

export interface VeterinarioUI {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  cedula: string;
  estado: VeterinarioEstadoUI;
  avatarInitials: string;
  rol: RolUI;
}