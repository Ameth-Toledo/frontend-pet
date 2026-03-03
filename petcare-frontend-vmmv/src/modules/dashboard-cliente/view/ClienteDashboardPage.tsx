"use client";

import React, { useState } from "react";

const C = {
  green: "#5BAA9C",
  bg: "#F7F9F8",
  textMain: "#1F2937",
};

export function ClienteMascotasPage() {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("Perro");
  const [raza, setRaza] = useState("");

  const handleGuardar = () => {
    if (!nombre.trim()) return;

    console.log("Nueva mascota:", { nombre, especie, raza });

    setShowModal(false);
    setNombre("");
    setRaza("");
    setEspecie("Perro");
  };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <div className="p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold" style={{ color: C.textMain }}>
            Mis Mascotas
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-lg text-white font-semibold shadow-sm hover:opacity-90 transition"
            style={{ backgroundColor: C.green }}
          >
            + Agregar mascota
          </button>
        </div>

        {/* Aquí iría tu listado real */}
        <div className="text-gray-500 text-sm">
          Aquí se mostrará el listado de mascotas.
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-2xl shadow-xl p-8 relative">

            <h2 className="text-lg font-bold mb-6">
              Agregar mascota
            </h2>

            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BAA9C]"
                placeholder="Ej. Firulais"
              />
            </div>

            {/* Especie */}
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Especie
              </label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BAA9C]"
              >
                <option>Perro</option>
                <option>Gato</option>
              </select>
            </div>

            {/* Raza */}
            <div className="mb-6">
              <label className="block text-sm mb-2">
                Raza
              </label>
              <input
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BAA9C]"
                placeholder="Ej. Golden Retriever"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleGuardar}
                className="px-4 py-2 rounded-lg text-white text-sm"
                style={{ backgroundColor: C.green }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}