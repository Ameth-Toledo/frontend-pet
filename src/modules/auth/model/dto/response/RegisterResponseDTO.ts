export interface RegisterResponseDTO {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}