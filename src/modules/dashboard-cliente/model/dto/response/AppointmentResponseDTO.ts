export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';

export interface GetCitaResponse {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: string;
  estado: EstadoCita;
  observaciones_cliente?: string | null;
}