export interface CitaDetailData {
  nombre: string;
  raza: string;
  especie: string;
  propietario: string;
  servicio: string;
  hora: string;
  fecha?: string;
  profesional?: string;
}

export interface CitaDetailModalProps {
  data: CitaDetailData;
  onClose: () => void;
}