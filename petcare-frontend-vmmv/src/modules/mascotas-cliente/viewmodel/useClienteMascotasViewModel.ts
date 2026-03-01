"use client";

import { useEffect, useState } from "react";
import { clienteMascotasService } from "../services/clienteMascotas.service";
import { mapMascotaDTOtoUI } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

interface ClienteMascotasViewModelState {
  mascotas: MascotaUI[];
  loading: boolean;
  handleVerMascota: (id: string) => void;
  handleEditarMascota: (id: string) => void;
  handleAgregarMascota: () => void;
}

export function useClienteMascotasViewModel(): ClienteMascotasViewModelState {
  const [mascotas, setMascotas] = useState<MascotaUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await clienteMascotasService.getMascotas();
      setMascotas(dtos.map(mapMascotaDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleVerMascota = (id: string) => {
    console.log("[ViewModel] Ver mascota:", id);
  };

  const handleEditarMascota = (id: string) => {
    console.log("[ViewModel] Editar mascota:", id);
  };

  const handleAgregarMascota = () => {
    console.log("[ViewModel] Agregar nueva mascota");
  };

  return { mascotas, loading, handleVerMascota, handleEditarMascota, handleAgregarMascota };
}