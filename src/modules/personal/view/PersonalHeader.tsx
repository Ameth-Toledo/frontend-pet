"use client";
import React, { useState, useRef, useEffect } from "react";

export type FiltroRol = "todos" | "veterinarios" | "administradores";

const OPCIONES: { value: FiltroRol; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "veterinarios", label: "Veterinarios" },
  { value: "administradores", label: "Administradores" },
];

interface PersonalHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNuevoClick: () => void;
  filtroRol: FiltroRol;
  onFiltroChange: (value: FiltroRol) => void;
}

export default function PersonalHeader({ searchTerm, onSearchChange, onNuevoClick, filtroRol, onFiltroChange }: PersonalHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelActual = OPCIONES.find((o) => o.value === filtroRol)?.label ?? "Todos";

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>
            Personal
          </h1>
          <p style={{ fontSize: "13px", color: "#6B7280" }}>
            Administración y seguimiento del equipo médico veterinario.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB",
              borderRadius: "10px", padding: "8px 14px", width: "220px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar personal..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "13px", color: "#1F2937", backgroundColor: "transparent", width: "100%" }}
            />
          </div>

          <button
            onClick={onNuevoClick}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              backgroundColor: "#4F8A7C", border: "none", borderRadius: "10px",
              padding: "8px 18px", fontSize: "13px", fontWeight: 600,
              color: "#FFFFFF", cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Registrar nuevo personal
          </button>
        </div>
      </div>

      {/* Filtrar dropdown */}
      <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: filtroRol !== "todos" ? "#E6F4F1" : "#FFFFFF",
            border: filtroRol !== "todos" ? "1px solid #4F8A7C" : "1px solid #E5E7EB",
            borderRadius: "10px", padding: "7px 16px", fontSize: "13px",
            fontWeight: 500,
            color: filtroRol !== "todos" ? "#4F8A7C" : "#1F2937",
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
              left: 0,
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              overflow: "hidden",
              zIndex: 100,
              minWidth: "160px",
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
                  fontWeight: filtroRol === op.value ? 600 : 400,
                  color: filtroRol === op.value ? "#4F8A7C" : "#1F2937",
                  backgroundColor: filtroRol === op.value ? "#F0FAF8" : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (filtroRol !== op.value)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    filtroRol === op.value ? "#F0FAF8" : "transparent";
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