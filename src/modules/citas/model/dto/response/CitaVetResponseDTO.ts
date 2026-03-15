export type CitaVetEstadoDTO = "CONFIRMADA" | "CANCELADA" | "PENDIENTE";

export type ServicioVetDTO =
  | "CHEQUEO_MEDICO"
  | "LIMPIEZA_DENTAL"
  | "CONTROL_PESO"
  | "VACUNACION"
  | "CIRUGIA";

export interface CitaVetResponseDTO {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio: ServicioVetDTO;
  fecha: string;
  hora: string;
  estado: CitaVetEstadoDTO;
}