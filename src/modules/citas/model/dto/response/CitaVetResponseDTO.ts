export type CitaVetEstadoDTO = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'ATENDIDA';

export interface CitaVetResponseDTO {
  id:                    string;
  paciente:              string;
  raza:                  string;
  species:               'dog' | 'cat' | 'bird' | 'other';
  propietario:           string;
  servicio:              string;
  fecha:                 string;
  hora:                  string;
  estado:                CitaVetEstadoDTO;
  observaciones_cliente: string | null;
}