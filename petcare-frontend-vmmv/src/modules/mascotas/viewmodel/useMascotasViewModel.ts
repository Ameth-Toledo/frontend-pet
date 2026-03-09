"use client";

import { useEffect, useState } from "react";
import { mascotasService } from "../services/mascotas.service";
import { mapMascotaDTOtoUI } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

interface MascotasViewModelState {
  mascotas: MascotaUI[];
  filtradas: MascotaUI[];
  busqueda: string;
  setBusqueda: (value: string) => void;
  loading: boolean;
  userName: string;
}

export function useMascotasViewModel(): MascotasViewModelState {
  const [mascotas, setMascotas] = useState<MascotaUI[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mascotasService.getMascotas().then((dtos) => {
      setMascotas(dtos.map(mapMascotaDTOtoUI));
      setLoading(false);
    });
  }, []);

  const filtradas = mascotas.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const userName = "Dr. Smith";

  return { mascotas, filtradas, busqueda, setBusqueda, loading, userName };
}
