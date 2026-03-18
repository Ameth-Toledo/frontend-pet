import React from "react";
import { CitaRowProps } from "../model/dto/props/CitaRowProps";
import { CitaUI } from "../model/ui.model";

function PetIcon({ species }: { species: CitaUI["species"] }) {
  const isDog = species !== "cat";
  return (
    <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {isDog ? (
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="38" rx="18" ry="14" /><circle cx="32" cy="20" r="10" />
          <ellipse cx="20" cy="14" rx="5" ry="8" /><ellipse cx="44" cy="14" rx="5" ry="8" />
          <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 25 q3 3 6 0" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="40" rx="16" ry="12" /><circle cx="32" cy="22" r="10" />
          <path d="M22 12 L18 4 L26 10" /><path d="M42 12 L46 4 L38 10" />
          <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" /><circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
          <path d="M29 27 q3 2 6 0" />
        </svg>
      )}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: CitaUI["estado"] }) {
  const isConfirmada = estado === "Confirmada";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, backgroundColor: isConfirmada ? "#E6F4F1" : "#FDECEC", color: isConfirmada ? "#4F8A7C" : "#B91C1C" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: isConfirmada ? "#4F8A7C" : "#B91C1C" }} />
      {estado}
    </span>
  );
}

export default function CitaRow({ cita, onVer }: CitaRowProps) {
  return (
    <tr style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}>
      <td style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <PetIcon species={cita.species} />
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{cita.paciente}</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{cita.raza}</p>
          </div>
        </div>
      </td>
      <td style={{ padding: "16px 20px" }}><p style={{ fontSize: "14px", color: "#1F2937" }}>{cita.propietario}</p></td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937" }}>
          {cita.veterinario ?? 'Sin asignar'}
        </p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F2937", marginBottom: "2px" }}>{cita.servicio}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.servicioSubtitulo}</p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{cita.fecha}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.hora}</p>
      </td>
      <td style={{ padding: "16px 20px" }}><EstadoBadge estado={cita.estado} /></td>
      <td style={{ padding: "16px 20px" }}>
        <button title="Ver detalle" onClick={onVer}
          style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "#E6F4F1"; b.style.color = "#4F8A7C"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "#FFFFFF"; b.style.color = "#6B7280"; }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      </td>
    </tr>
  );
}