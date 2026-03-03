"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "@/modules/auth/view/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromAppointment = searchParams.get('from') === 'appointment';
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (fromAppointment) {
      const savedData = localStorage.getItem('pendingAppointmentData');
      if (savedData) {
        const data = JSON.parse(savedData);
        setUserData(data.userData);
      }
    }
  }, [fromAppointment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {fromAppointment && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              📅 Completa tu registro para confirmar tu cita
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crear cuenta
            </h1>
            <p className="text-gray-600">
              {fromAppointment 
                ? "Solo falta tu contraseña para confirmar tu cita" 
                : "Completa tus datos para comenzar"}
            </p>
          </div>

          <RegisterForm 
            prefilledData={userData}
            fromAppointment={fromAppointment}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-[#2F8F83] hover:underline font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}