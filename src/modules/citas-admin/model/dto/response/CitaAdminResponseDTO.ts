export type CitaEstadoDTO = "CONFIRMADA" | "CANCELADA";

export type ServicioDTO =
  | "CHEQUEO_MEDICO"
  | "LIMPIEZA_DENTAL"
  | "CONTROL_PESO"
  | "VACUNACION"
  | "CIRUGIA";

export interface CitaAdminResponseDTO {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio: ServicioDTO;
  fecha: string;
  hora: string;
  estado: CitaEstadoDTO;
}