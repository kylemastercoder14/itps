"use client"

import Link from "next/link"
import {
  Activity,
  ChevronRight,
  Download,
  Filter,
  HelpCircle,
  MoreVertical,
  PauseCircle,
  Pencil,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react"

import {
  USER_MANAGEMENT_STATS,
  USER_MANAGEMENT_USERS,
  USER_QUICK_ACTIONS,
  USER_ROLE_DISTRIBUTION,
  USER_STATUS_SUMMARY,
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

const TONE_CLASS = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  violet: "bg-violet-50 text-violet-700",
  cyan: "bg-cyan-50 text-cyan-700",
  slate: "bg-slate-100 text-slate-700",
} as const

const TONE_SOLID = {
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  violet: "bg-violet-600",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
} as const

const STAT_ICON = {
  Users,
  Activity,
  PauseCircle,
  ShieldCheck,
} as const

export function UsersOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <UserStats />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <main className="space-y-5">
          <UsersTableCard />
        </main>
        <aside className="space-y-5">
          <DonutCard title="User Summary" data={USER_ROLE_DISTRIBUTION} total="28" />
          <StatusSummary />
          <QuickActions />
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
        <Users className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">User Management</h1>
      </div>
      <Button asChild className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
        <Link href="/admin/users/create">
          <Plus className="size-4" />
          Add User
        </Link>
      </Button>
    </div>
  )
}

function UserStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {USER_MANAGEMENT_STATS.map((stat) => (
        <Card key={stat.title} className="flex min-h-[122px] flex-col justify-center rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
          <p className="w-fit border-b border-dotted border-zinc-400 text-sm font-semibold text-zinc-800">{stat.title}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">{stat.value}</p>
        </Card>
      ))}
    </section>
  )
}

function UsersTableCard() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
      <div className="flex gap-7 border-b px-5 pt-5">
        {["All Users", "Active", "Inactive", "Pending"].map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "border-b-2 pb-4 text-sm font-semibold",
              index === 0
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-slate-500 hover:text-slate-900"
            )}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="relative min-w-72 flex-1">
          <Input className="h-11 pr-10" placeholder="Search users by name, email, or username..." />
          <Users className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>
        <div className="flex flex-wrap gap-3">
          <SelectField value="all-roles" options={["All Roles", "Administrator", "Payroll Officer", "HR Manager"]} />
          <SelectField value="all-status" options={["All Status", "Active", "Inactive", "Pending"]} />
          <Button variant="outline" className="text-blue-600">
            <Filter className="size-4" />
            Filters
          </Button>
          <Button variant="outline" className="text-blue-600">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {USER_MANAGEMENT_USERS.map((user) => (
            <TableRow key={user.id} className="h-16">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className={cn("text-xs font-bold text-white", TONE_SOLID[user.tone])}>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} tone={user.tone} />
              </TableCell>
              <TableCell className="font-medium text-slate-700">{user.department}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell>
                {user.lastLogin.split("\n").map((line) => (
                  <span key={line} className="block text-sm text-slate-700">
                    {line}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="icon" className="size-8 text-blue-600">
                    <Link href={`/admin/users/${user.id}`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="size-8">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t p-5 text-sm text-slate-600">
        <span>Showing 1 to 8 of 28 users</span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <SelectField value="10" options={["10", "25", "50"]} compact />
          {["<", "1", "2", "3", ">"].map((item) => (
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

function DonutCard({
  title,
  data,
  total,
}: {
  title: string
  data: typeof USER_ROLE_DISTRIBUTION
  total: string
}) {
  const chartTotal = data.reduce((sum, item) => sum + item.value, 0)
  const gradient = data
    .reduce(
      (parts, item) => {
        const start = (parts.offset / chartTotal) * 100
        const end = ((parts.offset + item.value) / chartTotal) * 100
        parts.items.push(`${item.fill} ${start}% ${end}%`)
        parts.offset += item.value
        return parts
      },
      { offset: 0, items: [] as string[] }
    )
    .items.join(", ")

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative size-32 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-xl font-bold">{total}</span>
          </div>
        </div>
        <div className="flex-1 space-y-2 text-sm">
          {data.map((item) => (
            <div key={item.label} className="flex justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />
                {item.label}
              </span>
              <span className="font-semibold">
                {item.value} ({item.note})
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function StatusSummary() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Users by Status</h3>
      <div className="mt-5 space-y-4">
        {USER_STATUS_SUMMARY.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="flex items-center gap-2 text-sm">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              {item.label}
            </span>
            <span className="font-bold">
              {item.value} ({item.note})
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function QuickActions() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4">
        {USER_QUICK_ACTIONS.map((item) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <Plus className="size-4" />
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
            Learn more about user management and permissions.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  )
}

function RoleBadge({ role, tone }: { role: string; tone: keyof typeof TONE_CLASS }) {
  return (
    <Badge variant="secondary" className={TONE_CLASS[tone]}>
      {role}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Pending"
        ? "bg-orange-50 text-orange-700"
        : "bg-red-50 text-red-700"

  return (
    <Badge variant="secondary" className={tone}>
      {status}
    </Badge>
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
      <SelectTrigger className={cn("h-11", compact ? "w-20" : "w-40")}>
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
