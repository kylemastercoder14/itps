"use client"

import {
  CalendarDays,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react"
import Link from "next/link"
import { IconCalendarFilled, IconChevronRight } from "@tabler/icons-react"

import {
  LEAVE_REQUEST_KPI_DATA,
  LEAVE_REQUEST_TAB_DATA,
  LEAVE_REQUEST_TABLE_DATA,
} from "@/constants/admin-dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function LeaveRequestsOverview() {
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
              Leave Requests
            </h1>
          </div>
        </div>
        <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
          <Plus className="size-4" />
          New request
        </Button>
      </div>
      <LeaveRequestKpis />
      <div className="space-y-5">
        <RequestFilters />
        <Card className="overflow-hidden rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
          <RequestTabs />
          <LeaveRequestsTable />
        </Card>
      </div>
    </div>
  )
}

function LeaveRequestKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {LEAVE_REQUEST_KPI_DATA.map((item) => (
        <Card key={item.title} className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs">
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">{item.title}</p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">{item.value}</p>
              <p className="mt-1 text-xs font-normal text-zinc-500">{item.note}</p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}

function RequestTabs() {
  return (
    <Tabs defaultValue="all" className="min-w-0">
      <TabsList variant="line" className="justify-start">
        {LEAVE_REQUEST_TAB_DATA.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-9 px-3 text-xs data-active:text-black group-data-[variant=line]/tabs-list:data-active:after:bg-black"
          >
            {tab.label}
            {"count" in tab ? ` (${tab.count})` : ""}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function RequestFilters() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-60">
        <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        <Input className="h-9 text-xs! bg-transparent border-input pr-9" placeholder="Search employee..." />
      </div>
      <FilterSelect value="all-departments" options={["All Departments", "Information Technology", "Human Resources", "Finance"]} />
      <FilterSelect value="all-leave-types" options={["All Leave Types", "Vacation Leave", "Sick Leave", "Emergency Leave", "Maternity Leave"]} />
      <FilterSelect value="all-status" options={["All Status", "Pending", "Approved", "Rejected", "Cancelled"]} />
      <div className="ml-auto flex flex-wrap items-center gap-3">
        <label className="text-xs font-semibold text-slate-600">Request Date</label>
        <Button size="sm" variant="outline" className="h-9 text-xs justify-start gap-2 text-slate-500">
          <CalendarDays className="size-3.5" />
          Start date
          <span className="mx-2 text-slate-400">-</span>
          End date
        </Button>
      </div>
    </div>
    </Card>
  )
}

function FilterSelect({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger size="sm" className="h-9 text-xs!">
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

function LeaveRequestsTable() {
  return (
    <>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead className="w-10"><Checkbox /></TableHead>
            <TableHead>Request ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAVE_REQUEST_TABLE_DATA.map((item) => (
            <TableRow key={item.requestId} className="h-18 hover:bg-zinc-50">
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-semibold text-slate-800">{item.requestId}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.employee}</p>
                    <p className="text-xs text-slate-500">{item.position}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  {item.type}
                </span>
              </TableCell>
              <TableCell>
                <p>{item.dates}</p>
                <p className="text-xs text-slate-500">({item.dateNote})</p>
              </TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="size-9">
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 128 entries</span>
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
    </>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md",
        status === "Pending" && "bg-amber-50 text-amber-700",
        status === "Approved" && "bg-emerald-50 text-emerald-700",
        status === "Rejected" && "bg-red-50 text-red-700",
        status === "Cancelled" && "bg-slate-100 text-slate-600"
      )}
    >
      {status}
    </Badge>
  )
}
