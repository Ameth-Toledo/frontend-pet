import React from "react";
import { PacienteUI } from "../model/ui.model";

interface PacienteRowProps {
  paciente: PacienteUI;
}

function EspecieAvatar({ icon }: { icon: PacienteUI["especieIcon"] }) {
  const svgs: Record<PacienteUI["especieIcon"], React.ReactNode> = {
    dog: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BAF9F" strokeWidth="1.8">
        <path d="M10 5.5C10 4.12 11.12 3 12.5 3S15 4.12 15 5.5V7h2l1 2-1 1v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5L6 9l1-2h3V5.5z" />
        <path d="M9 17v2M15 17v2" strokeLinecap="round" />
      </svg>
    ),
    cat: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BAF9F" strokeWidth="1.8">
        <path d="M4 6V3l3 3h10l3-3v3a7 7 0 0 1-7 7 7 7 0 0 1-7-7z" />
        <path d="M9 17v2M15 17v2M9 13c0 2 6 2 6 0" strokeLinecap="round" />
      </svg>
    ),
    bird: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BAF9F" strokeWidth="1.8">
        <path d="M20 4c-2 0-5 1-7 4H7a4 4 0 0 0 0 8h1l1 3h2l1-3h3a5 5 0 0 0 5-5V4z" />
      </svg>
    ),
    other: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BAF9F" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "#E6F4F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {svgs[icon]}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: PacienteUI["estado"] }) {
  const isActive = estado === "Activo";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        backgroundColor: isActive ? "#E6F4F1" : "#F3F4F6",
        color: isActive ? "#2F8F7A" : "#6B7280",
      }}
    >
      {estado}
    </span>
  );
}

function ActionButton({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <button
      title={title}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#6BAF9F",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E6F4F1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
    >
      {children}
    </button>
  );
}

export default function PacienteRow({ paciente }: PacienteRowProps) {
  return (
    <tr
      style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent";
      }}
    >
      {/* Mascota */}
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <EspecieAvatar icon={paciente.especieIcon} />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>
            {paciente.nombre}
          </span>
        </div>
      </td>

      {/* Especie / Raza */}
      <td style={{ padding: "14px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F2937", marginBottom: "2px" }}>
          {paciente.especieLabel}
        </p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{paciente.raza}</p>
      </td>

      {/* Propietario */}
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span style={{ fontSize: "14px", color: "#1F2937" }}>{paciente.propietario}</span>
        </div>
      </td>

      {/* Estado */}
      <td style={{ padding: "14px 20px" }}>
        <EstadoBadge estado={paciente.estado} />
      </td>

      {/* Acciones */}
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ActionButton title="Editar paciente">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </ActionButton>
          <ActionButton title="Ver detalle">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}