export type ClienteStatusDTO = "ACTIVO" | "INACTIVO";

export interface ClienteResponseDTO {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  mascotas: string[];
  estado: ClienteStatusDTO;
}