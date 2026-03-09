export type EstadoMascota = "ACTIVO" | "INACTIVO";

export interface MascotaDTO {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  propietario: string;
  estado: EstadoMascota;
}
