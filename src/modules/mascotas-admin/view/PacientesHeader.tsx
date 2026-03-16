"use client";
import React, { useState, useRef, useEffect } from "react";

export type FiltroEspecie = "todos" | "perro" | "gato";

const OPCIONES: { value: FiltroEspecie; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "perro", label: "Perro" },
  { value: "gato", label: "Gato" },
];

interface PacientesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filtroEspecie: FiltroEspecie;
  onFiltroChange: (value: FiltroEspecie) => void;
}

export default function PacientesHeader({ searchTerm, onSearchChange, filtroEspecie, onFiltroChange }: PacientesHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelActual = OPCIONES.find((o) => o.value === filtroEspecie)?.label ?? "Todos";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Left: title + subtitle */}
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937", marginBottom: "2px" }}>
          Mascotas
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Gestión integral de la base de datos de mascotas.
        </p>
      </div>

      {/* Right: search + filter */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            padding: "8px 14px",
            width: "220px",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#1F2937",
              backgroundColor: "transparent",
              width: "100%",
            }}
          />
        </div>

        {/* Filtrar dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: filtroEspecie !== "todos" ? "#E6F4F1" : "#FFFFFF",
              border: filtroEspecie !== "todos" ? "1px solid #4F8A7C" : "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: filtroEspecie !== "todos" ? "#4F8A7C" : "#1F2937",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            {labelActual}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: "2px" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                overflow: "hidden",
                zIndex: 100,
                minWidth: "140px",
              }}
            >
              {OPCIONES.map((op) => (
                <button
                  key={op.value}
                  onClick={() => { onFiltroChange(op.value); setOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "9px 16px",
                    fontSize: "13px",
                    fontWeight: filtroEspecie === op.value ? 600 : 400,
                    color: filtroEspecie === op.value ? "#4F8A7C" : "#1F2937",
                    backgroundColor: filtroEspecie === op.value ? "#F0FAF8" : "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (filtroEspecie !== op.value)
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      filtroEspecie === op.value ? "#F0FAF8" : "transparent";
                  }}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}