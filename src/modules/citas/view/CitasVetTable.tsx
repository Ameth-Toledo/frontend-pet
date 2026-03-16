import React from "react";
import { CitasVetTableProps } from "../model/dto/props/CitasVetTableProps";
import CitasVetRow from "./CitasVetRow";

const COLUMNS = ["PACIENTE", "PROPIETARIO", "SERVICIO", "FECHA", "ACCIÓN"];

export default function CitasVetTable({ citas, onVerCita, onEditarCita }: CitasVetTableProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              {COLUMNS.map((col, i) => (
                <th key={col} style={{ padding: "12px 20px", textAlign: i === COLUMNS.length - 1 ? "right" : "left", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.06em" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>
                  No se encontraron citas.
                </td>
              </tr>
            ) : (
              citas.map((c) => (
                <CitasVetRow key={c.id} cita={c} onVer={() => onVerCita(c)} onEditar={() => onEditarCita(c)} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}