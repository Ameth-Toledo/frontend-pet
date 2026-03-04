import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "#F8FAF9",
        minHeight: "100vh",
        padding: "12px",
        display: "flex",
        gap: "16px",
        fontFamily: "'Geist','DM Sans',system-ui,sans-serif",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>
        {children}
      </div>
    </div>
  );
}