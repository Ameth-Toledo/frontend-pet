import React, { useState } from "react";
import { PropietarioUI, PacienteUI } from "../model/ui.model";
import PacienteRow from "./PacienteRow";

interface PacientesTableProps {
  propietarios:  PropietarioUI[];
  onVerPaciente: (p: PacienteUI) => void;
}

const COLUMNS = ["PROPIETARIO", "MASCOTAS", "ESTADO", "ACCIONES"];

export default function PacientesTable({ propietarios, onVerPaciente }: PacientesTableProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const total = propietarios.reduce((acc, p) => acc + p.mascotas.length, 0);

  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              {COLUMNS.map((col) => (
                <th key={col} style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.06em" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propietarios.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>No se encontraron pacientes.</td></tr>
            ) : propietarios.map((p) => (
              <React.Fragment key={p.propietario}>
                {/* Fila del propietario */}
                <tr style={{ borderBottom: "1px solid #F3F4F6", backgroundColor: "#FAFAFA", cursor: "pointer" }}
                  onClick={() => toggle(p.propietario)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F0F9F7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FAFAFA"; }}>
                  <td style={{ padding: "14px 20px" }} colSpan={2}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#4F8A7C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                          {p.propietario.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase()).join('')}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", marginBottom: "2px" }}>{p.propietario}</p>
                        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{p.emailPropietario}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ fontSize: "13px", color: "#6B7280" }}>
                      {p.mascotas.length} {p.mascotas.length === 1 ? 'mascota' : 'mascotas'}: {p.mascotas.map(m => m.nombre).join(', ')}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
                      style={{ transform: expanded[p.propietario] ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </td>
                </tr>
                {/* Filas de mascotas expandidas */}
                {expanded[p.propietario] && p.mascotas.map((m) => (
                  <tr key={m.id} style={{ borderBottom: "1px solid #F3F4F6", backgroundColor: "#FFFFFF" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F9FAFB"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FFFFFF"; }}>
                    <td style={{ padding: "12px 20px 12px 52px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#1F2937" }}>{m.nombre}</span>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <p style={{ fontSize: "13px", color: "#1F2937" }}>{m.especieLabel}</p>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const, backgroundColor: m.estado === "Activo" ? "#E6F4F1" : "#F3F4F6", color: m.estado === "Activo" ? "#4F8A7C" : "#6B7280" }}>
                        {m.estado}
                      </span>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <button onClick={() => onVerPaciente(m)}
                        style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4F8A7C" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E6F4F1"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderTop: "1px solid #E5E7EB" }}>
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          <span style={{ fontWeight: 600, color: "#1F2937" }}>{propietarios.length}</span> propietarios · <span style={{ fontWeight: 600, color: "#1F2937" }}>{total}</span> mascotas
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button key={page} style={{ width: "30px", height: "30px", borderRadius: "8px", border: page === 1 ? "none" : "1px solid #E5E7EB", backgroundColor: page === 1 ? "#4F8A7C" : "#FFFFFF", color: page === 1 ? "#FFFFFF" : "#6B7280", fontSize: "13px", fontWeight: page === 1 ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {page}
            </button>
          ))}
          <button style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}