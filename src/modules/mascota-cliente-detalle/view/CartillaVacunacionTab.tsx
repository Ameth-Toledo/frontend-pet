import React from "react";
import { CartillaVacunacionTabProps } from "../model/dto/props/CartillaVacunacionTabProps";

export default function CartillaVacunacionTab({ vacunas, isLoadingVacunas }: CartillaVacunacionTabProps) {
  if (isLoadingVacunas) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-7 h-7 border-4 border-gray-200 border-t-[#4F8A7C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
      <h3 className="text-base font-bold text-gray-800 mb-5">Vacunas Aplicadas</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">Nombre de la Vacuna</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">Fecha de Aplicación</th>
          </tr>
        </thead>
        <tbody>
          {vacunas.map((vacuna) => (
            <tr key={vacuna.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3.5 text-sm font-medium text-gray-700">{vacuna.nombre}</td>
              <td className="py-3.5 text-sm text-gray-500">{vacuna.fecha}</td>
            </tr>
          ))}
          {vacunas.length === 0 && (
            <tr><td colSpan={2} className="py-8 text-center text-sm text-gray-400">No hay vacunas registradas.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}