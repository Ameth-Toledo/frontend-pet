"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarProps } from "../models/props/SidebarProps";
import { UserInfo } from "../models/UserInfo";

export default function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const [user, setUser] = useState<UserInfo>({ name: "Usuario", role: "PetCare", initials: "U", email: "eddyjordan@example.com" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const parsed   = JSON.parse(raw);
          const name     = parsed.fullName ?? parsed.name ?? "Usuario";
          const role     = parsed.role     ?? "PetCare";
          const words    = name.trim().split(" ");
          const initials = words.length >= 2
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : words[0][0].toUpperCase();
          setUser({ name, role, initials, email: parsed.email ?? "eddyjordan@example.com" });
        } catch {
          // mantiene defaults
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-10">
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#4F8A7C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <FontAwesomeIcon icon={faPaw} style={{ color: "#FFFFFF", width: "18px", height: "18px" }} />
        </div>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>PetCare</span>
      </Link>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              pathname === item.href ? "" : "text-gray-600 hover:bg-gray-100"
            }`}
            style={pathname === item.href
              ? { backgroundColor: "#D9EDEA", color: "#4F8A7C", borderRight: "3px solid #4F8A7C" }
              : undefined}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "16px", marginTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#E6F4F1", border: "2px solid #C8E6E0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#4F8A7C" }}>{user.initials}</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </p>
            <p style={{ fontSize: "11px", color: "#6B7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </p>
          </div>
        </div>

        <button onClick={handleLogout}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "10px", border: "none", backgroundColor: "transparent", fontSize: "13px", color: "#6B7280", cursor: "pointer", textAlign: "left" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "#FEE2E2"; b.style.color = "#B91C1C"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.backgroundColor = "transparent"; b.style.color = "#6B7280"; }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}