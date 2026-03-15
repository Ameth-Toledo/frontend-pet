import { EstadoCitaDTO } from "../dto/response/CitaClienteResponseDTO";

export interface CitaCliente {
  id: string;
  fecha: string;
  hora: string;
  motivo: string;
  mascotaNombre: string;
  estado: EstadoCitaDTO;
}