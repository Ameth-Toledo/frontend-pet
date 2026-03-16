import React from "react";
import { PersonalRowProps } from "../model/dto/props/PersonalRowProps";
import { VeterinarioUI } from "../model/ui.model";

function EstadoBadge({ estado }: { estado: VeterinarioUI["estado"] }) {
  const isActive = estado === "Activo";
  return (
    <span style={{ display: "inline-block", padding: "3px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", backgroundColor: isActive ? "#E6F4F1" : "#F3F4F6", color: isActive ? "#4F8A7C" : "#6B7280" }}>
      {estado}
    </span>
  );
}

function IconButton({ title, onClick, children }: { title: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button title={title} onClick={onClick}
      style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4F8A7C" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E6F4F1"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
      {children}
    </button>
  );
}

export default function PersonalRow({ veterinario, onEditar }: PersonalRowProps) {
  return (
    <tr style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{veterinario.nombre}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{veterinario.especialidad}</p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{veterinario.telefono}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{veterinario.email}</p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", fontWeight: 500 }}>{veterinario.cedula}</p>
      </td>
      <td style={{ padding: "16px 20px" }}><EstadoBadge estado={veterinario.estado} /></td>
      <td style={{ padding: "16px 20px" }}>
        <IconButton title="Editar veterinario" onClick={onEditar}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </IconButton>
      </td>
    </tr>
  );
}