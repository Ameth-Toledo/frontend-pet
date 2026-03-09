"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
  icon: IconDefinition;
}

interface SidebarProps {
  navItems: NavItem[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
      pathname === path
        ? ""
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">
      <Link href="/" className="flex items-center gap-3 mb-10">
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            backgroundColor: "#4F8A7C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faPaw} style={{ color: "#FFFFFF", width: "18px", height: "18px" }} />
        </div>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>PetCare</span>
      </Link>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass(item.href)}
            style={pathname === item.href ? { backgroundColor: "#D9EDEA", color: "#4F8A7C", borderRight: "5px solid #4F8A7C", borderBottomRightRadius: "0px" } : undefined}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
