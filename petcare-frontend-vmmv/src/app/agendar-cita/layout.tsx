"use client";

import { AgendarCitaProvider } from "./context";
import { usePathname } from "next/navigation";

function StepIndicator() {
  const pathname = usePathname();

  const stepMap: Record<string, number> = {
    "/agendar-cita/servicio": 1,
    "/agendar-cita/datos": 2,
    "/agendar-cita/mascota": 3,
  };

  const currentStep = stepMap[pathname] || 1;

  return (
    <div className="flex justify-center mb-10">
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div
            key={step}
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
              ${
                step === currentStep
                  ? "bg-[#2F8F83] text-white"
                  : step < currentStep
                  ? "bg-[#A5D6CF] text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgendarCitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgendarCitaProvider>
      <div className="min-h-screen bg-[#F6F7F5] py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-12">
          <StepIndicator />
          {children}
        </div>
      </div>
    </AgendarCitaProvider>
  );
}