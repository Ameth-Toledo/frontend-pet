export type CitaEstadoDTO = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'ATENDIDA';

export interface CitaAdminResponseDTO {
  id_cita:               number;
  fecha_cita:            string;
  estado_cita:           CitaEstadoDTO;
  dueno:                 string;
  email_dueno:           string;
  telefono_dueno:        string;
  mascota:               string;
  especie:               string;
  servicio:              string;
  precio:                string;
  veterinario:           string | null;
  especialidad:          string | null;
  observaciones_cliente: string | null;
}