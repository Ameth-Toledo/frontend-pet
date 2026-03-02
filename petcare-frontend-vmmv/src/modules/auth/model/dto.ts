export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
}

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

export interface ForgotPasswordResponseDTO {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponseDTO {
  success: boolean;
  message: string;
}