import React from "react";

interface ClientesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function ClientesHeader({ searchTerm, onSearchChange }: ClientesHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Left: title + subtitle */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>
          Clientes
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Gestiona y consulta la información de todos tus clientes registrados.
        </p>
      </div>

      {/* Right: search + buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Search input */}
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
            placeholder="Buscar clientes..."
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

        {/* Filter button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            padding: "9px 16px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#1F2937",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filtrar
        </button>

        {/* New client button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#4F8A7C",
            border: "none",
            borderRadius: "10px",
            padding: "9px 18px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3E6F63";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4F8A7C";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Cliente
        </button>
      </div>
    </div>
  );
}