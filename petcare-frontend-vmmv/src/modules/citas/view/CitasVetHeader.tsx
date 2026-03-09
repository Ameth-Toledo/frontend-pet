import React from "react";

interface CitasVetHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  userName: string;
}

export default function CitasVetHeader({ searchTerm, onSearchChange, userName }: CitasVetHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", margin: 0 }}>Mis citas</h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>
          Gestión y seguimiento de tu agenda veterinaria.
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
            placeholder="Buscar cita..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "13px", color: "#1F2937", backgroundColor: "transparent", width: "100%" }}
          />
        </div>

        {/* Filter button */}
        <button
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB",
            borderRadius: "10px", padding: "8px 16px", fontSize: "13px",
            fontWeight: 500, color: "#1F2937", cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filtrar
        </button>

        {/* Separator + User name */}
        <div style={{ width: "1px", height: "24px", backgroundColor: "#E5E7EB" }} />
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", whiteSpace: "nowrap" }}>
          {userName}
        </span>
      </div>
    </div>
  );
}
