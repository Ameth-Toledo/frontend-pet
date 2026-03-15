import React from "react";
import { MascotaTabsProps } from "../model/dto/props/MascotaTabsProps";
import { TabActivo } from "../model/ui.model";

const TABS: { key: TabActivo; label: string }[] = [
  { key: "historial", label: "Historial" },
  { key: "vacunas",   label: "Cartilla de vacunación" },
];

export default function MascotaTabs({ tabActivo, onTabChange }: MascotaTabsProps) {
  return (
    <div className="flex gap-6 border-b border-gray-200 mb-6">
      {TABS.map((tab) => {
        const isActive = tabActivo === tab.key;
        return (
          <button key={tab.key} onClick={() => onTabChange(tab.key)}
            className={`pb-3 text-sm font-medium transition-colors relative ${isActive ? "text-[#4F8A7C]" : "text-gray-400 hover:text-gray-600"}`}>
            {tab.label}
            {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F8A7C] rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}