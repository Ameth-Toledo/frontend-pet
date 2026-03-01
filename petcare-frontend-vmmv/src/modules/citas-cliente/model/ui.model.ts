export type EstadoCitaUI = "CONFIRMADA" | "CANCELADA" | "COMPLETADA";

export interface CitaUI {
  id: string;
  fechaFormateada: string;  // "DOMINGO 22 DE FEB"
  hora: string;             // "10:00"
  titulo: string;           // "General Checkup para Firrolais"
  estado: EstadoCitaUI;
}