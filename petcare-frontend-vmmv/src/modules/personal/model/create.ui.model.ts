export type RolUI = "Administrador" | "Veterinario";

export interface CreatePersonalUI {
  rol: RolUI;
  nombreCompleto: string;
  correoElectronico: string;
  cedulaProfesional: string;
  contrasenaTemporal: string;
}

export interface CreatePersonalErrorsUI {
  nombreCompleto?: string;
  correoElectronico?: string;
  cedulaProfesional?: string;
}