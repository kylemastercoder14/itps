import {
  ChevronRight,
  Eye,
  HelpCircle,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"

import {
  USER_AVAILABLE_ROLES,
  USER_MANAGEMENT_USERS,
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

type UserFormPageProps = {
  mode: "create" | "update"
  userId: string
}

const ROLE_SOLID = {
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
} as const

export function UserFormPage({ mode, userId }: UserFormPageProps) {
  const user =
    USER_MANAGEMENT_USERS.find((item) => item.id === userId) ??
    USER_MANAGEMENT_USERS[0]
  const isCreate = mode === "create"
  const [firstName, ...lastNameParts] = user.name.split(" ")
  const lastName = lastNameParts.join(" ")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/users">
            <Users className="size-4 text-zinc-900" />
          </Link>
          <ChevronRight className="size-4 text-zinc-500" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">
            {isCreate ? "Add User" : "Edit User"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300">
            Cancel
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            <UserPlus className="size-4" />
            {isCreate ? "Create User" : "Update User"}
          </Button>
        </div>
      </div>
    <div className="grid gap-5 xl:grid-cols-[1fr_21rem]">
      <main className="space-y-5">
        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">User Information</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter basic details of system user.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FormField label="First Name" required>
              <Input defaultValue={isCreate ? "" : firstName} placeholder="e.g. Juan" className="h-11" />
            </FormField>
            <FormField label="Last Name" required>
              <Input defaultValue={isCreate ? "" : lastName} placeholder="e.g. Dela Cruz" className="h-11" />
            </FormField>
            <FormField label="Email Address" required>
              <Input defaultValue={isCreate ? "" : user.email} placeholder="e.g. juan.delacruz@company.com" className="h-11" />
            </FormField>
            <FormField label="Phone Number">
              <Input placeholder="e.g. 0917 123 4567" className="h-11" />
            </FormField>
            <FormField label="Username" required help="This will be used to log in to the system.">
              <Input defaultValue={isCreate ? "" : user.email.split("@")[0]} placeholder="e.g. jdelacruz" className="h-11" />
            </FormField>
            <FormField label="Employee (Optional)" help="Link this user to an existing employee record.">
              <SelectField value="employee" options={["Select employee", "Juan Dela Cruz", "Maria Santos", "Michael Tan"]} />
            </FormField>
          </div>
        </Card>

        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Account Security</h2>
          <p className="mt-1 text-sm text-slate-500">
            Set login credentials and security preferences.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <PasswordField label="Password" />
            <PasswordField label="Confirm Password" />
            <FormField label="Password Expiry" help="Require user to change password after this period.">
              <SelectField value="90-days" options={["90 days", "60 days", "30 days", "Never"]} />
            </FormField>
            <ToggleField label="Two-Factor Authentication" note="Require 2FA for this user account." />
          </div>
        </Card>

        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Role & Permissions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Assign role to define user access and permissions.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FormField label="Role" required help="Choose role that best fits user's responsibilities.">
              <SelectField value="role" options={["Select role", "Administrator", "Payroll Officer", "HR Manager", "Timekeeper", "Department Head", "Employee"]} />
            </FormField>
            <FormField label="Department (Optional)" help="Assign user to a specific department.">
              <SelectField value="department" options={["Select department", "IT Department", "Finance Department", "HR Department", "Operations"]} />
            </FormField>
            <FormField label="Position (Optional)" help="Specify user's job position or title.">
              <SelectField value="position" options={["Select position", "System Administrator", "Payroll Officer", "HR Manager"]} />
            </FormField>
          </div>
        </Card>

        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Additional Information</h2>
          <p className="mt-1 text-sm text-slate-500">
            Provide extra details about this user.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ToggleField label="Status" note="Active users can log in to system." defaultChecked={isCreate || user.status === "Active"} />
            <FormField label="User Type">
              <div className="grid gap-3 sm:grid-cols-2">
                <RadioOption title="Internal User" note="Employee or staff of company" defaultChecked />
                <RadioOption title="System User" note="For system integrations or automation" />
              </div>
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Notes (Optional)" help="Internal notes for reference only.">
                <Textarea placeholder="e.g. Additional information about this user..." className="min-h-24" />
              </FormField>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <Button variant="outline">
              <X className="size-4" />
              Cancel
            </Button>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <UserPlus className="size-4" />
              {isCreate ? "Create User" : "Update User"}
            </Button>
          </div>
        </Card>
      </main>

      <aside className="space-y-5">
        <RolePreview userRole={isCreate ? "No role selected" : user.role} />
        <AvailableRoles />
        <HelpCard />
      </aside>
    </div>
    </div>
  )
}

function RolePreview({ userRole }: { userRole: string }) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Role Preview</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-violet-100 text-violet-700">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <p className="font-bold">{userRole}</p>
          <p className="text-xs text-slate-500">Select role to see permissions</p>
        </div>
      </div>
      <div className="mt-5 space-y-4 border-t pt-5 text-sm">
        <PreviewLine label="Permissions" value="-" />
        <PreviewLine label="Access Level" value="-" />
        <PreviewLine label="Users with this role" value="-" />
      </div>
    </Card>
  )
}

function AvailableRoles() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Available Roles</h3>
      <div className="mt-5 space-y-5">
        {USER_AVAILABLE_ROLES.map((role) => (
          <div key={role.name} className="flex gap-3">
            <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-white", ROLE_SOLID[role.tone])}>
              <Users className="size-4" />
            </span>
            <div>
              <p className="font-bold text-slate-900">{role.name}</p>
              <p className="text-xs text-slate-500">{role.description}</p>
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
            Learn more about user roles and permissions.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
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

function PasswordField({ label }: { label: string }) {
  return (
    <FormField label={label} required help={label === "Password" ? "Minimum 8 characters with letters, numbers and symbols." : "Re-enter password to confirm."}>
      <div className="relative">
        <Input defaultValue="************" type="password" className="h-11 pr-10" />
        <Eye className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>
    </FormField>
  )
}

function ToggleField({
  label,
  note,
  defaultChecked = false,
}: {
  label: string
  note: string
  defaultChecked?: boolean
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <div className="flex items-center gap-3">
        <Switch defaultChecked={defaultChecked} />
        <span className="text-sm font-semibold text-slate-700">
          {defaultChecked ? "Active" : "Disabled"}
        </span>
      </div>
      <span className="text-xs text-slate-500">{note}</span>
    </div>
  )
}

function RadioOption({
  title,
  note,
  defaultChecked = false,
}: {
  title: string
  note: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
      <input defaultChecked={defaultChecked} name="user-type" type="radio" className="mt-1 accent-blue-600" />
      <span>
        <span className="block text-sm font-bold text-slate-900">{title}</span>
        <span className="text-xs text-slate-500">{note}</span>
      </span>
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
