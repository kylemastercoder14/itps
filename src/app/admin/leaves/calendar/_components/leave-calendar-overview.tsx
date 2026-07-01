"use client"

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { IconCalendarFilled, IconChevronRight } from "@tabler/icons-react"

import {
  LEAVE_CALENDAR_EVENT_DATA,
  LEAVE_CALENDAR_OVERVIEW_DATA,
  LEAVE_CALENDAR_UPCOMING_DATA,
} from "@/constants/admin-dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const TONE_CLASS = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
  cyan: "bg-cyan-50 text-cyan-600",
} as const
const EVENT_CLASS = {
  green: "bg-emerald-100 text-emerald-700",
  violet: "bg-violet-100 text-violet-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
} as const

export function LeaveCalendarOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/leaves">
            <IconCalendarFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Leave Calendar
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
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <CalendarToolbar />
          <CalendarGrid />
        </div>
        <aside className="space-y-5">
          <OverviewCard />
          <UpcomingLeavesCard />
          <QuickActionsCard />
        </aside>
      </div>
    </div>
  )
}

function CalendarToolbar() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">View</p>
        <div className="flex rounded-lg border border-zinc-200 bg-white p-1 shadow-xs">
          {["Month", "Week", "List"].map((view, index) => (
            <Button key={view} variant={index === 0 ? "default" : "ghost"} className={cn("h-10 rounded-md px-6 text-xs font-semibold", index === 0 && "bg-zinc-900 hover:bg-zinc-800")}>
              {view}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="icon" className="size-10 rounded-lg bg-zinc-200 hover:bg-zinc-300"><CalendarDays className="size-4" /></Button>
        <Button variant="secondary" size="icon" className="size-10 rounded-lg bg-zinc-200 hover:bg-zinc-300"><ChevronLeft className="size-4" /></Button>
        <Button variant="secondary" className="h-10 min-w-36 rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300">May 2026</Button>
        <Button variant="secondary" size="icon" className="size-10 rounded-lg bg-zinc-200 hover:bg-zinc-300"><ChevronRight className="size-4" /></Button>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <FilterSelect label="Department" value="all-departments" options={["All Departments", "Information Technology", "Human Resources", "Finance"]} />
        <FilterSelect label="Leave Type" value="all-leave-types" options={["All Leave Types", "Vacation Leave", "Sick Leave", "Emergency Leave"]} />
        <Button variant="secondary" className="h-10 rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"><Filter className="size-4" />Filter</Button>
      </div>
    </div>
  )
}

function FilterSelect({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      <Select defaultValue={value}>
        <SelectTrigger className="h-10 w-44 rounded-lg border-zinc-200 bg-white text-xs"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={option} value={index === 0 ? value : option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}

function CalendarGrid() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 bg-white shadow-xs">
      <div className="grid grid-cols-7 border-l border-t border-zinc-200">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-b border-r border-zinc-200 bg-zinc-50 py-4 text-center text-sm font-bold text-slate-700">
            {day}
          </div>
        ))}
        {LEAVE_CALENDAR_EVENT_DATA.map((day, index) => (
          <div key={`${day.day}-${index}`} className={cn("min-h-36 border-b border-r border-zinc-200 p-3", "today" in day && "bg-blue-50")}>
            <span className={cn("font-semibold", "muted" in day && "text-slate-300")}>{day.day}</span>
            <div className="mt-4 space-y-2">
              {day.events.map((event) => (
                <div key={`${day.day}-${event.type}`} className={cn("rounded-md px-2 py-1 text-xs font-semibold", EVENT_CLASS[event.tone])}>
                  <p>{event.type}</p>
                  {event.count ? <p className="mt-1 font-normal text-slate-700">{event.count}</p> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 p-4 text-xs text-slate-600">
        {[
          ["Vacation Leave", "#22c55e"],
          ["Sick Leave", "#7c3aed"],
          ["Emergency Leave", "#ef4444"],
          ["Maternity Leave", "#f59e0b"],
          ["Paternity Leave", "#06b6d4"],
          ["Special Privilege Leave", "#2563eb"],
          ["More", "#2563eb"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </Card>
  )
}

function OverviewCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
      <h3 className="font-bold">Leave Overview (May 2026)</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {LEAVE_CALENDAR_OVERVIEW_DATA.map((item) => {
          return (
            <div key={item.title} className={cn("rounded-lg p-4", TONE_CLASS[item.tone])}>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold">{item.title}</p>
              </div>
              <p className="mt-2 text-2xl font-bold">{item.value}</p>
              <p className="text-xs">{item.note}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function UpcomingLeavesCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
      <h3 className="font-bold">Upcoming Leaves</h3>
      <div className="mt-4 space-y-4">
        {LEAVE_CALENDAR_UPCOMING_DATA.map((item) => (
          <div key={`${item.name}-${item.range}`} className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-700">{item.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-none">{item.name}</p>
              <p className="mt-1 text-xs text-slate-500">{item.type}</p>
              <p className="mt-1 text-xs text-blue-600">{item.range}</p>
            </div>
            <Badge variant="secondary" className={cn(TONE_CLASS[item.tone])}>{item.days}</Badge>
          </div>
        ))}
      </div>
      <Button variant="link" className="mt-4 h-auto p-0 text-blue-600">View all upcoming leaves</Button>
    </Card>
  )
}

function QuickActionsCard() {
  const actions = [
    ["Create Leave Request", "Apply for leave", Plus],
    ["View My Leave Balance", "Check remaining leave credits", CalendarDays],
    ["Leave Reports", "View leave analytics and reports", FileText],
    ["Export Calendar", "Download calendar as PDF/Excel", Download],
  ] as const

  return (
    <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4 text-sm">
        {actions.map(([title, note, Icon]) => (
          <div key={title} className="flex gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <Icon className="size-4" />
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-xs text-slate-500">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
