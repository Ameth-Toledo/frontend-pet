export interface LoginResponseDTO {
  success: true;
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: 'ADMIN' | 'VETERINARIO' | 'CLIENTE';
    password_temporal: boolean;
    foto_perfil: string | null;
  };
}