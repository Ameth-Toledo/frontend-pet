export type PacienteEstadoUI = "Activo" | "Inactivo";
export type EspecieIconUI = "dog" | "cat" | "bird" | "other";

export interface PacienteUI {
  id: string;
  nombre: string;
  especieLabel: string;
  especieIcon: EspecieIconUI;
  raza: string;
  propietario: string;
  estado: PacienteEstadoUI;
}