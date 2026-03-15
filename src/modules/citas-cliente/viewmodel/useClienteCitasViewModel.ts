"use client";

import { useEffect, useState } from "react";
import { getCitasClienteUseCase } from "../usecases/GetCitasClienteUseCase";
import { CitaUI } from "../model/ui.model";

interface ClienteCitasViewModelState {
  citas: CitaUI[];
  isLoading: boolean;
  error: string | null;
  selectedCita: CitaUI | null;
  setSelectedCita: (cita: CitaUI | null) => void;
}

export function useClienteCitasViewModel(): ClienteCitasViewModelState {
  const [citas, setCitas]               = useState<CitaUI[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [selectedCita, setSelectedCita] = useState<CitaUI | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setCitas(await getCitasClienteUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar las citas");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { citas, isLoading, error, selectedCita, setSelectedCita };
}