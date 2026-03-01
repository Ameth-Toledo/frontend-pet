export interface ClienteConfiguracionUI {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  rol: string;
}

export interface ChangePasswordFormUI {
  passwordActual: string;
  nuevaPassword: string;
  confirmarPassword: string;
}