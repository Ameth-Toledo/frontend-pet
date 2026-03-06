"use client";

import {
  faTableColumns,
  faUsers,
  faCalendarCheck,
  faPaw,
  faUserMd,
  faChartLine,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar, { NavItem } from "./Sidebar";

// ✅ Para agregar una nueva ruta al sidebar del admin,
// simplemente añade un nuevo objeto a este array con label, href e icon.
const adminNavItems: NavItem[] = [
  { label: "Panel principal",    href: "/admin/dashboard",    icon: faTableColumns },
  { label: "Clientes",           href: "/admin/clientes",     icon: faUsers },
  { label: "Citas",              href: "/admin/citas",        icon: faCalendarCheck },
  { label: "Pacientes",          href: "/admin/mascotas",     icon: faPaw },
  { label: "Personal",           href: "/admin/personal",     icon: faUserMd },
  { label: "Análisis",           href: "/admin/analisis",     icon: faChartLine },
  { label: "Configuración",      href: "/admin/configuracion", icon: faGear },
  // { label: "Usuarios",        href: "/admin/usuarios",     icon: faUserShield },
];

export default function SidebarAdmin() {
  return <Sidebar navItems={adminNavItems} />;
}
