"use client";

import { useEffect, useState } from "react";
import { getCitasVetUseCase } from "../usecases/GetCitasVetUseCase";
import { CitaVetUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface CitasVetViewModelState {
  citas: CitaVetUI[];
  filteredCitas: CitaVetUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function useCitasVetViewModel(): CitasVetViewModelState {
  const [citas, setCitas]         = useState<CitaVetUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [userName, setUserName]   = useState("Veterinario");

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
        setCitas(await getCitasVetUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar las citas");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredCitas = citas.filter(({ paciente, propietario, servicio }) => {
    const term = searchTerm.toLowerCase();
    return (
      paciente.toLowerCase().includes(term) ||
      propietario.toLowerCase().includes(term) ||
      servicio.toLowerCase().includes(term)
    );
  });

  return { citas, filteredCitas, searchTerm, setSearchTerm, loading, error, userName };
}