export interface ClienteConfiguracionDTO {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  rol: string;
}

export interface ChangePasswordDTO {
  passwordActual: string;
  nuevaPassword: string;
  confirmarPassword: string;
}