export type IconType = 'perro' | 'gato';

export interface MascotaUI {
  id: number;
  nombre: string;
  especie: string;
  icon: IconType;
  sexo?: string | null;
  peso?: number | null;
  fecha_nacimiento?: string | null;
}