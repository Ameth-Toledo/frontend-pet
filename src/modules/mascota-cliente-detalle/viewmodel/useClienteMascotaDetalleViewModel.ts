"use client";

import { useEffect, useState } from "react";
import { getMascotaDetalleUseCase } from "../usecases/GetMascotaDetalleUseCase";
import { getHistorialUseCase } from "../usecases/GetHistorialUseCase";
import { getVacunasUseCase } from "../usecases/GetVacunasUseCase";
import { MascotaDetalleUI, HistorialUI, VacunaUI, TabActivo } from "../model/ui.model";

interface ClienteMascotaDetalleViewModelState {
  mascota: MascotaDetalleUI | null;
  historial: HistorialUI[];
  vacunas: VacunaUI[];
  isLoading: boolean;
  isLoadingVacunas: boolean;
  error: string | null;
  tabActivo: TabActivo;
  setTabActivo: (tab: TabActivo) => void;
}

export function useClienteMascotaDetalleViewModel(
  mascotaId: string
): ClienteMascotaDetalleViewModelState {
  const [mascota, setMascota]               = useState<MascotaDetalleUI | null>(null);
  const [historial, setHistorial]           = useState<HistorialUI[]>([]);
  const [vacunas, setVacunas]               = useState<VacunaUI[]>([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [isLoadingVacunas, setIsLoadingVacunas] = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [tabActivo, setTabActivo]           = useState<TabActivo>("historial");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [mascotaUI, historialUI] = await Promise.all([
          getMascotaDetalleUseCase(mascotaId),
          getHistorialUseCase(mascotaId),
        ]);
        setMascota(mascotaUI);
        setHistorial(historialUI);
      } catch {
        setError("No se pudo cargar la información de la mascota.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [mascotaId]);

  useEffect(() => {
    if (tabActivo !== "vacunas" || vacunas.length > 0) return;
    const loadVacunas = async () => {
      setIsLoadingVacunas(true);
      try {
        setVacunas(await getVacunasUseCase(mascotaId));
      } catch {
        setError("No se pudo cargar la cartilla de vacunación.");
      } finally {
        setIsLoadingVacunas(false);
      }
    };
    loadVacunas();
  }, [tabActivo, mascotaId, vacunas.length]);

  return { mascota, historial, vacunas, isLoading, isLoadingVacunas, error, tabActivo, setTabActivo };
}