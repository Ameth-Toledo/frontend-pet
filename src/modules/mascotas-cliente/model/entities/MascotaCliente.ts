import { EspecieDTO } from '../dto/response/MascotaClienteResponseDTO';

export interface MascotaCliente {
  id: number;
  id_user: number;
  nombre: string;
  especie: EspecieDTO;
  fecha_nacimiento?: string | null;
  sexo?: string | null;
  peso?: number | null;
  activo: boolean;
}