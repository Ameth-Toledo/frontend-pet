import React from "react";
import { Eye, Pencil } from "lucide-react";
import { CitaVetUI } from "../model/ui.model";

interface CitasVetRowProps {
  cita: CitaVetUI;
}

function PetIcon({ species }: { species: CitaVetUI["species"] }) {
  const isDog = species !== "cat";
  return isDog ? (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="38" rx="18" ry="14" />
      <circle cx="32" cy="20" r="10" />
      <ellipse cx="20" cy="14" rx="5" ry="8" />
      <ellipse cx="44" cy="14" rx="5" ry="8" />
      <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 25 q3 3 6 0" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" />
      <circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" />
      <path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  );
}

export default function CitasVetRow({ cita }: CitasVetRowProps) {
  return (
    <tr
      style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}
    >
      {/* Paciente */}
      <td style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            backgroundColor: "#E6F4F1",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <PetIcon species={cita.species} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{cita.paciente}</p>
            <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.raza}</p>
          </div>
        </div>
      </td>

      {/* Propietario */}
      <td style={{ padding: "16px 20px" }}>
        <span style={{ fontSize: "14px", color: "#6B7280" }}>{cita.propietario}</span>
      </td>

      {/* Servicio */}
      <td style={{ padding: "16px 20px" }}>
        <span style={{ fontSize: "14px", color: "#6B7280", fontWeight: 700 }}>{cita.servicio}</span>
      </td>

      {/* Fecha */}
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{cita.fecha}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.hora}</p>
      </td>

      {/* Acción */}
      <td style={{ padding: "16px 20px", textAlign: "right" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", color: "#9CA3AF" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Eye size={15} /></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Pencil size={15} /></button>
        </div>
      </td>
    </tr>
  );
}
