import { EspecieDTO } from "../dto/response/MascotaClienteResponseDTO";

export interface MascotaCliente {
  id: string;
  nombre: string;
  especie: EspecieDTO;
  edad: number;
}