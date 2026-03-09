"use client";

import React from "react";
import { useClientesViewModel } from "@/modules/clientes/viewmodel/useClientesViewModel";
import ClientesHeader from "./ClientesHeader";
import ClientesTable from "./ClientesTable";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function ClientesPage() {
  const { filteredClientes, searchTerm, setSearchTerm, loading } = useClientesViewModel();

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", minHeight: "100vh", position: "relative" }}>
      {/* Admin name top-right */}
      <span
        style={{
          position: "absolute",
          top: "32px",
          right: "32px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#1F2937",
        }}
      >
        Dr. Smith
      </span>
      <ClientesHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ClientesTable clientes={filteredClientes} />
    </div>
  );
}
