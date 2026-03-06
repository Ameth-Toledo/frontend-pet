import React from "react";
import { ClienteUI } from "../model/ui.model";
import ClienteRow from "./ClienteRow";

interface ClientesTableProps {
  clientes: ClienteUI[];
  total?: number;
}

const COLUMNS = ["Cliente", "Teléfono / Correo", "Mascotas asociadas", "Estado", "Acciones"];

export default function ClientesTable({ clientes, total = 128 }: ClientesTableProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Head */}
          <thead>
            <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6B7280",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}
                >
                  No se encontraron clientes.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <ClienteRow key={cliente.id} cliente={cliente} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FAFAFA",
        }}
      >
        {/* Count */}
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Mostrando <span style={{ fontWeight: 600, color: "#1F2937" }}>{clientes.length}</span> de{" "}
          <span style={{ fontWeight: 600, color: "#1F2937" }}>{total}</span> clientes
        </p>

        {/* Page buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Prev */}
          <button
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {[1, 2, 3, "...", 12].map((page, i) => (
            <button
              key={i}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: page === 1 ? "none" : "1px solid #E5E7EB",
                backgroundColor: page === 1 ? "#4F8A7C" : "#FFFFFF",
                color: page === 1 ? "#FFFFFF" : "#6B7280",
                fontSize: "13px",
                fontWeight: page === 1 ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}