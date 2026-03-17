export type CitaEstadoDTO = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'ATENDIDA';

export interface CitaAdminResponseDTO {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: string;
  estado: CitaEstadoDTO;
  observaciones_cliente?: string | null;
}