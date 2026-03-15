"use client";

import { useEffect, useState } from "react";
import { getMascotasClienteUseCase } from "../usecases/GetMascotasClienteUseCase";
import { MascotaUI } from "../model/ui.model";

interface ClienteMascotasViewModelState {
  mascotas: MascotaUI[];
  loading: boolean;
  error: string | null;
  selectedMascota: MascotaUI | null;
  mode: "view" | "edit" | null;
  setSelectedMascota: (mascota: MascotaUI | null) => void;
  setMode: (mode: "view" | "edit" | null) => void;
  handleAgregarMascota: () => void;
}

export function useClienteMascotasViewModel(): ClienteMascotasViewModelState {
  const [mascotas, setMascotas]           = useState<MascotaUI[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);
  const [mode, setMode]                   = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        setMascotas(await getMascotasClienteUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar las mascotas");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleAgregarMascota = () => {
    console.log("[ViewModel] Agregar nueva mascota");
  };

  return { mascotas, loading, error, selectedMascota, setSelectedMascota, mode, setMode, handleAgregarMascota };
}