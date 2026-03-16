"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

export type FiltroEspecieMascota = "todos" | "perro" | "gato";

const opciones: { value: FiltroEspecieMascota; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "perro", label: "Perros" },
  { value: "gato", label: "Gatos" },
];

interface Props {
  busqueda: string;
  onBusqueda: (value: string) => void;
  filtroEspecie: FiltroEspecieMascota;
  onFiltroChange: (v: FiltroEspecieMascota) => void;
}

export default function MascotaForm({ busqueda, onBusqueda, filtroEspecie, onFiltroChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const active = filtroEspecie !== "todos";
  const label = opciones.find((o) => o.value === filtroEspecie)?.label ?? "Todos";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative" }}>
        <Search
          size={14}
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
        />
        <input
          placeholder="Buscar pacientes..."
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          style={{ height: "38px", paddingLeft: "34px", paddingRight: "14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none" }}
        />
      </div>

      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            height: "38px", padding: "0 14px", borderRadius: "8px",
            border: active ? "1px solid #4F8A7C" : "1px solid #E5E7EB",
            fontSize: "13px", display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: active ? "#E6F4F1" : "#FFFFFF",
            color: active ? "#2F6B62" : "#374151",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          {label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && (
          <div style={{ position: "absolute", top: "42px", right: 0, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 50, minWidth: "140px", overflow: "hidden" }}>
            {opciones.map((op) => (
              <button
                key={op.value}
                onClick={() => { onFiltroChange(op.value); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 16px", fontSize: "13px", border: "none",
                  backgroundColor: filtroEspecie === op.value ? "#E6F4F1" : "#FFFFFF",
                  color: filtroEspecie === op.value ? "#2F6B62" : "#374151",
                  fontWeight: filtroEspecie === op.value ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {op.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
