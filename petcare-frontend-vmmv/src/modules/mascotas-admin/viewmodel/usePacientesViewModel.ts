"use client";

import { useEffect, useState } from "react";
import { pacientesService } from "../services/pacientes.service";
import { mapPacienteDTOtoUI } from "../model/mapper";
import { PacienteUI } from "../model/ui.model";

interface PacientesViewModelState {
  pacientes: PacienteUI[];
  filteredPacientes: PacienteUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

export function usePacientesViewModel(): PacientesViewModelState {
  const [pacientes, setPacientes] = useState<PacienteUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await pacientesService.getPacientes();
      setPacientes(dtos.map(mapPacienteDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPacientes = pacientes.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.raza.toLowerCase().includes(term) ||
      p.propietario.toLowerCase().includes(term)
    );
  });

  return { pacientes, filteredPacientes, searchTerm, setSearchTerm, loading };
}