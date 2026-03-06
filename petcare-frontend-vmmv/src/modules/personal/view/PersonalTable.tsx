import React from "react";
import { VeterinarioUI } from "../model/ui.model";
import VeterinarioRow from "./PersonalRow";

interface VeterinariosTableProps {
  veterinarios: VeterinarioUI[];
  total?: number;
}

const COLUMNS = ["VETERINARIO", "CONTACTO", "CÉDULA / ID", "ESTADO", "ACCIONES"];

export default function VeterinariosTable({ veterinarios, total = 128 }: VeterinariosTableProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.06em",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {veterinarios.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ padding: "48px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}
                >
                  No se encontraron veterinarios.
                </td>
              </tr>
            ) : (
              veterinarios.map((v) => <VeterinarioRow key={v.id} veterinario={v} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <p style={{ fontSize: "13px", color: "#6B7280" }}>
          Mostrando{" "}
          <span style={{ fontWeight: 600, color: "#1F2937" }}>{veterinarios.length}</span> de{" "}
          <span style={{ fontWeight: 600, color: "#1F2937" }}>{total}</span> veterinarios
        </p>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#6B7280",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              style={{
                width: "30px", height: "30px", borderRadius: "8px",
                border: page === 1 ? "none" : "1px solid #E5E7EB",
                backgroundColor: page === 1 ? "#4F8A7C" : "#FFFFFF",
                color: page === 1 ? "#FFFFFF" : "#6B7280",
                fontSize: "13px", fontWeight: page === 1 ? 600 : 400,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {page}
            </button>
          ))}

          <button
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#6B7280",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}