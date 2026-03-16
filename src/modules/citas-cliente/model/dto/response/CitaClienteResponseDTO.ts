export type EstadoCitaDTO = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';

export interface CitaClienteResponseDTO {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: string;
  estado: EstadoCitaDTO;
  observaciones_cliente?: string | null;
}