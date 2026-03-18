"use client";

import {
  faCalendarCheck,
  faGear,
  faTableColumns,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "../models/NavItem";
import Sidebar from "./Sidebar";

const veterinarioNavItems: NavItem[] = [
  { label: "Panel principal", href: "/veterinario/dashboard",      icon: faTableColumns },
  { label: "Mis citas",       href: "/veterinario/citas",          icon: faCalendarCheck },
  { label: "Mis pacientes",   href: "/veterinario/mis-pacientes",  icon: faPaw },
  { label: "Configuración",   href: "/veterinario/configuracion",  icon: faGear },
];

export default function SidebarVeterinario() {
  return <Sidebar navItems={veterinarioNavItems} />;
}
