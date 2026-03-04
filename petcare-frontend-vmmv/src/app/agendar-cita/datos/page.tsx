"use client";

import { useState, useEffect } from "react";
import { useAgendarCita } from "../context";
import { useDatosViewModel } from "@/modules/citas/viewmodel/DatosViewModel";

export default function DatosPage() {
  const { 
    selectedService,
    email: contextEmail,
    setEmail: setContextEmail,
    nombre: contextNombre,
    setNombre: setContextNombre,
    apellido: contextApellido,
    setApellido: setContextApellido,
    telefono: contextTelefono,
    setTelefono: setContextTelefono
  } = useAgendarCita();
  
  const viewModel = useDatosViewModel(selectedService);
  
  const [email, setEmail] = useState(contextEmail || "");
  const [nombre, setNombre] = useState(contextNombre || "");
  const [apellido, setApellido] = useState(contextApellido || "");
  const [telefono, setTelefono] = useState(contextTelefono || "");

  // Cargar datos pre-llenados del ViewModel
  useEffect(() => {
    if (viewModel.userData.email) {
      setEmail(viewModel.userData.email);
      setNombre(viewModel.userData.nombre);
      setApellido(viewModel.userData.apellido);
      setTelefono(viewModel.userData.telefono);
    }
  }, [viewModel.userData]);

  const handleContinue = () => {
    const formData = { email, nombre, apellido, telefono };
    
    const saveToContext = (data: typeof formData) => {
      setContextEmail(data.email);
      setContextNombre(data.nombre);
      setContextApellido(data.apellido);
      setContextTelefono(data.telefono);
    };

    viewModel.continuar(formData, saveToContext);
  };

  const isValid = viewModel.validateForm({ email, nombre, apellido, telefono });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Tus datos</h1>
      </div>

      {!viewModel.isLoggedIn && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            ℹ️ Al finalizar, podrás crear tu cuenta con estos datos para gestionar tus citas
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mail*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            disabled={viewModel.isLoggedIn}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre*
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              disabled={viewModel.isLoggedIn}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido*
            </label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              disabled={viewModel.isLoggedIn}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono*
          </label>
          <div className="flex gap-2">
            <select className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none">
              <option value="+52">+52</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="1234567890"
              maxLength={10}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          disabled={!isValid}
          onClick={handleContinue}
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-colors
            ${isValid ? "bg-[#2F8F83] text-white hover:bg-[#267A6F]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}