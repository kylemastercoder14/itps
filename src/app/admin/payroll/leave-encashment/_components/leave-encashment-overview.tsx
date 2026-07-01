"use client"

import {
  ChevronRight,
  Eye,
  FileText,
  HelpCircle,
  MoreVertical,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import {
  LEAVE_ENCASHMENT_BREAKDOWN_DATA,
  LEAVE_ENCASHMENT_KPI_DATA,
  LEAVE_ENCASHMENT_SUMMARY_DATA,
  LEAVE_ENCASHMENT_TABLE_DATA,
} from "@/constants/admin-dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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

export function LeaveEncashmentOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <EncashmentKpis />
        <EncashmentTableCard />
      </div>
      <aside className="space-y-5">
        <SummaryCard />
        <BreakdownCard />
        <QuickActionsCard />
        <HelpCard />
      </aside>
      </div>
    </div>
  )
}

function EncashmentKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {LEAVE_ENCASHMENT_KPI_DATA.map((item) => (
        <MetricCard key={item.title} title={item.title} value={item.value} note={item.note} />
      ))}
    </section>
  )
}

function EncashmentTableCard() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 pt-4">
        <div className="flex gap-8">
          {["All Requests", "Pending Approval", "Approved", "Paid", "Rejected"].map((tab, index) => (
            <button key={tab} className={cn("border-b-2 px-1 pb-4 text-sm font-semibold", index === 0 ? "border-zinc-900 text-zinc-950" : "border-transparent text-slate-500")} type="button">
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-2 pb-4">
          <Button variant="secondary" className="rounded-lg bg-zinc-200 text-zinc-800 hover:bg-zinc-300">Export</Button>
          <Button className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"><Plus className="size-4" />New Encashment Request</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-b p-5">
        <div className="relative min-w-72">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="h-10 pr-9" placeholder="Search employee name or ID..." />
        </div>
        <FilterSelect value="all-departments" options={["All Departments", "Information Technology", "Human Resources", "Finance"]} />
        <FilterSelect value="all-statuses" options={["All Statuses", "Approved", "Pending", "Paid", "Rejected"]} />
        <FilterSelect value="all-leave-types" options={["All Leave Types", "Vacation Leave", "Sick Leave", "Maternity Leave"]} />
        <Button variant="outline" className="ml-auto h-10 min-w-48 justify-start text-slate-500">May 1 - May 31, 2026</Button>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Leave Balance (Days)</TableHead>
            <TableHead>Encashment Days</TableHead>
            <TableHead>Amount (₱)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAVE_ENCASHMENT_TABLE_DATA.map((item) => (
            <TableRow key={`${item.employeeId}-${item.requestDate}`} className="h-16">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.employee}</p>
                    <p className="text-xs text-slate-500">{item.employeeId}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.leaveType}</TableCell>
              <TableCell>{item.balance}</TableCell>
              <TableCell>{item.days}</TableCell>
              <TableCell className="font-bold">{item.amount}</TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell>{item.requestDate}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="size-8"><Eye className="size-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t p-4 text-sm text-slate-600">
        <span>Showing 1 to 10 of 28 encashment requests</span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger className="h-9 w-20"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="10">10</SelectItem></SelectContent>
          </Select>
          {["<", "1", "2", "3", "...", ">"].map((item) => (
            <Button key={item} variant={item === "1" ? "default" : "outline"} size="icon" className={cn("size-9", item === "1" && "bg-zinc-900 text-white hover:bg-zinc-800")}>{item}</Button>
          ))}
        </div>
      </div>
    </Card>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <FileText className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">Leave Encashment</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="rounded-lg bg-zinc-200 text-zinc-800 hover:bg-zinc-300">Export</Button>
        <Button className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"><Plus className="size-4" />New Encashment Request</Button>
      </div>
    </div>
  )
}

function MetricCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <Card className="flex min-h-[122px] flex-col justify-center rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
      <p className="w-fit border-b border-dotted border-zinc-400 text-sm font-semibold text-zinc-800">{title}</p>
      <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{note}</p>
    </Card>
  )
}

function FilterSelect({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-10 w-44"><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={option} value={index === 0 ? value : option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SummaryCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Encashment Summary (This Year)</h3>
      <div className="mt-5 space-y-4 text-sm">
        {LEAVE_ENCASHMENT_SUMMARY_DATA.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <span className="text-slate-600">{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function BreakdownCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Leave Type Breakdown</h3>
      <div className="relative mt-4">
        <ChartContainer config={{ value: { label: "Days" } }} className="mx-auto h-44 aspect-square">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={LEAVE_ENCASHMENT_BREAKDOWN_DATA} dataKey="value" nameKey="name" innerRadius={44} outerRadius={64}>
              {LEAVE_ENCASHMENT_BREAKDOWN_DATA.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="space-y-2 text-sm">
        {LEAVE_ENCASHMENT_BREAKDOWN_DATA.map((item) => (
          <div key={item.name} className="flex justify-between gap-3">
            <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />{item.name} ({item.value.toFixed(2)})</span>
            <span className="font-semibold">{item.note}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function QuickActionsCard() {
  const actions = [
    ["New Encashment Request", "Create new leave encashment request"],
    ["Encashment Settings", "Configure encashment rules"],
    ["View Encashment History", "View all encashment records"],
    ["Leave Type Balance", "View leave balances report"],
  ] as const

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4 text-sm">
        {actions.map(([title, note]) => (
          <div key={title} className="flex gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              {title === "Encashment Settings" ? <Settings className="size-4" /> : <FileText className="size-4" />}
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

function HelpCard() {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="size-5 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-700">Learn more about leave encashment</p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">View Help Center</Button>
        </div>
      </div>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "Approved" && "bg-emerald-50 text-emerald-700",
        status === "Pending" && "bg-amber-50 text-amber-700",
        status === "Paid" && "bg-blue-50 text-blue-700",
        status === "Rejected" && "bg-red-50 text-red-700"
      )}
    >
      {status}
    </Badge>
  )
}
