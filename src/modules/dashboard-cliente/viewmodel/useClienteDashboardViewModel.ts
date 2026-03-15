"use client";

import { useEffect, useState } from "react";
import { getClienteDashboardUseCase } from "../usecases/GetClienteDashboardUseCase";
import { ClienteDashboardUI } from "../model/ui.model";

interface ClienteDashboardViewModelState {
  data: ClienteDashboardUI | null;
  loading: boolean;
  error: string | null;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  handleAgregarMascota: (nombre: string, especie: string, raza: string) => void;
}

export function useClienteDashboardViewModel(): ClienteDashboardViewModelState {
  const [data, setData]           = useState<ClienteDashboardUI | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        setData(await getClienteDashboardUseCase());
      } catch {
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleAgregarMascota = (nombre: string, especie: string, raza: string) => {
    console.log("[ViewModel] Agregar mascota:", { nombre, especie, raza });
    setShowModal(false);
  };

  return { data, loading, error, showModal, setShowModal, handleAgregarMascota };
}