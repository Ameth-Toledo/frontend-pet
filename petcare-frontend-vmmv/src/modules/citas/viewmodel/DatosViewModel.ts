import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export const useDatosViewModel = (selectedService: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    nombre: "",
    apellido: "",
    telefono: ""
  });

  useEffect(() => {
    if (!selectedService) {
      router.push('/agendar-cita/servicio');
      return;
    }

    loadUserData();
  }, [selectedService, router]);

  const loadUserData = () => {
    if (typeof window === 'undefined') return;

    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userStr || !token) return;

    try {
      const user = JSON.parse(userStr);

      if (user.role === 'CLIENTE') {
        setIsLoggedIn(true);
        
        const nameParts = user.fullName?.split(' ') || [];
        
        setUserData({
          email: user.email || "",
          nombre: nameParts[0] || "",
          apellido: nameParts.slice(1).join(' ') || "",
          telefono: ""
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const validateForm = (data: UserData): boolean => {
    return !!(data.email && data.nombre && data.apellido && data.telefono);
  };

  const validateEmail = (email: string): boolean => {
    // Regex más permisivo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Solo verificar que tenga 10 dígitos
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const continuar = (
    data: UserData,
    saveToContext: (data: UserData) => void
  ) => {
    if (!validateForm(data)) {
      console.error('Formulario incompleto');
      return;
    }

    if (!validateEmail(data.email)) {
      console.error('Email inválido:', data.email);
      // Continuar de todos modos si tiene formato básico
      if (!data.email.includes('@')) {
        return;
      }
    }

    if (!validatePhone(data.telefono)) {
      console.error('Teléfono inválido (debe ser 10 dígitos):', data.telefono);
      // Continuar de todos modos si tiene números
      if (!/^\d+$/.test(data.telefono)) {
        return;
      }
    }

    saveToContext(data);
    router.push('/agendar-cita/mascota');
  };

  return {
    isLoggedIn,
    userData,
    validateForm,
    continuar
  };
};
