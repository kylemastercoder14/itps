import {
  ChevronRight,
  HelpCircle,
  Plus,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"

import {
  ROLE_MANAGEMENT_ROLES,
  ROLE_PERMISSION_SUMMARY,
  ROLE_QUICK_ACTIONS,
} from "@/constants/admin-dashboard"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { PermissionsTable } from "./roles-overview"

type RoleFormPageProps = {
  roleId: string
  mode: "create" | "update"
}

const TONE_SOLID = {
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
} as const

const SUMMARY_TONE = {
  cyan: "bg-cyan-50 text-cyan-700",
  green: "bg-emerald-50 text-emerald-700",
  violet: "bg-violet-50 text-violet-700",
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-700",
  orange: "bg-orange-50 text-orange-700",
} as const

export function RoleFormPage({ roleId, mode }: RoleFormPageProps) {
  const role =
    ROLE_MANAGEMENT_ROLES.find((item) => item.id === roleId) ??
    ROLE_MANAGEMENT_ROLES[0]
  const isCreate = mode === "create"

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/users/roles">
            <ShieldCheck className="size-4 text-zinc-900" />
          </Link>
          <ChevronRight className="size-4 text-zinc-500" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">
            {isCreate ? "Add Role" : "Edit Role"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300">
            Cancel
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            <Users className="size-4" />
            {isCreate ? "Create Role" : "Update Role"}
          </Button>
        </div>
      </div>
    <div className="grid gap-5 xl:grid-cols-[1fr_21rem]">
      <main className="space-y-5">
        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <h1 className="font-bold text-slate-950">Role Information</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter basic details of role.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FormField label="Role Name" required>
              <Input defaultValue={isCreate ? "" : role.name} placeholder="e.g., Finance Manager" className="h-11" />
            </FormField>
            <FormField label="Role Code" required help="Unique code for this role">
              <Input defaultValue={isCreate ? "" : role.id.toUpperCase().replaceAll("-", "_")} placeholder="e.g., FIN_MANAGER" className="h-11" />
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Description" help="Provide a clear description of what this role does">
                <Textarea defaultValue={isCreate ? "" : role.description} placeholder="e.g., Manages financial operations, payroll, and reports" className="min-h-24" />
                <p className="mt-1 text-right text-xs text-slate-500">0/255</p>
              </FormField>
            </div>
            <FormField label="Role Category">
              <SelectField value="category" options={["Select category", "Administrative", "Payroll", "HR", "Department"]} />
            </FormField>
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Status</span>
              <div className="flex items-center gap-3">
                <Switch defaultChecked={isCreate || role.status === "Active"} />
                <span className="text-sm font-semibold text-emerald-700">Active</span>
              </div>
              <span className="text-xs text-slate-500">Inactive roles cannot be assigned to users</span>
            </div>
          </div>
        </Card>

        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Assign Permissions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select permissions available for this role.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-blue-600">Expand All</Button>
              <Button variant="outline" className="text-blue-600">Deselect All</Button>
            </div>
          </div>
          <PermissionsTable />
        </Card>

        <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 text-blue-800 shadow-sm">
          <h3 className="font-bold">About Permissions</h3>
          <p className="mt-2 text-sm">
            These permissions control what actions users in this role can perform across system.
          </p>
        </Card>

        <div className="flex flex-wrap justify-between gap-3">
          <Button variant="outline">
            <X className="size-4" />
            Cancel
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Users className="size-4" />
            {isCreate ? "Create Role" : "Update Role"}
          </Button>
        </div>
      </main>
      <aside className="space-y-5">
        <RoleSummaryCard role={role} isCreate={isCreate} />
        <PermissionSummaryCard />
        <QuickActionsCard />
        <HelpCard />
      </aside>
    </div>
    </div>
  )
}

function RoleSummaryCard({
  role,
  isCreate,
}: {
  role: (typeof ROLE_MANAGEMENT_ROLES)[number]
  isCreate: boolean
}) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Role Summary</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className={cn("flex size-11 items-center justify-center rounded-full text-white", TONE_SOLID[role.tone])}>
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <p className="font-bold">{isCreate ? "New Role" : role.name}</p>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">Active</span>
        </div>
      </div>
      <div className="mt-5 space-y-4 border-t pt-5 text-sm">
        <PreviewLine label="Role Name" value={isCreate ? "-" : role.name} />
        <PreviewLine label="Role Code" value={isCreate ? "-" : role.id.toUpperCase().replaceAll("-", "_")} />
        <PreviewLine label="Category" value="-" />
        <PreviewLine label="Description" value={isCreate ? "-" : role.description} />
        <PreviewLine label="Permissions" value="0 selected" />
      </div>
    </Card>
  )
}

function PermissionSummaryCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Permission Summary</h3>
      <div className="mt-5 space-y-4">
        {ROLE_PERMISSION_SUMMARY.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <span className={cn("flex size-8 items-center justify-center rounded-full", SUMMARY_TONE[item.tone])}>
                <ShieldCheck className="size-4" />
              </span>
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </span>
            <span className="font-bold">{item.value}</span>
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
        {ROLE_QUICK_ACTIONS.slice(1, 4).map((item) => (
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
            Learn more about roles, permissions, and access control.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">View Help Center</Button>
        </div>
      </div>
    </Card>
  )
}

function FormField({
  label,
  required,
  help,
  children,
}: {
  label: string
  required?: boolean
  help?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
      {help ? <span className="text-xs text-slate-500">{help}</span> : null}
    </label>
  )
}

function PreviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-full">
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
