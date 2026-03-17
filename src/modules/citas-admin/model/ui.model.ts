export type CitaEstadoUI = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Atendida';

export interface CitaUI {
  id: string;
  paciente:          string;
  raza:              string;
  species:           'dog' | 'cat' | 'bird' | 'other';
  iniciales:         string;
  propietario:       string;
  servicio:          string;
  servicioSubtitulo: string;
  fecha:             string;
  hora:              string;
  estado:            CitaEstadoUI;
  id_mascota:        number;
  id_user:           number;
  id_veterinario?:   number | null;
}