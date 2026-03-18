import React from "react";
import { PacienteRowProps } from "../model/dto/props/PacienteRowProps";
import { PacienteUI } from "../model/ui.model";

function EspecieAvatar({ icon }: { icon: PacienteUI["especieIcon"] }) {
  const isDog = icon !== "cat";
  return (
    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {isDog ? (
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="38" rx="18" ry="14" /><circle cx="32" cy="20" r="10" />
          <ellipse cx="20" cy="14" rx="5" ry="8" /><ellipse cx="44" cy="14" rx="5" ry="8" />
          <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 25 q3 3 6 0" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="40" rx="16" ry="12" /><circle cx="32" cy="22" r="10" />
          <path d="M22 12 L18 4 L26 10" /><path d="M42 12 L46 4 L38 10" />
          <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 27 q3 2 6 0" />
        </svg>
      )}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: PacienteUI["estado"] }) {
  const isActive = estado === "Activo";
  return (
    <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", backgroundColor: isActive ? "#E6F4F1" : "#F3F4F6", color: isActive ? "#4F8A7C" : "#6B7280" }}>
      {estado}
    </span>
  );
}

function ActionButton({ title, onClick, children }: { title: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button title={title} onClick={onClick}
      style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4F8A7C" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E6F4F1"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
      {children}
    </button>
  );
}

export default function PacienteRow({ paciente, onVer }: PacienteRowProps) {
  return (
    <tr style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}>
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <EspecieAvatar icon={paciente.especieIcon} />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{paciente.nombre}</span>
        </div>
      </td>
      <td style={{ padding: "14px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F2937", marginBottom: "2px" }}>{paciente.especieLabel}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{paciente.raza}</p>
      </td>
      <td style={{ padding: "14px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{paciente.propietario}</p>
        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{paciente.emailPropietario}</p>
      </td>
      <td style={{ padding: "14px 20px" }}><EstadoBadge estado={paciente.estado} /></td>
      <td style={{ padding: "14px 20px" }}>
        <ActionButton title="Ver detalle" onClick={onVer}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
        </ActionButton>
      </td>
    </tr>
  );
}