export type CitaVetEstadoUI = "Confirmada" | "Cancelada" | "Pendiente" | "Atendida";

export type ServicioVetUI =
  | "Chequeo médico"
  | "Limpieza dental"
  | "Control de peso"
  | "Vacunación"
  | "Cirugía";

export interface CitaVetUI {
  id:          string;
  paciente:    string;
  raza:        string;
  species:     "dog" | "cat" | "bird" | "other";
  propietario: string;
  servicio:    string;
  fecha:       string;
  hora:        string;
  estado:      CitaVetEstadoUI;
}