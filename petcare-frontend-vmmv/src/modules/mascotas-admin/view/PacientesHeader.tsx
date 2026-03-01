import React from "react";

interface PacientesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function PacientesHeader({ searchTerm, onSearchChange }: PacientesHeaderProps) {
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

      {/* Right: search + actions */}
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

        {/* Filtrar */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#1F2937",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filtrar
        </button>

        {/* Nuevo Paciente */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#6BAF9F",
            border: "none",
            borderRadius: "10px",
            padding: "8px 18px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5AA193";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#6BAF9F";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Paciente
        </button>
      </div>
    </div>
  );
}