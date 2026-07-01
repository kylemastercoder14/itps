"use client"

import {
  ArrowUpDown,
  CalendarDays,
  ChevronRight,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react"

import {
  ACTIVITY_LOG_DATA,
  ACTIVITY_LOG_DETAILS,
  ACTIVITY_LOG_SUMMARY,
  ACTIVITY_QUICK_ACTIONS,
} from "@/constants/admin-dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const TONE_SOFT = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  red: "bg-red-50 text-red-700",
  violet: "bg-violet-50 text-violet-700",
  cyan: "bg-cyan-50 text-cyan-700",
} as const

const TONE_SOLID = {
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  violet: "bg-violet-600",
  cyan: "bg-cyan-500",
} as const

export function ActivityOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <ActivityKpis />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <main className="space-y-5">
          <ActivityTableCard />
        </main>
        <aside className="space-y-5">
          <LogSummaryCard />
          <LogDetailsCard />
          <QuickActionsCard />
          <HelpCard />
        </aside>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <FileText className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">Activity Logs</h1>
      </div>
      <Button variant="secondary" className="rounded-lg bg-zinc-200 text-zinc-800 hover:bg-zinc-300">
        <CalendarDays className="size-4" />
        May 17, 2025 - May 24, 2025
      </Button>
    </div>
  )
}

function ActivityKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {ACTIVITY_LOG_SUMMARY.map((item) => (
        <Card key={item.label} className="flex min-h-[122px] flex-col justify-center rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
          <p className="w-fit border-b border-dotted border-zinc-400 text-sm font-semibold text-zinc-800">{item.label}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">{item.value}</p>
        </Card>
      ))}
    </section>
  )
}

function ActivityTableCard() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
      <div className="flex flex-wrap gap-3 p-5">
        <div className="relative min-w-72 flex-1">
          <Input className="h-11 pr-10" placeholder="Search activities..." />
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>
        <SelectField value="all-users" options={["All Users", "Admin", "HR Manager", "Payroll Officer"]} />
        <SelectField value="all-actions" options={["All Actions", "Login", "Create", "Update", "Delete", "Export"]} />
        <SelectField value="all-modules" options={["All Modules", "Authentication", "Employee", "Payroll Run", "Attendance"]} />
        <Button variant="outline" className="h-11 min-w-48 justify-between">
          May 17, 2025 - May 24, 2025
          <CalendarDays className="size-4" />
        </Button>
        <Button variant="outline" className="text-blue-600">
          <Filter className="size-4" />
          Filters
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>
              <span className="flex items-center gap-2">
                Date & Time
                <ArrowUpDown className="size-3" />
              </span>
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ACTIVITY_LOG_DATA.map((item, index) => (
            <TableRow key={`${item.date}-${index}`} className="h-16">
              <TableCell>
                <Multiline value={item.date} className="font-semibold text-blue-900" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className={cn("text-xs font-bold text-white", TONE_SOLID[item.tone])}>
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-900">{item.user}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <ActionBadge action={item.action} tone={item.tone} />
              </TableCell>
              <TableCell className="font-semibold text-blue-900">{item.module}</TableCell>
              <TableCell>
                <Multiline value={item.description} />
              </TableCell>
              <TableCell className="font-semibold text-blue-900">{item.ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t p-5 text-sm text-slate-600">
        <span>Showing 1 to 10 of 245 activities</span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <SelectField value="10" options={["10", "25", "50"]} compact />
          {["<", "1", "2", "3", "...", "25", ">"].map((item) => (
            <Button
              key={item}
              variant={item === "1" ? "default" : "outline"}
              size="icon"
              className={cn("size-9", item === "1" && "bg-zinc-900 hover:bg-zinc-800")}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}

function LogSummaryCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Log Summary</h3>
        <SelectField value="this-week" options={["This Week", "This Month", "Today"]} compact />
      </div>
      <div className="mt-5 space-y-4">
        {ACTIVITY_LOG_SUMMARY.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <span className={cn("flex size-9 items-center justify-center rounded-full", TONE_SOFT[item.tone])}>
                <FileText className="size-4" />
              </span>
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </span>
            <span className="text-xl font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function LogDetailsCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Log Details</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-700">
          <FileText className="size-5" />
        </span>
        <div>
          <ActionBadge action="Login" tone="green" />
          <p className="mt-1 text-xs text-slate-500">May 24, 2025 10:30:15 AM</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 border-t pt-5 text-sm">
        {ACTIVITY_LOG_DETAILS.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[6rem_1fr] gap-3">
            <span className="font-semibold text-slate-500">{label}</span>
            <span className={cn("font-semibold text-slate-900", label === "Status" && "text-emerald-600")}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function QuickActionsCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4">
        {ACTIVITY_QUICK_ACTIONS.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              {index === 1 ? <Trash2 className="size-4" /> : index === 2 ? <ShieldCheck className="size-4" /> : <Download className="size-4" />}
            </span>
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HelpCard() {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="size-5 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-700">
            Learn more about activity logs and how to audit user actions.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  )
}

function ActionBadge({
  action,
  tone,
}: {
  action: string
  tone: keyof typeof TONE_SOFT
}) {
  return (
    <Badge variant="secondary" className={TONE_SOFT[tone]}>
      {action}
    </Badge>
  )
}

function Multiline({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("text-sm text-slate-700", className)}>
      {value.split("\n").map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </span>
  )
}

function SelectField({
  value,
  options,
  compact = false,
}: {
  value: string
  options: string[]
  compact?: boolean
}) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className={cn("h-11", compact ? "w-28" : "w-40")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={option} value={index === 0 ? value : option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
