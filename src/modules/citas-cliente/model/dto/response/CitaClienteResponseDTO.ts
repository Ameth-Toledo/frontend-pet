export type EstadoCitaDTO = "CONFIRMADA" | "CANCELADA" | "COMPLETADA";

export interface CitaClienteResponseDTO {
  id: string;
  fecha: string;
  hora: string;
  motivo: string;
  mascotaNombre: string;
  estado: EstadoCitaDTO;
}