"use client"

import { Cell, Pie, PieChart } from "recharts"

import { ATTENDANCE_SUMMARY_DATA } from "@/constants/admin-dashboard"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SUMMARY_COLORS = {
  Absent: "#7c3aed",
  Late: "#6366f1",
  "On Leave": "#60a5fa",
  Present: "#0ea5e9",
} as const

export function AttendanceSummaryChart() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Attendance Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[minmax(8.5rem,0.9fr)_minmax(0,1fr)] items-center gap-6">
        <div className="relative min-w-0">
          <ChartContainer
            config={{ value: { label: "Employees" } }}
            className="mx-auto aspect-square h-48 w-full max-w-52"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={ATTENDANCE_SUMMARY_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={1}
              >
                {ATTENDANCE_SUMMARY_DATA.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SUMMARY_COLORS[entry.name]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-950">1,248</p>
              <p className="text-xs font-medium text-slate-500">Total</p>
            </div>
          </div>
        </div>
        <div className="grid min-w-0 gap-3">
          {ATTENDANCE_SUMMARY_DATA.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs"
            >
              <span className="flex min-w-0 items-center truncate gap-2 text-slate-700">
                <span
                  className="size-2.5 shrink-0"
                  style={{ backgroundColor: SUMMARY_COLORS[item.name] }}
                />
                {item.name}
              </span>
              <span className="text-right font-semibold text-slate-950">
                {item.percent}%
                <span className="ml-1 font-normal text-slate-500">
                  ({item.value.toLocaleString()})
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
