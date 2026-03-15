"use client";

import { useEffect, useState } from "react";
import { getPacientesUseCase } from "../usecases/GetPacientesUseCase";
import { PacienteUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface PacientesViewModelState {
  pacientes: PacienteUI[];
  filteredPacientes: PacienteUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function usePacientesViewModel(): PacientesViewModelState {
  const [pacientes, setPacientes]       = useState<PacienteUI[]>([]);
  const [searchTerm, setSearchTerm]     = useState("");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [userName, setUserName]         = useState("Administrador");

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
        setPacientes(await getPacientesUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar los pacientes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredPacientes = pacientes.filter(({ nombre, raza, propietario }) => {
    const term = searchTerm.toLowerCase();
    return (
      nombre.toLowerCase().includes(term)      ||
      raza.toLowerCase().includes(term)        ||
      propietario.toLowerCase().includes(term)
    );
  });

  return { pacientes, filteredPacientes, searchTerm, setSearchTerm, loading, error, userName };
}