export type EstadoCitaDTO = "CONFIRMADA" | "CANCELADA" | "COMPLETADA";

export interface CitaDTO {
  id: string;
  fecha: string;           // ISO: "2025-02-22"
  hora: string;            // "10:00"
  motivo: string;
  mascotaNombre: string;
  estado: EstadoCitaDTO;
}