"use client";

import React from "react";
import { usePersonalViewModel } from "@/modules/personal/viewmodel/usePersonalViewModel";
import PersonalHeader from "./PersonalHeader";
import PersonalTable from "./PersonalTable";
import PersonalFormModal from "./PersonalFormModal";

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ width: "36px", height: "36px", border: "4px solid #E5E7EB", borderTop: "4px solid #4F8A7C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PersonalPage() {
  const { filteredVeterinarios, searchTerm, setSearchTerm, loading, error, userName, isCreateOpen, openCreate, closeCreate } =
    usePersonalViewModel();

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ padding: "32px" }}>
      <p style={{ color: "#EF4444", fontSize: "14px" }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <PersonalHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} onNuevoClick={openCreate} userName={userName} />
      <PersonalTable veterinarios={filteredVeterinarios} />
      {isCreateOpen && <PersonalFormModal onClose={closeCreate} />}
    </div>
  );
}