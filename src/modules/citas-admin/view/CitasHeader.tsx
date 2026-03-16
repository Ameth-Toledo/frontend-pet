"use client";
import React, { useState, useRef, useEffect } from "react";

export type FiltroServicio = "todos" | "chequeo" | "corte";

const OPCIONES: { value: FiltroServicio; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "chequeo", label: "Chequeo médico" },
  { value: "corte", label: "Corte de pelo y baño" },
];

interface CitasHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filtroServicio: FiltroServicio;
  onFiltroChange: (value: FiltroServicio) => void;
}

export default function CitasHeader({ searchTerm, onSearchChange, filtroServicio, onFiltroChange }: CitasHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelActual = OPCIONES.find((o) => o.value === filtroServicio)?.label ?? "Todos";

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
      {/* Left */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>
          Citas
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Consulta y gestiona todas las citas programadas de tus pacientes.
        </p>
      </div>

      {/* Right */}
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
            padding: "9px 14px",
            width: "240px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar citas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
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
              backgroundColor: filtroServicio !== "todos" ? "#E6F4F1" : "#FFFFFF",
              border: filtroServicio !== "todos" ? "1px solid #4F8A7C" : "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "9px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: filtroServicio !== "todos" ? "#4F8A7C" : "#1F2937",
              cursor: "pointer",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                minWidth: "180px",
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
                    fontSize: "14px",
                    fontWeight: filtroServicio === op.value ? 600 : 400,
                    color: filtroServicio === op.value ? "#4F8A7C" : "#1F2937",
                    backgroundColor: filtroServicio === op.value ? "#F0FAF8" : "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (filtroServicio !== op.value)
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      filtroServicio === op.value ? "#F0FAF8" : "transparent";
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