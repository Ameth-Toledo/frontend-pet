import { ClienteStatusDTO } from "../dto/response/ClienteResponseDTO";

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  mascotas: string[];
  estado: ClienteStatusDTO;
}