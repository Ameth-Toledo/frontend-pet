import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { appointmentsService } from "../services/appointmentsService";

interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  duracion_minutos: number;
  costo?: number;
  activo: boolean;
}

export const useServicioViewModel = () => {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadServicios();
  }, []);

  const loadServicios = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const response = await appointmentsService.getServices();
      
      if (response.success) {
        const serviciosActivos = response.data.filter((s: Servicio) => s.activo);
        setServicios(serviciosActivos);
      } else {
        setError("No se pudieron cargar los servicios");
      }
    } catch (err: any) {
      console.error('Error cargando servicios:', err);
      setError('Error al cargar servicios. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const isChequeoMedico = (servicio: Servicio | null): boolean => {
    if (!servicio) return false;
    const nombre = servicio.nombre?.toLowerCase() || "";
    return nombre.includes('chequeo') || nombre.includes('consulta');
  };

  const buildMotivo = (motivoSelected: string, descripcion: string): string => {
    if (motivoSelected && descripcion) {
      return `${motivoSelected}: ${descripcion}`;
    }
    return motivoSelected || descripcion;
  };

  const validateForm = (
    selectedService: Servicio | null,
    motivoSelected: string,
    descripcion: string
  ): boolean => {
    if (!selectedService) return false;
    
    if (isChequeoMedico(selectedService)) {
      return !!(motivoSelected || descripcion);
    }
    
    return true;
  };

  const continuar = (
    selectedService: Servicio | null,
    motivoSelected: string,
    descripcion: string,
    setMotivo: (motivo: string) => void
  ) => {
    if (!selectedService) return;
    
    const motivoCompleto = buildMotivo(motivoSelected, descripcion);
    setMotivo(motivoCompleto);
    router.push('/agendar-cita/datos');
  };

  return {
    servicios,
    isLoading,
    error,
    isChequeoMedico,
    validateForm,
    continuar,
  };
};
