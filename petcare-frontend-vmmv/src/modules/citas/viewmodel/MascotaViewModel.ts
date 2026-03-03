import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Raza {
  id_raza: number;
  nombre: string;
  id_especie: number;
}

export const useMascotaViewModel = (email: string) => {
  const router = useRouter();
  const [razas, setRazas] = useState<Raza[]>([]);
  const [isLoadingRazas, setIsLoadingRazas] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Validar que vengan datos del paso anterior
    if (!email) {
      router.push('/agendar-cita/datos');
    }
  }, [email, router]);

  const loadRazas = async (especieId: number) => {
    try {
      setIsLoadingRazas(true);
      setError("");

      const response = await fetch(`http://localhost:3003/api/pets/breeds?species_id=${especieId}`);
      const data = await response.json();

      if (data.success && data.data) {
        setRazas(data.data);
      } else {
        // Fallback con razas hardcodeadas
        setRazas(getFallbackRazas(especieId));
      }
    } catch (err) {
      console.error('Error cargando razas:', err);
      setRazas(getFallbackRazas(especieId));
    } finally {
      setIsLoadingRazas(false);
    }
  };

  const getFallbackRazas = (especieId: number): Raza[] => {
    if (especieId === 1) {
      return [
        { id_raza: 1, nombre: "Labrador", id_especie: 1 },
        { id_raza: 2, nombre: "Golden Retriever", id_especie: 1 },
        { id_raza: 3, nombre: "Bulldog", id_especie: 1 },
        { id_raza: 4, nombre: "Poodle", id_especie: 1 },
        { id_raza: 5, nombre: "Chihuahua", id_especie: 1 },
        { id_raza: 6, nombre: "Pastor Alemán", id_especie: 1 },
        { id_raza: 7, nombre: "Beagle", id_especie: 1 },
        { id_raza: 8, nombre: "Rottweiler", id_especie: 1 },
        { id_raza: 9, nombre: "Mestizo", id_especie: 1 },
      ];
    } else {
      return [
        { id_raza: 10, nombre: "Persa", id_especie: 2 },
        { id_raza: 11, nombre: "Siamés", id_especie: 2 },
        { id_raza: 12, nombre: "Maine Coon", id_especie: 2 },
        { id_raza: 13, nombre: "Ragdoll", id_especie: 2 },
        { id_raza: 14, nombre: "Bengal", id_especie: 2 },
        { id_raza: 15, nombre: "Mestizo", id_especie: 2 },
      ];
    }
  };

  const validateForm = (especie: string, nombreMascota: string, raza: string): boolean => {
    return !!(especie && nombreMascota.trim() && raza);
  };

  const continuar = (
    especie: string,
    nombreMascota: string,
    raza: string,
    saveToContext: (especie: string, nombreMascota: string, raza: string) => void
  ) => {
    if (!validateForm(especie, nombreMascota, raza)) {
      console.error('Formulario incompleto');
      return;
    }

    saveToContext(especie, nombreMascota, raza);
    router.push('/agendar-cita/fecha');
  };

  return {
    razas,
    isLoadingRazas,
    error,
    loadRazas,
    validateForm,
    continuar
  };
};