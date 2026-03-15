export type TipoPetUI   = "perro" | "gato" | "ave" | "otro";
export type TipoCitaUI  = "consulta" | "vacuna" | "cirugia" | "otro";

export interface PetUI {
  id: string;
  nombre: string;
  tipo: TipoPetUI;
  raza: string;
}

export interface AppointmentUI {
  id: string;
  titulo: string;
  doctor: string;
  mes: string;
  dia: number;
  hora: string;
  tipo: TipoCitaUI;
}

export interface ClienteDashboardUI {
  usuarioNombre: string;
  usuarioMembresia: string;
  usuarioInitials: string;
  mascotas: PetUI[];
  proximasCitas: AppointmentUI[];
}