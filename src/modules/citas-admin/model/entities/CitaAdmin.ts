import { CitaEstadoDTO } from '../dto/response/CitaAdminResponseDTO';

export interface CitaAdmin {
  id:              string;
  paciente:        string;
  raza:            string;
  species:         'dog' | 'cat' | 'bird' | 'other';
  propietario:     string;
  servicio:        string;
  fecha:           string;
  hora:            string;
  estado:          CitaEstadoDTO;
  id_mascota:      number;
  id_user:         number;
  id_veterinario?: number | null;
  veterinario?:    string | null;
}