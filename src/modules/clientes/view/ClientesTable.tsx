import React from "react";
import { ClientesTableProps } from "../model/dto/props/ClientesTableProps";
import ClienteRow from "./ClienteRow";

const COLUMNS = ["Cliente", "Teléfono / Correo", "Mascotas asociadas", "Estado", "Acciones"];

export default function ClientesTable({ clientes, onVerCliente }: ClientesTableProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {COLUMNS.map((col) => (
                <th key={col} style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>
                  No se encontraron clientes.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <ClienteRow key={cliente.id} cliente={cliente} onVer={() => onVerCliente(cliente)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderTop: "1px solid #E5E7EB", backgroundColor: "#FAFAFA" }}>
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Mostrando <span style={{ fontWeight: 600, color: "#1F2937" }}>{clientes.length}</span> clientes
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {[1, 2, 3].map((page) => (
            <button key={page} style={{ width: "32px", height: "32px", borderRadius: "8px", border: page === 1 ? "none" : "1px solid #E5E7EB", backgroundColor: page === 1 ? "#4F8A7C" : "#FFFFFF", color: page === 1 ? "#FFFFFF" : "#6B7280", fontSize: "13px", fontWeight: page === 1 ? 600 : 400, cursor: "pointer" }}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}