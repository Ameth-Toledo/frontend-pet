export type CitaVetEstadoUI = "Confirmada" | "Cancelada" | "Pendiente";

export type ServicioVetUI =
  | "Chequeo médico"
  | "Limpieza dental"
  | "Control de peso"
  | "Vacunación"
  | "Cirugía";

export interface CitaVetUI {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio: ServicioVetUI;
  fecha: string;
  hora: string;
  estado: CitaVetEstadoUI;
}
