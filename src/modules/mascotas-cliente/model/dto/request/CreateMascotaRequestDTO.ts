export interface CreateMascotaRequestDTO {
  id_user: number;
  especie: 'Perro' | 'Gato';
  nombre: string;
  fecha_nacimiento: string;
  sexo: 'Macho' | 'Hembra';
  peso: number;
}