"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileChartColumn,
  Plus,
} from "lucide-react";
import { IconCalendarFilled } from "@tabler/icons-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  LEAVE_BALANCE_SUMMARY_DATA,
  LEAVE_CALENDAR_DATA,
  LEAVE_KPI_DATA,
  LEAVE_TREND_DATA,
  LEAVE_TYPE_SUMMARY_DATA,
} from "@/constants/admin-dashboard";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function LeavesOverview() {
  return (
    <div className="flex flex-col gap-4">
      <LeavesToolbar />
      <LeaveKpis />
      <section className="grid gap-4 xl:grid-cols-[28rem_1fr]">
        <LeaveOverviewCard />
        <LeaveCalendarCard />
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.10fr_1fr]">
        <LeaveBalanceCard />
        <LeaveTrendCard />
      </section>
    </div>
  );
}

function LeavesToolbar() {
  return (
    <section className="flex flex-col gap-4 rounded-none pb-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-1.5">
          <IconCalendarFilled className="size-4 text-zinc-900" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-900">
            Leave Management
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="h-9 w-32 rounded-lg border-zinc-300 bg-white text-xs font-semibold shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            <FileChartColumn className="size-4" />
            Export
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            <Plus className="size-4" />
            New Leave Request
          </Button>
        </div>
      </div>
    </section>
  );
}

function LeaveKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {LEAVE_KPI_DATA.map((item) => (
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
              <p className="mt-1 text-xs font-normal text-zinc-500">
                {item.note}
              </p>
            </div>
            <MiniSparkline tone={item.tone === "orange" ? "down" : "up"} />
          </div>
        </Card>
      ))}
    </section>
  );
}

function MiniSparkline({ tone }: { tone: "up" | "down" }) {
  const points =
    tone === "down"
      ? "0,8 14,9 28,13 42,12 56,16"
      : "0,17 14,14 28,15 42,10 56,9";

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-16 shrink-0 self-end"
      viewBox="0 0 56 24"
    >
      <path
        d={`M${points}`}
        fill="none"
        stroke={tone === "down" ? "#f97316" : "#0ea5e9"}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LeaveOverviewCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <h3 className="font-bold">Leave Overview (This Month)</h3>
      <div className="relative">
        <ChartContainer
          config={{ value: { label: "Leaves" } }}
          className="mx-auto h-48 aspect-square"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={LEAVE_TYPE_SUMMARY_DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={76}
            >
              {LEAVE_TYPE_SUMMARY_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-xl font-bold">112</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>
      <LegendList data={LEAVE_TYPE_SUMMARY_DATA} />
    </Card>
  );
}

function LeaveCalendarCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-bold">Leave Calendar</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon-sm"
            className="size-8 rounded-lg bg-zinc-200 hover:bg-zinc-300"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            className="size-8 rounded-lg bg-zinc-200 hover:bg-zinc-300"
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <Select defaultValue="may-2026">
            <SelectTrigger size="sm" className="text-xs w-30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may-2026">May 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            size="sm"
            className="h-9 rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            Today
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 overflow-hidden rounded-lg border-l border-t border-zinc-200 text-center text-xs">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-b border-r border-zinc-200 bg-zinc-50 py-2 font-semibold"
          >
            {day}
          </div>
        ))}
        {LEAVE_CALENDAR_DATA.map((day, index) => (
          <div
            key={`${day.day}-${index}`}
            className="min-h-9 border-b border-r border-zinc-200 p-1.25"
          >
            <span
              className={cn(
                "inline-flex size-6 items-center justify-center rounded-full text-xs",
                "muted" in day && "text-slate-300",
                "today" in day && "bg-black font-semibold text-white",
              )}
            >
              {day.day}
            </span>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1">
              {day.dots.map((dot, dotIndex) => (
                <span
                  key={`${dot}-${dotIndex}`}
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: dot }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-slate-600">
        {LEAVE_TYPE_SUMMARY_DATA.map((item) => (
          <span key={item.name} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.name}
          </span>
        ))}
      </div>
    </Card>
  );
}

function LeaveBalanceCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Leave Balance Summary</h3>
        <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
          View All Balances
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead>Total Entitlement</TableHead>
            <TableHead>Used</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAVE_BALANCE_SUMMARY_DATA.map((item) => (
            <TableRow key={item.type} className="hover:bg-zinc-50">
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.entitlement}</TableCell>
              <TableCell>{item.used}</TableCell>
              <TableCell className="font-semibold">{item.balance}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700"
                >
                  Good
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function LeaveTrendCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <h3 className="font-bold">Leave Trend (Last 6 Months)</h3>
      <ChartContainer
        config={{ leaves: { label: "Leaves", color: "#2563eb" } }}
        className="mt-4 h-56 w-full"
      >
        <AreaChart
          data={LEAVE_TREND_DATA}
          margin={{ left: -20, right: 8, top: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="leaves"
            stroke="#2563eb"
            fill="#dbeafe"
            strokeWidth={3}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

function LegendList({
  data,
}: {
  data: readonly { name: string; value: number; note: string; fill: string }[];
}) {
  return (
    <div className="space-y-2 text-xs">
      {data.map((item) => (
        <div key={item.name} className="flex justify-between gap-3">
          <span className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.name}
          </span>
          <span className="font-medium">
            {item.value} <span className="text-slate-500">({item.note})</span>
          </span>
        </div>
      ))}
    </div>
  );
}
