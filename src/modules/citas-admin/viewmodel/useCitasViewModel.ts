"use client";

import { useEffect, useState } from "react";
import { getCitasAdminUseCase } from "../usecases/GetCitasAdminUseCase";
import { CitaUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface CitasViewModelState {
  citas: CitaUI[];
  filteredCitas: CitaUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function useCitasViewModel(): CitasViewModelState {
  const [citas, setCitas]           = useState<CitaUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [userName, setUserName]     = useState("Administrador");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user: UserUIModel = JSON.parse(raw);
        setUserName(user.fullName);
      }
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        setCitas(await getCitasAdminUseCase());
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
      paciente.toLowerCase().includes(term)   ||
      propietario.toLowerCase().includes(term) ||
      servicio.toLowerCase().includes(term)
    );
  });

  return { citas, filteredCitas, searchTerm, setSearchTerm, loading, error, userName };
}