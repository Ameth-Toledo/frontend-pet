"use client";

import { useEffect, useState } from "react";
import { personalService } from "../services/personal.service";
import { mapVeterinarioDTOtoUI } from "../model/mapper";
import { VeterinarioUI } from "../model/ui.model";

interface PersonalViewModelState {
  veterinarios: VeterinarioUI[];
  filteredVeterinarios: VeterinarioUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  // modal
  isCreateOpen: boolean;
  openCreate: () => void;
  closeCreate: () => void;
}

export function usePersonalViewModel(): PersonalViewModelState {
  const [veterinarios, setVeterinarios] = useState<VeterinarioUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await personalService.getVeterinarios();
      setVeterinarios(dtos.map(mapVeterinarioDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredVeterinarios = veterinarios.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.nombre.toLowerCase().includes(term) ||
      v.especialidad.toLowerCase().includes(term) ||
      v.email.toLowerCase().includes(term)
    );
  });

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  return {
    veterinarios,
    filteredVeterinarios,
    searchTerm,
    setSearchTerm,
    loading,
    isCreateOpen,
    openCreate,
    closeCreate,
  };
}