"use client";

import React from "react";
import { useCitasViewModel } from "@/modules/citas-admin/viewmodel/useCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitasTable from "./CitasTable";

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", backgroundColor: "#F8FAF9",
      }}
    >
      <div
        style={{
          width: "40px", height: "40px",
          border: "4px solid #E5E7EB", borderTop: "4px solid #6BAF9F",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
      <p style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937" }}>Juan Pérez</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CitasPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading } = useCitasViewModel();

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />
      <CitasHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CitasTable citas={filteredCitas} />
    </>
  );
}
