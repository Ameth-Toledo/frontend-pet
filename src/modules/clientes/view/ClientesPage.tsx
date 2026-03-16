"use client";

import React, { useState } from "react";
import { useClientesViewModel } from "@/modules/clientes/viewmodel/useClientesViewModel";
import ClientesHeader from "./ClientesHeader";
import ClientesTable from "./ClientesTable";
import ClienteFormModal from "./ClienteFormModal";
import { ClienteUI } from "../model/ui.model";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: C.textSub }}>{label}</label>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: `1px solid ${C.border}`,
          fontSize: "14px",
          color: C.textMain,
          backgroundColor: C.bg,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ClienteDetailModal({ cliente, onClose }: { cliente: ClienteUI; onClose: () => void }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.40)",
        backdropFilter: "blur(3px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: C.white,
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          padding: "32px 36px",
          width: "100%",
          maxWidth: "440px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.textMain, marginBottom: "24px" }}>
          Información del cliente
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
          <InfoField label="Nombre completo" value={cliente.nombre} />
          <InfoField label="Correo electrónico" value={cliente.email} />
          <InfoField label="Teléfono" value={cliente.telefono} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: C.green,
              color: C.white, border: "none", borderRadius: "10px",
              padding: "10px 24px", fontSize: "14px", fontWeight: 700,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.greenDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.green; }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientesPage() {
  const { filteredClientes, searchTerm, setSearchTerm, loading } = useClientesViewModel();
  const [selectedCliente, setSelectedCliente] = useState<ClienteUI | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", minHeight: "100vh", position: "relative" }}>
      <ClientesHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} onNuevoClick={() => setIsCreateOpen(true)} />
      <ClientesTable
        clientes={filteredClientes}
        onVerCliente={(c) => setSelectedCliente(c)}
      />

      {selectedCliente && (
        <ClienteDetailModal
          cliente={selectedCliente}
          onClose={() => setSelectedCliente(null)}
        />
      )}
      {isCreateOpen && <ClienteFormModal onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
}
