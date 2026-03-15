export type EstadoMascotaDTO = "ACTIVO" | "INACTIVO";

export interface MascotaResponseDTO {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  propietario: string;
  estado: EstadoMascotaDTO;
}