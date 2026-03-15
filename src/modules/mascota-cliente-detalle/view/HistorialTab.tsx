import React from "react";
import { HistorialTabProps } from "../model/dto/props/HistorialTabProps";
import HistorialCard from "./HistorialCard";

export default function HistorialTab({ historial }: HistorialTabProps) {
  if (historial.length === 0) {
    return <p className="text-sm text-gray-400 py-8 text-center">No hay registros en el historial médico.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {historial.map((item) => (
        <div key={item.id} className="flex gap-4 items-start">
          <div className="mt-5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4F8A7C]" />
          </div>
          <div className="flex-1">
            <HistorialCard historial={item} />
          </div>
        </div>
      ))}
    </div>
  );
}