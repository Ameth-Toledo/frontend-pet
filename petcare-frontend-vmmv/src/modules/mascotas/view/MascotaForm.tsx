"use client";

import React from "react";
import { Search, Filter, Plus } from "lucide-react";

interface Props {
  busqueda: string;
  onBusqueda: (value: string) => void;
  userName: string;
}

export default function MascotaForm({ busqueda, onBusqueda, userName }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative" }}>
        <Search
          size={14}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9CA3AF",
          }}
        />
        <input
          placeholder="Buscar pacientes..."
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          style={{
            height: "38px",
            paddingLeft: "34px",
            paddingRight: "14px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            fontSize: "13px",
            outline: "none",
          }}
        />
      </div>
      <button
        style={{
          height: "38px",
          padding: "0 14px",
          borderRadius: "8px",
          border: "1px solid #E5E7EB",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#FFFFFF",
          cursor: "pointer",
        }}
      >
        <Filter size={14} /> Filtrar
      </button>
      <button
        style={{
          height: "38px",
          padding: "0 16px",
          borderRadius: "8px",
          backgroundColor: "#4F8A7C",
          color: "#FFFFFF",
          border: "none",
          fontSize: "13px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
      >
        <Plus size={14} /> Nuevo paciente
      </button>

      {/* Separator + User name */}
      <div style={{ width: "1px", height: "24px", backgroundColor: "#E5E7EB" }} />
      <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", whiteSpace: "nowrap" }}>
        {userName}
      </span>
    </div>
  );
}
