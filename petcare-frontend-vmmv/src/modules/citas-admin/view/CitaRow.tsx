import React from "react";
import { CitaUI } from "../model/ui.model";

interface CitaRowProps {
  cita: CitaUI;
}

function Avatar({ iniciales }: { iniciales: string }) {
  return (
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        backgroundColor: "#E6F4F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 700,
        color: "#4F8A7C",
        flexShrink: 0,
      }}
    >
      {iniciales}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: CitaUI["estado"] }) {
  const isConfirmada = estado === "Confirmada";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: isConfirmada ? "#E6F4F1" : "#FDECEC",
        color: isConfirmada ? "#4F8A7C" : "#B91C1C",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: isConfirmada ? "#4F8A7C" : "#B91C1C",
        }}
      />
      {estado}
    </span>
  );
}

export default function CitaRow({ cita }: CitaRowProps) {
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
      {/* Paciente */}
      <td style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar iniciales={cita.iniciales} />
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>
              {cita.paciente}
            </p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{cita.raza}</p>
          </div>
        </div>
      </td>

      {/* Propietario */}
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937" }}>{cita.propietario}</p>
      </td>

      {/* Servicio */}
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F2937", marginBottom: "2px" }}>
          {cita.servicio}
        </p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.servicioSubtitulo}</p>
      </td>

      {/* Fecha / Hora */}
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{cita.fecha}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cita.hora}</p>
      </td>

      {/* Estado */}
      <td style={{ padding: "16px 20px" }}>
        <EstadoBadge estado={cita.estado} />
      </td>

      {/* Acciones */}
      <td style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Ver */}
          <button
            title="Ver detalle"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6B7280",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* Editar */}
          <button
            title="Editar cita"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6B7280",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}