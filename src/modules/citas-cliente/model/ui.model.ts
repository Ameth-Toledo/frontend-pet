export type EstadoCitaUI = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';

export interface CitaUI {
  id: string;
  fechaFormateada: string;
  hora: string;
  titulo: string;
  mascotaNombre: string;
  motivo: string;
  estado: EstadoCitaUI;
}