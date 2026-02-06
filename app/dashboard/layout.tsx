import SidebarServer from "@/components/sidebarServer";
import type { ReactNode } from "react";

// No NavBar is imported or rendered here, so the navbar will NOT show on any dashboard page.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main  className="min-h-screen bg-bg text-primary flex">
      <SidebarServer />
      {children}
    </main>
  )
}
