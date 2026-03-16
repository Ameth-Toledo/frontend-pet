"use client";

import { useState } from "react";
import { useAuthViewModel } from "../viewmodel/useAuthViewModel";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function RegisterForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    setFileName('');
    setImageFile(null);
  };

  const { register, isLoading, error } = useAuthViewModel();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    passwordConfirm: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (formData.password !== formData.passwordConfirm) {
      setValidationError("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 8) {
      setValidationError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (!/^\d{10}$/.test(formData.telefono)) {
      setValidationError("El teléfono debe tener 10 dígitos");
      return;
    }

    await register({
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password,
      imagenPerfil: imageFile ?? undefined,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-[#2F8F83] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <FontAwesomeIcon icon={faPaw} />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">PetCare</h1>
          </div>
          <p className="text-sm text-gray-600">Gestión Veterinaria de Prestigio</p>
        </div>

        {/* Volver */}
        <div className="flex justify-start mb-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F8F83] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Únete a PetCare</h2>
            <p className="text-sm text-gray-600">Crea tu cuenta para comenzar</p>
          </div>

          {(error || validationError) && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error || validationError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                    placeholder="Juan" disabled={isLoading} required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text" name="apellido" value={formData.apellido} onChange={handleChange}
                    placeholder="Pérez" disabled={isLoading} required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="ejemplo@correo.com" disabled={isLoading} required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
                  placeholder="1234567890" disabled={isLoading} required maxLength={10}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ingresa 10 dígitos sin espacios</p>
            </div>

            {/* Imagen de perfil */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Imagen de perfil <span className="font-normal opacity-50">(Opcional)</span>
              </label>
              <div
                className="flex items-center gap-3 px-3 py-2.5 border border-dashed border-gray-200 rounded-xl cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => document.getElementById("file-input")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file?.type.startsWith("image/")) {
                    const input = document.getElementById("file-input") as HTMLInputElement;
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    input.files = dt.files;
                    handleImageChange({ target: input } as any);
                  }
                }}
              >
                <div className="relative flex-shrink-0">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-11 h-11 rounded-full object-cover border-2 border-[#2F8F83]" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2F8F83] flex items-center justify-center border-2 border-white">
                    <svg width="7" height="7" viewBox="0 0 12 12" fill="white">
                      <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {preview ? (
                    <p className="text-xs text-gray-500 truncate">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-700">Subir foto de perfil</p>
                      <p className="text-xs text-gray-400">PNG, JPG · Máx. 5 MB</p>
                    </>
                  )}
                </div>
                {preview && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); clearImage(); }}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 rounded transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <input id="file-input" type="file" accept="image/*" className="hidden"
                  disabled={isLoading} onChange={handleImageChange} />
              </div>
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••" disabled={isLoading} required minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange}
                    placeholder="••••••••" disabled={isLoading} required minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50" />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} fullWidth className="bg-[#2F8F83] hover:bg-[#287A70] h-12">
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[#2F8F83] hover:underline font-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PetCare Inc. • Términos y Privacidad
        </div>
      </div>
    </div>
  );
}