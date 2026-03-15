"use client";

import { useEffect, useState } from "react";
import { getMascotasUseCase } from "../usecases/GetMascotasUseCase";
import { MascotaUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface MascotasViewModelState {
  mascotas: MascotaUI[];
  filtradas: MascotaUI[];
  busqueda: string;
  setBusqueda: (value: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function useMascotasViewModel(): MascotasViewModelState {
  const [mascotas, setMascotas] = useState<MascotaUI[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [userName, setUserName] = useState("Veterinario");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user: UserUIModel = JSON.parse(raw);
        setUserName(`Dr. ${user.fullName}`);
      }
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        setMascotas(await getMascotasUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar los pacientes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtradas = mascotas.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.propietario.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.especie.toLowerCase().includes(busqueda.toLowerCase())
  );

  return { mascotas, filtradas, busqueda, setBusqueda, loading, error, userName };
}