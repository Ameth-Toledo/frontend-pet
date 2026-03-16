export interface RegisterRequestDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  imagenPerfil?: File;
}