"use client";

import { useEffect, useState } from "react";
import { getClientesUseCase } from "../usecases/GetClientesUseCase";
import { ClienteUI } from "../model/ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface ClientesViewModelState {
  clientes: ClienteUI[];
  filteredClientes: ClienteUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function useClientesViewModel(): ClientesViewModelState {
  const [clientes, setClientes]         = useState<ClienteUI[]>([]);
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
        setClientes(await getClientesUseCase());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar los clientes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredClientes = clientes.filter(({ nombre, email, telefono }) => {
    const term = searchTerm.toLowerCase();
    return (
      nombre.toLowerCase().includes(term)   ||
      email.toLowerCase().includes(term)    ||
      telefono.includes(term)
    );
  });

  return { clientes, filteredClientes, searchTerm, setSearchTerm, loading, error, userName };
}