import { ReactNode } from "react";

export default function VeterinarioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Panel Veterinario</h1>
        {children}
      </div>
    </div>
  );
}