"use client";

import { createContext, useContext, useState } from "react";

type ServiceType = "chequeo" | "grooming" | null;

interface AgendarCitaContextType {
  service: ServiceType;
  setService: (s: ServiceType) => void;

  motivo: string;
  setMotivo: (m: string) => void;

  descripcion: string;
  setDescripcion: (d: string) => void;

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
  const [descripcion, setDescripcion] = useState("");
  const [groomingOption, setGroomingOption] = useState("");

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  return (
    <AgendarCitaContext.Provider
      value={{
        service,
        setService,
        motivo,
        setMotivo,
        descripcion,
        setDescripcion,
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
      }}
    >
      {children}
    </AgendarCitaContext.Provider>
  );
}