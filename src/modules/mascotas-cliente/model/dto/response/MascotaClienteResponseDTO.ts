export type EspecieDTO = 'Perro' | 'Gato';

export interface MascotaClienteResponseDTO {
  id: number;
  id_user: number;
  especie: EspecieDTO;
  nombre: string;
  fecha_nacimiento?: string | null;
  sexo?: string | null;
  peso?: number | null;
  activo: boolean;
}