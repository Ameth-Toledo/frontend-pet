"use client";

import { useEffect, useState } from "react";
import { citasVetService } from "../services/citas.service";
import { mapCitaVetDTOtoUI } from "../model/mapper";
import { CitaVetUI } from "../model/ui.model";

interface CitasVetViewModelState {
  citas: CitaVetUI[];
  filteredCitas: CitaVetUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  userName: string;
}

export function useCitasVetViewModel(): CitasVetViewModelState {
  const [citas, setCitas] = useState<CitaVetUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await citasVetService.getCitas();
      setCitas(dtos.map(mapCitaVetDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCitas = citas.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.paciente.toLowerCase().includes(term) ||
      c.propietario.toLowerCase().includes(term) ||
      c.servicio.toLowerCase().includes(term)
    );
  });

  const userName = "Dr. Smith";

  return { citas, filteredCitas, searchTerm, setSearchTerm, loading, userName };
}
