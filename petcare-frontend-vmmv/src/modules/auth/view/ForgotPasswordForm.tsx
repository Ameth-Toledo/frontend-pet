'use client';

import { useState } from 'react';
import { useAuthViewModel } from '../viewmodel/useAuthViewModel';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons'

export default function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error } = useAuthViewModel();

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await forgotPassword({ email });

    if (result.success) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4 py-8">
        <div className="w-full max-w-md">

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
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          {/* Boton de accesibilidad */}
          <div className="flex justify-start mb-4">
          </div>
            {/* Título */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Revisa tu correo
              </h2>
              <p className="text-sm text-gray-600">
                Te hemos enviado un enlace para restablecer tu contraseña a:
              </p>
              <p className="text-sm font-semibold text-[#2F8F83] mt-2">
                {email}
              </p>
            </div>

            {/* Instrucciones */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                El enlace expirará en <strong>24 horas</strong>.
                Si no ves el correo, revisa tu carpeta de spam.
              </p>
            </div>

            {/* Botón volver */}
            <Link
              href="/login"
              className="w-full h-12 px-6 rounded-lg bg-[#2F8F83] text-white font-medium hover:bg-[#287A70] transition-all flex items-center justify-center"
            >
              Volver al inicio de sesión
            </Link>

            {/* Reenviar */}
            <div className="text-center">
              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-[#2F8F83] hover:underline"
              >
                ¿No recibiste el correo? Reenviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4 py-8">
      <div className="w-full max-w-md">

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

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

          {/* Título */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-sm text-gray-600">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  disabled={isLoading}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F8F83] focus:border-transparent transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Botón Enviar */}
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              className="bg-[#2F8F83] hover:bg-[#287A70] h-12"
            >
              {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
            </Button>
          </form>

          {/* Link volver a login */}
          <div className="text-center">
            <Link href="/login" className="text-sm text-gray-600 hover:text-[#2F8F83] transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio de sesión
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PetCare Inc. • Términos y Privacidad
        </div>
      </div>
    </div>
  );
}
