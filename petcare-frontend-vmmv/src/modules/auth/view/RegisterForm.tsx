"use client";

import { useState, useEffect } from "react";
import { useRegisterViewModel } from "../viewmodel/RegisterViewModel";

interface RegisterFormProps {
  prefilledData?: {
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
  } | null;
  fromAppointment?: boolean;
}

export default function RegisterForm({ prefilledData, fromAppointment = false }: RegisterFormProps) {
  const viewModel = useRegisterViewModel(fromAppointment);
  
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  // 🔥 IMPORTANTE: Actualizar formData cuando prefilledData cambie
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        email: prefilledData.email || "",
        nombre: prefilledData.nombre || "",
        apellido: prefilledData.apellido || "",
        telefono: prefilledData.telefono || "",
      }));
    }
  }, [prefilledData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    viewModel.setError("");

    if (formData.password !== formData.confirmPassword) {
      viewModel.setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      viewModel.setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    await viewModel.register({
      email: formData.email,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {viewModel.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {viewModel.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!!prefilledData?.email}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={!!prefilledData?.nombre}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido *
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={!!prefilledData?.apellido}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          disabled={!!prefilledData?.telefono}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña *
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={viewModel.isLoading}
        className={`w-full py-3 rounded-xl font-medium transition-all
          ${
            viewModel.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2F8F83] hover:bg-[#267A6F] text-white"
          }`}
      >
        {viewModel.isLoading ? "Creando cuenta..." : fromAppointment ? "Crear cuenta y confirmar cita" : "Crear cuenta"}
      </button>
    </form>
  );
}