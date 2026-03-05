"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        ? "bg-emerald-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">
      <Link href="/" className="block mb-10 text-lg font-semibold">
        Pet<span className="text-emerald-600">Care</span>
      </Link>

      <nav className="space-y-3 flex-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={linkClass(item.href)}>
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
