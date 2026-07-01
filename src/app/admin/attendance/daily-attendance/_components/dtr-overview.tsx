"use client"

import Link from "next/link"
import { Download } from "lucide-react"
import { IconChevronRight, IconClockHour3Filled } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

import { DtrFilters } from "./dtr-filters"
import { DtrKpiGrid } from "./dtr-kpi-grid"
import { DtrTable } from "./dtr-table"

export function DtrOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/attendance">
            <IconClockHour3Filled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Daily Attendance
            </h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
        >
          <Download className="size-4" />
          Export
        </Button>
      </div>
      <DtrKpiGrid />
      <DtrFilters />
      <DtrTable />
    </div>
  )
}
