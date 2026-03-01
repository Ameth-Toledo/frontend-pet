"use client";

import { useEffect, useState } from "react";
import { clienteCitasService } from "../services/clienteCitas.service";
import { mapCitaDTOtoUI } from "../model/mapper";
import { CitaUI } from "../model/ui.model";

interface ClienteCitasViewModelState {
  citas: CitaUI[];
  isLoading: boolean;
}

export function useClienteCitasViewModel(): ClienteCitasViewModelState {
  const [citas, setCitas] = useState<CitaUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCitas = async () => {
      setIsLoading(true);
      const dtos = await clienteCitasService.getCitas();
      setCitas(dtos.map(mapCitaDTOtoUI));
      setIsLoading(false);
    };
    fetchCitas();
  }, []);

  return { citas, isLoading };
}