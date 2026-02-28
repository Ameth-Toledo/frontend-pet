"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ServiceType = "chequeo" | "grooming" | null;

interface AgendarCitaContextType {
  service: ServiceType;
  setService: (s: ServiceType) => void;

  motivo: string;
  setMotivo: (m: string) => void;

  groomingOption: string;
  setGroomingOption: (g: string) => void;

  email: string;
  setEmail: (e: string) => void;

  nombre: string;
  setNombre: (n: string) => void;

  apellido: string;
  setApellido: (a: string) => void;

  telefono: string;
  setTelefono: (t: string) => void;

  resetFlow: () => void;
}

const AgendarCitaContext = createContext<AgendarCitaContextType | null>(null);

export const useAgendarCita = () => {
  const context = useContext(AgendarCitaContext);
  if (!context) {
    throw new Error("useAgendarCita debe usarse dentro de AgendarCitaProvider");
  }
  return context;
};

export function AgendarCitaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [service, setService] = useState<ServiceType>(null);
  const [motivo, setMotivo] = useState("");
  const [groomingOption, setGroomingOption] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  // 🔹 Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("agendarCitaFlow");
    if (saved) {
      const data = JSON.parse(saved);
      setService(data.service || null);
      setMotivo(data.motivo || "");
      setGroomingOption(data.groomingOption || "");
      setEmail(data.email || "");
      setNombre(data.nombre || "");
      setApellido(data.apellido || "");
      setTelefono(data.telefono || "");
    }
  }, []);

  // 🔹 Guardar automáticamente
  useEffect(() => {
    localStorage.setItem(
      "agendarCitaFlow",
      JSON.stringify({
        service,
        motivo,
        groomingOption,
        email,
        nombre,
        apellido,
        telefono,
      })
    );
  }, [service, motivo, groomingOption, email, nombre, apellido, telefono]);

  const resetFlow = () => {
    localStorage.removeItem("agendarCitaFlow");
    setService(null);
    setMotivo("");
    setGroomingOption("");
    setEmail("");
    setNombre("");
    setApellido("");
    setTelefono("");
  };

  return (
    <AgendarCitaContext.Provider
      value={{
        service,
        setService,
        motivo,
        setMotivo,
        groomingOption,
        setGroomingOption,
        email,
        setEmail,
        nombre,
        setNombre,
        apellido,
        setApellido,
        telefono,
        setTelefono,
        resetFlow,
      }}
    >
      {children}
    </AgendarCitaContext.Provider>
  );
}