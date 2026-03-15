import { RolDTO } from "../response/VeterinarioResponseDTO";

export interface CreatePersonalRequestDTO {
  rol: RolDTO;
  nombreCompleto: string;
  correoElectronico: string;
  cedulaProfesional: string;
  contrasenaTemporal: string;
}