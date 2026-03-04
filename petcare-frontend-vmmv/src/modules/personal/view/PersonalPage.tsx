"use client";

import React from "react";
import { usePersonalViewModel } from "@/modules/personal/viewmodel/usePersonalViewModel";
import PersonalHeader from "./PersonalHeader";
import PersonalTable from "./PersonalTable";
import PersonalFormModal from "./PersonalFormModal";

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F8FAF9" }}>
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
export default function PersonalPage() {
  const { filteredVeterinarios, searchTerm, setSearchTerm, loading, isCreateOpen, openCreate, closeCreate } =
    usePersonalViewModel();

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />
      <PersonalHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNuevoClick={openCreate}
      />
      <PersonalTable veterinarios={filteredVeterinarios} />
      {isCreateOpen && <PersonalFormModal onClose={closeCreate} />}
    </>
  );
}
