"use client";

import { useEffect, useState } from "react";
import { getPersonalUseCase } from "../usecases/GetPersonalUseCase";
import { VeterinarioUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface PersonalViewModelState {
  veterinarios: VeterinarioUI[];
  filteredVeterinarios: VeterinarioUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
  isCreateOpen: boolean;
  openCreate: () => void;
  closeCreate: () => void;
}

export function usePersonalViewModel(): PersonalViewModelState {
  const [veterinarios, setVeterinarios]   = useState<VeterinarioUI[]>([]);
  const [searchTerm, setSearchTerm]       = useState("");
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [userName, setUserName]           = useState("Administrador");
  const [isCreateOpen, setIsCreateOpen]   = useState(false);

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
        setVeterinarios(await getPersonalUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar el personal");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredVeterinarios = veterinarios.filter(({ nombre, especialidad, email }) => {
    const term = searchTerm.toLowerCase();
    return (
      nombre.toLowerCase().includes(term)      ||
      especialidad.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term)
    );
  });

  return {
    veterinarios,
    filteredVeterinarios,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    userName,
    isCreateOpen,
    openCreate:  () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
  };
}