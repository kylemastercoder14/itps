"use client"

import { AdminHeader } from "./admin-header"
import { AppSidebar } from "./app-sidebar"

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#0b0b0b] text-[#303030]">
      <AdminHeader />
      <div className="flex h-[calc(100vh-4.25rem)] overflow-hidden rounded-tl-2xl bg-[#F1F1F1]">
        <AppSidebar />
        <main className="h-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#F1F1F1] p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
