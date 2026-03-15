export type IconType = "perro" | "gato" | "ave" | "otro";

export interface MascotaUI {
  id: string;
  nombre: string;
  especie: string;
  edad: number;
  icon: IconType;
}