export interface AgregarMascotaModalProps {
  onClose: () => void;
  onGuardar: (nombre: string, especie: string, raza: string) => void;
}