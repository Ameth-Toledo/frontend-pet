export type EstadoMascotaUI = "ACTIVO" | "INACTIVO";

export interface MascotaUI {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  propietario: string;
  estado: EstadoMascotaUI;
}