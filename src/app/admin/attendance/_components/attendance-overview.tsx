"use client";

import { Download, FileText } from "lucide-react";
import { IconClockHour3Filled } from "@tabler/icons-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ATTENDANCE_DEPARTMENT_DONUT_DATA,
  ATTENDANCE_DEPARTMENT_SUMMARY_DATA,
  ATTENDANCE_OVERVIEW_TREND_DATA,
  ATTENDANCE_REPORT_KPI_DATA,
  ATTENDANCE_REPORT_TEMPLATE_DATA,
} from "@/constants/admin-dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AttendanceOverview() {
  return (
    <div className="flex flex-col gap-4">
      <AttendanceToolbar />
      <AttendanceKpis />
      <section className="grid gap-4 xl:grid-cols-[1fr_23rem]">
        <AttendanceTrendCard />
        <QuickTemplatesCard />
      </section>
      <section className="grid gap-4 xl:grid-cols-[1fr_23rem]">
        <DepartmentSummaryCard />
        <DepartmentChartCard />
      </section>
    </div>
  );
}

function AttendanceToolbar() {
  return (
    <section className="flex flex-col gap-4 rounded-none pb-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-1.5">
          <IconClockHour3Filled className="size-4 text-zinc-900" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-900">
            Attendance
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="h-9 w-28 rounded-lg border-zinc-300 bg-white text-xs font-semibold shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            <Download className="size-4" />
            Export
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            Generate Report
          </Button>
        </div>
      </div>
    </section>
  );
}

function AttendanceKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {ATTENDANCE_REPORT_KPI_DATA.map((item) => (
        <Card
          key={item.title}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {item.title}
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
                {item.value}
              </p>
            </div>
            <MiniSparkline tone={item.trend === "down" ? "down" : "up"} />
          </div>
        </Card>
      ))}
    </section>
  );
}

function MiniSparkline({ tone }: { tone: "up" | "down" }) {
  const points =
    tone === "down"
      ? "0,18 14,14 28,15 42,10 56,12"
      : "0,14 14,16 28,11 42,13 56,7";

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-16 shrink-0 self-end"
      viewBox="0 0 56 24"
    >
      <path
        d={`M${points}`}
        fill="none"
        stroke={tone === "down" ? "#ef4444" : "#0ea5e9"}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function AttendanceTrendCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Attendance Overview</h3>
        <Select defaultValue="this-month">
          <SelectTrigger size="sm" className="text-xs w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer
        config={{
          present: { label: "Present (%)", color: "#16a34a" },
          late: { label: "Late (%)", color: "#f97316" },
          undertime: { label: "Undertime (%)", color: "#2563eb" },
          absent: { label: "Absent (%)", color: "#ef4444" },
        }}
        className="h-50 w-full"
      >
        <LineChart
          data={ATTENDANCE_OVERVIEW_TREND_DATA}
          margin={{ left: -15, right: 8, top: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            fontSize="10px"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            fontSize="10px"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="present"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
          <Line
            dataKey="late"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
          <Line
            dataKey="undertime"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
          <Line
            dataKey="absent"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
        {[
          ["Present (%)", "#16a34a"],
          ["Late (%)", "#f97316"],
          ["Undertime (%)", "#2563eb"],
          ["Absent (%)", "#ef4444"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="size-2" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </Card>
  );
}

function DepartmentChartCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Attendance by Department</h3>
      </div>
      <div className="grid items-center gap-4">
        <div className="relative">
          <ChartContainer
            config={{ value: { label: "Attendance" } }}
            className="mx-auto h-60 aspect-square"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={ATTENDANCE_DEPARTMENT_DONUT_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={86}
              >
                {ATTENDANCE_DEPARTMENT_DONUT_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-xl font-bold">92.6%</p>
              <p className="text-[10px] text-slate-500">Overall Attendance</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 text-xs">
          {ATTENDANCE_DEPARTMENT_DONUT_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                {item.name}
              </span>
              <span className="font-semibold">
                {item.value}%{" "}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function QuickTemplatesCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <h3 className="font-bold">Quick Report Templates</h3>
      <div className="space-y-4">
        {ATTENDANCE_REPORT_TEMPLATE_DATA.map((item) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-8 items-center justify-center rounded-sm bg-accent text-black">
              <FileText className="size-4" />
            </span>
            <div>
              <p className="font-semibold text-sm text-slate-900">
                {item.title}
              </p>
              <p className="text-xs text-slate-500">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DepartmentSummaryCard() {
  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 gap-0! border-zinc-200 bg-white shadow-xs">
      <div className="flex items-center mb-3 justify-between">
        <h3 className="font-bold">Attendance Summary by Department</h3>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Present (%)</TableHead>
            <TableHead>Late (%)</TableHead>
            <TableHead>Undertime (%)</TableHead>
            <TableHead>Absent (%)</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Avg. Hours / Emp.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ATTENDANCE_DEPARTMENT_SUMMARY_DATA.map((item) => (
            <TableRow key={item.department} className="h-14 hover:bg-zinc-50">
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.employees}</TableCell>
              <TableCell className="font-semibold text-emerald-600">
                {item.present}
              </TableCell>
              <TableCell className="font-semibold text-orange-600">
                {item.late}
              </TableCell>
              <TableCell className="font-semibold text-blue-600">
                {item.undertime}
              </TableCell>
              <TableCell className="font-semibold text-red-600">
                {item.absent}
              </TableCell>
              <TableCell>{item.totalHours}</TableCell>
              <TableCell>{item.avgHours}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-zinc-50 font-bold">
            <TableCell>Total / Average</TableCell>
            <TableCell>248</TableCell>
            <TableCell className="text-emerald-600">92.6%</TableCell>
            <TableCell className="text-orange-600">4.7%</TableCell>
            <TableCell className="text-blue-600">1.9%</TableCell>
            <TableCell className="text-red-600">1.6%</TableCell>
            <TableCell>5,324h 18m</TableCell>
            <TableCell>24h 36m</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 departments</span>
        <div className="flex items-center gap-1.5">
          <span>Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger size="sm" className="h-8 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon-sm" className="text-xs">
            1
          </Button>
          <Button variant="outline" size="icon-sm" className="text-xs">
            2
          </Button>
        </div>
      </div>
    </Card>
  );
}
