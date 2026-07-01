"use client"

import { Fragment } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react"

import {
  ROLE_COLLAPSED_MODULES,
  ROLE_MANAGEMENT_ROLES,
  ROLE_PERMISSION_MODULES,
  ROLE_QUICK_ACTIONS,
  USER_ROLE_DISTRIBUTION,
} from "@/constants/admin-dashboard"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const TONE_SOLID = {
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
} as const

export function RolesOverview() {
  const selectedRole = ROLE_MANAGEMENT_ROLES[0]

  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <main className="space-y-5">
          <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
          <div className="flex gap-7 border-b">
            {["Roles", "Permissions", "Permission Groups"].map((tab, index) => (
              <button
                key={tab}
                className={cn(
                  "border-b-2 pb-4 text-sm font-semibold",
                  index === 0 ? "border-zinc-900 text-zinc-950" : "border-transparent text-slate-500"
                )}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap justify-between gap-3">
            <div className="relative min-w-72">
              <Input className="h-11 pr-10" placeholder="Search roles..." />
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="flex gap-3">
              <SelectField value="all-status" options={["All Status", "Active", "Inactive"]} />
              <Button variant="outline" className="text-blue-600">
                <Filter className="size-4" />
                Filters
              </Button>
            </div>
          </div>
        </Card>
        <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
          <RolesList />
          <PermissionsPanel role={selectedRole} />
        </div>
        </main>
        <aside className="space-y-5">
          <RoleSummary />
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
        <ShieldCheck className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">Roles & Permissions</h1>
      </div>
      <Button asChild className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
        <Link href="/admin/users/roles/create">
          <Plus className="size-4" />
          Add Role
        </Link>
      </Button>
    </div>
  )
}

function RolesList() {
  return (
    <Card className="rounded-lg border-slate-200 p-4 shadow-sm">
      <h2 className="font-bold">Roles (7)</h2>
      <div className="mt-4 space-y-3">
        {ROLE_MANAGEMENT_ROLES.map((role, index) => (
          <Link
            key={role.id}
            href={`/admin/users/roles/${role.id}`}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3",
              index === 0 ? "border-blue-500 bg-blue-50/40" : "border-slate-200"
            )}
          >
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full text-white", TONE_SOLID[role.tone])}>
              <ShieldCheck className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{role.name}</p>
              <p className="text-xs text-slate-500">{role.users} users</p>
            </div>
            <StatusBadge status={role.status} />
          </Link>
        ))}
      </div>
      <p className="mt-8 text-xs text-slate-500">Showing 1 to 7 of 7 roles</p>
    </Card>
  )
}

function PermissionsPanel({ role }: { role: (typeof ROLE_MANAGEMENT_ROLES)[number] }) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <span className={cn("flex size-14 items-center justify-center rounded-full text-white", TONE_SOLID[role.tone])}>
            <ShieldCheck className="size-7" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{role.name}</h2>
              <StatusBadge status={role.status} />
            </div>
            <p className="mt-1 text-sm text-slate-600">{role.description}</p>
            <p className="mt-2 text-sm font-semibold text-blue-700">{role.users} users assigned</p>
          </div>
        </div>
        <Button asChild variant="outline" size="icon" className="text-blue-600">
          <Link href={`/admin/users/roles/${role.id}`}>
            <Pencil className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-bold">Role Permissions</h3>
        <Button variant="ghost" className="text-blue-600">Expand All</Button>
      </div>
      <PermissionsTable />
    </Card>
  )
}

export function PermissionsTable() {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Module / Permission</TableHead>
            <TableHead className="text-center">View</TableHead>
            <TableHead className="text-center">Add</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">Delete</TableHead>
            <TableHead className="text-center">Export</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROLE_PERMISSION_MODULES.map((module) => (
            <Fragment key={module.module}>
              <TableRow className="bg-slate-50/70">
                <TableCell colSpan={6} className="font-bold">{module.module}</TableCell>
              </TableRow>
              {module.rows.map((row) => (
                <TableRow key={`${module.module}-${row.permission}`}>
                  <TableCell className="pl-8 text-sm">{row.permission}</TableCell>
                  <PermissionCell checked={row.view} />
                  <PermissionCell checked={row.add} />
                  <PermissionCell checked={row.edit} />
                  <PermissionCell checked={row.delete} />
                  <PermissionCell checked={row.export} />
                </TableRow>
              ))}
            </Fragment>
          ))}
          {ROLE_COLLAPSED_MODULES.map((module) => (
            <TableRow key={module} className="bg-slate-50/70">
              <TableCell colSpan={6} className="font-bold">{module}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function RoleSummary() {
  const total = USER_ROLE_DISTRIBUTION.reduce((sum, item) => sum + item.value, 0)
  let offset = 0
  const gradient = USER_ROLE_DISTRIBUTION.map((item) => {
    const start = (offset / total) * 100
    offset += item.value
    const end = (offset / total) * 100
    return `${item.fill} ${start}% ${end}%`
  }).join(", ")

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Role Summary</h3>
      <div className="mt-5 flex items-center gap-5">
        <div className="relative size-28 rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="absolute inset-7 rounded-full bg-white" />
        </div>
        <div className="flex-1 space-y-2 text-sm">
          {USER_ROLE_DISTRIBUTION.map((item) => (
            <div key={item.label} className="flex justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />
                {item.label}
              </span>
              <span className="font-bold">{item.value} ({item.note})</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 border-t pt-5">
        <div>
          <p className="text-sm text-slate-500">Total Roles</p>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Active Roles</p>
          <p className="text-2xl font-bold text-emerald-600">6</p>
        </div>
      </div>
    </Card>
  )
}

function QuickActions() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4">
        {ROLE_QUICK_ACTIONS.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              {index === 3 ? <Download className="size-4" /> : index === 4 ? <FileText className="size-4" /> : <Plus className="size-4" />}
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
            Learn more about roles and permissions and how to manage access control.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">View Help Center</Button>
        </div>
      </div>
    </Card>
  )
}

function PermissionCell({ checked }: { checked: boolean }) {
  return (
    <TableCell className="text-center">
      {checked ? <Checkbox defaultChecked /> : <span className="text-slate-400">-</span>}
    </TableCell>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}
    >
      {status}
    </Badge>
  )
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-44">
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
