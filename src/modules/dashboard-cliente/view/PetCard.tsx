import React from "react";
import { PetCardProps } from "../model/dto/props/PetCardProps";

const C = { green: "#5BAA9C", greenLight: "#E6F4F1", white: "#FFFFFF", textMain: "#1F2937", border: "#E5E7EB" };

function DogSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
      <path d="M28 40 Q20 18 34 22 Q42 26 36 42Z" fill="#A8D5CE" opacity="0.8" />
      <path d="M72 40 Q80 18 66 22 Q58 26 64 42Z" fill="#A8D5CE" opacity="0.8" />
      <ellipse cx="50" cy="50" rx="26" ry="24" fill="#C8E8E4" />
      <ellipse cx="50" cy="63" rx="13" ry="9" fill="#B2D9D4" />
      <ellipse cx="50" cy="59" rx="5" ry="3.5" fill="#5BAA9C" />
      <circle cx="41" cy="48" r="4" fill="#5BAA9C" /><circle cx="59" cy="48" r="4" fill="#5BAA9C" />
      <circle cx="42.5" cy="47" r="1.5" fill="#fff" /><circle cx="60.5" cy="47" r="1.5" fill="#fff" />
      <path d="M45 67 Q50 72 55 67" stroke="#5BAA9C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="83" rx="17" ry="10" fill="#C8E8E4" />
    </svg>
  );
}

function CatSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
      <polygon points="28,42 20,18 42,34" fill="#A8D5CE" opacity="0.8" />
      <polygon points="72,42 80,18 58,34" fill="#A8D5CE" opacity="0.8" />
      <ellipse cx="50" cy="52" rx="25" ry="23" fill="#C8E8E4" />
      <ellipse cx="50" cy="62" rx="10" ry="7" fill="#B2D9D4" />
      <polygon points="50,57 47,62 53,62" fill="#5BAA9C" />
      <ellipse cx="41" cy="49" rx="4" ry="5" fill="#5BAA9C" /><ellipse cx="59" cy="49" rx="4" ry="5" fill="#5BAA9C" />
      <ellipse cx="41" cy="49" rx="1.5" ry="3" fill="#1F2937" /><ellipse cx="59" cy="49" rx="1.5" ry="3" fill="#1F2937" />
      <circle cx="42.5" cy="47.5" r="1" fill="#fff" /><circle cx="60.5" cy="47.5" r="1" fill="#fff" />
      <line x1="28" y1="61" x2="44" y2="63" stroke="#5BAA9C" strokeWidth="1" opacity="0.5" />
      <line x1="28" y1="65" x2="44" y2="65" stroke="#5BAA9C" strokeWidth="1" opacity="0.5" />
      <line x1="56" y1="63" x2="72" y2="61" stroke="#5BAA9C" strokeWidth="1" opacity="0.5" />
      <line x1="56" y1="65" x2="72" y2="65" stroke="#5BAA9C" strokeWidth="1" opacity="0.5" />
      <path d="M46 67 Q50 71 54 67" stroke="#5BAA9C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="83" rx="15" ry="9" fill="#C8E8E4" />
    </svg>
  );
}

export default function PetCard({ pet, onVerMascota }: PetCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ flex: "1 1 200px", backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)", cursor: "default", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 6px 20px rgba(91,170,156,0.15)"; el.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 1px 8px rgba(0,0,0,0.05)"; el.style.transform = "translateY(0)"; }}>
      <div style={{ width: "110px", height: "110px", borderRadius: "50%", backgroundColor: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {pet.tipo === "perro" ? <DogSVG /> : <CatSVG />}
      </div>
      <p style={{ fontSize: "16px", fontWeight: 700, color: C.textMain }}>{pet.nombre}</p>
      <button onClick={onVerMascota} style={{ width: "100%", backgroundColor: hover ? C.greenLight : C.white, color: hover ? C.green : "#4B5563", border: `1px solid ${hover ? C.green : C.border}`, borderRadius: "10px", padding: "8px 0", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        Ver mascota
      </button>
    </div>
  );
}