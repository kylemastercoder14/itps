import {
  ChevronRight,
  HelpCircle,
  Plus,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

import {
  ROLE_MANAGEMENT_ROLES,
  ROLE_PERMISSION_SUMMARY,
  ROLE_QUICK_ACTIONS,
} from "@/constants/admin-dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PermissionsTable } from "./roles-overview";
import { IconShieldCheckFilled } from "@tabler/icons-react";

type RoleFormPageProps = {
  roleId: string;
  mode: "create" | "update";
};

const TONE_SOLID = {
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
} as const;

const SUMMARY_TONE = {
  cyan: "bg-cyan-50 text-cyan-700",
  green: "bg-emerald-50 text-emerald-700",
  violet: "bg-violet-50 text-violet-700",
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-700",
  orange: "bg-orange-50 text-orange-700",
} as const;

export function RoleFormPage({ roleId, mode }: RoleFormPageProps) {
  const role =
    ROLE_MANAGEMENT_ROLES.find((item) => item.id === roleId) ??
    ROLE_MANAGEMENT_ROLES[0];
  const isCreate = mode === "create";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/users/roles">
            <IconShieldCheckFilled className="size-4 text-zinc-900" />
          </Link>
          <ChevronRight className="size-4 text-zinc-500" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">
            {isCreate ? "Add Role" : "Edit Role"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            Cancel
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            {isCreate ? "Create Role" : "Update Role"}
          </Button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_21rem]">
        <main className="space-y-5">
          <Card className="rounded-xl gap-0! border-zinc-200 px-5 py-4 shadow-xs">
            <h1 className="font-bold text-slate-950">Role Information</h1>
            <p className="mt-1 text-xs text-slate-500">
              Enter basic details of role.
            </p>
            <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
              <FormField label="Role Name" required>
                <Input
                  defaultValue={isCreate ? "" : role.name}
                  placeholder="e.g., Finance Manager"
                  className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
                />
              </FormField>
              <FormField
                label="Role Code"
                required
                help="Unique code for this role"
              >
                <Input
                  defaultValue={
                    isCreate ? "" : role.id.toUpperCase().replaceAll("-", "_")
                  }
                  placeholder="e.g., FIN_MANAGER"
                  className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
                />
              </FormField>
              <div className="md:col-span-2">
                <FormField
                  label="Description"
                  help="Provide a clear description of what this role does"
                >
                  <Textarea
                    defaultValue={isCreate ? "" : role.description}
                    placeholder="e.g., Manages financial operations, payroll, and reports"
                    className="min-h-24 text-xs!"
                  />
                </FormField>
              </div>
              <FormField label="Role Category">
                <SelectField
                  value="category"
                  options={[
                    "Select category",
                    "Administrative",
                    "Payroll",
                    "HR",
                    "Department",
                  ]}
                />
              </FormField>
            </div>
            <div className="grid mt-3 gap-2">
              <span className="text-xs font-semibold text-slate-800">
                Status
              </span>
              <div className="flex items-center gap-3">
                <Switch defaultChecked={isCreate || role.status === "Active"} />
                <span className="text-xs font-semibold">Active</span>
              </div>
              <span className="text-xs text-slate-500">
                Inactive roles cannot be assigned to users
              </span>
            </div>
          </Card>

          <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Assign Permissions</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select permissions available for this role.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-xs">
                  Expand All
                </Button>
                <Button variant="outline" className="text-xs">
                  Deselect All
                </Button>
              </div>
            </div>
            <PermissionsTable />
          </Card>

          <Card className="rounded-xl gap-0! border-zinc-100 bg-zinc-50 px-5 py-4 shadow-xs">
            <h3 className="font-bold">About Permissions</h3>
            <p className="mt-1 text-xs">
              These permissions control what actions users in this role can
              perform across system.
            </p>
          </Card>
        </main>
        <aside className="space-y-5">
          <RoleSummaryCard role={role} isCreate={isCreate} />
          <PermissionSummaryCard />
        </aside>
      </div>
    </div>
  );
}

function RoleSummaryCard({
  role,
  isCreate,
}: {
  role: (typeof ROLE_MANAGEMENT_ROLES)[number];
  isCreate: boolean;
}) {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Role Summary</h3>
      <div className="flex items-center gap-3">
        <div>
          <p className="font-bold">{isCreate ? "New Role" : role.name}</p>
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        </div>
      </div>
      <div className="space-y-4 border-t pt-5 text-xs">
        <PreviewLine label="Role Name" value={isCreate ? "-" : role.name} />
        <PreviewLine
          label="Role Code"
          value={isCreate ? "-" : role.id.toUpperCase().replaceAll("-", "_")}
        />
        <PreviewLine label="Category" value="-" />
        <PreviewLine
          label="Description"
          value={isCreate ? "-" : role.description}
        />
        <PreviewLine label="Permissions" value="0 selected" />
      </div>
    </Card>
  );
}

function PermissionSummaryCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Permission Summary</h3>
      <div className="space-y-3.5">
        {ROLE_PERMISSION_SUMMARY.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">
                {item.label}
              </span>
            </span>
            <span className="font-bold text-xs">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
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
  );
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
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FormField({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-slate-800"></span>
      {children}
      {help ? <span className="text-[10px] text-slate-500">{help}</span> : null}
    </label>
  );
}

function PreviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-9 w-full text-xs">
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
  );
}
