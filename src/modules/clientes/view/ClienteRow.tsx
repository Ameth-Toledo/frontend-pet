import React from "react";
import { ClienteRowProps } from "../model/dto/props/ClienteRowProps";
import { ClienteUI } from "../model/ui.model";

function StatusBadge({ estado }: { estado: ClienteUI["estado"] }) {
  const isActive = estado === "Activo";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, backgroundColor: isActive ? "#E6F4F1" : "#F3F4F6", color: isActive ? "#4F8A7C" : "#6B7280" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: isActive ? "#4F8A7C" : "#9CA3AF" }} />
      {estado}
    </span>
  );
}

export default function ClienteRow({ cliente, onVer }: ClienteRowProps) {
  return (
    <tr style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{cliente.nombre}</p>
        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Cliente #{cliente.id}</p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937", marginBottom: "2px" }}>{cliente.telefono}</p>
        <p style={{ fontSize: "12px", color: "#6B7280" }}>{cliente.email}</p>
      </td>
      <td style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: "14px", color: "#1F2937" }}>
          {cliente.mascotas.length > 0 ? cliente.mascotas.join(", ") : "Sin mascotas"}
        </p>
      </td>
      <td style={{ padding: "16px 20px" }}><StatusBadge estado={cliente.estado} /></td>
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