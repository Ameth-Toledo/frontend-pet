"use client";

import { useEffect, useState } from "react";
import { getPacientesUseCase } from "../usecases/GetPacientesUseCase";
import { PacienteUI, PropietarioUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface PacientesViewModelState {
  pacientes:          PacienteUI[];
  propietarios:       PropietarioUI[];
  filteredPacientes:  PacienteUI[];
  filteredPropietarios: PropietarioUI[];
  searchTerm:         string;
  setSearchTerm:      (term: string) => void;
  loading:            boolean;
  error:              string | null;
  userName:           string;
}

export function usePacientesViewModel(): PacientesViewModelState {
  const [pacientes,  setPacientes]  = useState<PacienteUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [userName,   setUserName]   = useState("Administrador");

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
    const load = async () => {
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
    load();
  }, []);

  const propietarios: PropietarioUI[] = Object.values(
    pacientes.reduce((acc, p) => {
      if (!acc[p.propietario]) {
        acc[p.propietario] = {
          propietario:      p.propietario,
          emailPropietario: p.emailPropietario,
          mascotas:         [],
        };
      }
      acc[p.propietario].mascotas.push(p);
      return acc;
    }, {} as Record<string, PropietarioUI>)
  );

  const filteredPacientes = pacientes.filter(({ nombre, raza, propietario }) => {
    const term = searchTerm.toLowerCase();
    return (
      nombre.toLowerCase().includes(term)      ||
      raza.toLowerCase().includes(term)        ||
      propietario.toLowerCase().includes(term)
    );
  });

  const filteredPropietarios = propietarios.filter(({ propietario, emailPropietario, mascotas }) => {
    const term = searchTerm.toLowerCase();
    return (
      propietario.toLowerCase().includes(term)      ||
      emailPropietario.toLowerCase().includes(term) ||
      mascotas.some(m => m.nombre.toLowerCase().includes(term))
    );
  });

  return { pacientes, propietarios, filteredPacientes, filteredPropietarios, searchTerm, setSearchTerm, loading, error, userName };
}