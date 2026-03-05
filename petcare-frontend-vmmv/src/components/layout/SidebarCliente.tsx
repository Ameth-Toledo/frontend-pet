"use client";

import {
  faBone,
  faBriefcaseMedical,
  faGear,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar, { NavItem } from "./Sidebar";

const clienteNavItems: NavItem[] = [
  { label: "Panel principal", href: "/cliente/dashboard", icon: faTableColumns  },
  { label: "Mis Citas",       href: "/cliente/miscitas",   icon: faBriefcaseMedical },
  { label: "Mis mascotas",    href: "/cliente/mismascotas", icon: faBone },
  { label: "Configuración",   href: "/cliente/configuracion", icon: faGear },
];

export default function SidebarCliente() {
  return <Sidebar navItems={clienteNavItems} />;
}
