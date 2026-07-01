import {
  ArrowRight,
  Check,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";

import {
  EMPLOYMENT_STATUS_FORM_OPTIONS,
  EMPLOYMENT_STATUS_LIST_DATA,
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

type EmploymentStatusFormPageProps = {
  statusId: string;
  mode: "create" | "update";
};

type FieldProps = {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
};

const COLOR_OPTIONS = [
  "bg-emerald-500",
  "bg-blue-600",
  "bg-indigo-500",
  "bg-violet-600",
  "bg-orange-500",
  "bg-lime-500",
  "bg-cyan-600",
  "bg-red-500",
  "bg-pink-400",
  "bg-slate-500",
];

export function EmploymentStatusFormPage({
  statusId,
  mode,
}: EmploymentStatusFormPageProps) {
  const status =
    EMPLOYMENT_STATUS_LIST_DATA.find((item) => item.id === statusId) ??
    EMPLOYMENT_STATUS_LIST_DATA[0];
  const isCreate = mode === "create";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/employees">
            <IconUserFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <Link
              href="/admin/employees/status"
              className="text-lg font-bold tracking-tight text-zinc-900"
            >
              Employment Status
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              {isCreate ? "Add Status" : "Edit Status"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            Cancel
          </Button>
          <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
            {isCreate ? "Save Status" : "Update Status"}
          </Button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Status Name"
              required
              help="e.g., Active, Probation, On Leave"
            >
              <Input
                defaultValue={isCreate ? "" : status.name}
                placeholder="Enter status name"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Status Code"
              required
              help="Unique code for this status (e.g., ACTIVE)"
            >
              <Input
                defaultValue={isCreate ? "" : status.code}
                placeholder="Enter status code"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Status Type"
              required
              help="Choose the category this status belongs to"
            >
              <Select defaultValue={isCreate ? undefined : status.type}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select status type" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_STATUS_FORM_OPTIONS.types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Status Category"
              help="Additional grouping for better organization"
            >
              <Select defaultValue={isCreate ? undefined : status.category}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_STATUS_FORM_OPTIONS.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Color"
              help="Choose a color to represent this status in the system"
            >
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((color, index) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "flex size-7.5 items-center justify-center rounded-full text-white ring-offset-2",
                      color,
                      index === 0 && "ring-2 ring-emerald-500",
                    )}
                  >
                    {index === 0 ? <Check className="size-4" /> : null}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField
              label="Icon (Optional)"
              help="Choose an icon to represent this status"
            >
              <Select defaultValue={isCreate ? undefined : status.icon}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_STATUS_FORM_OPTIONS.icons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <ToggleField
            label="Default Status"
            help="Set as default status for new employees"
          />
          <FormField
            label="Description"
            help="Provide a clear description of this employment status"
          >
            <Textarea
              defaultValue={isCreate ? "" : status.description}
              placeholder="Enter status description"
              className="min-h-24 rounded-sm text-xs! border-slate-200"
            />
          </FormField>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-950">
              Status Settings
            </h2>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              <ToggleField
                label="Is Active"
                help="Enable this status for use in system"
                defaultChecked
              />
              <ToggleField
                label="Allow Employee Assignment"
                help="Allow employees to be assigned this status"
                defaultChecked
              />
              <ToggleField
                label="Affects Payroll"
                help="Include employees with this status in payroll"
              />
            </div>
          </div>
        </Card>
        <StatusFormSidebar />
      </div>
    </div>
  );
}

function FormField({ label, required, help, children }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
      {help ? <span className="text-xs text-slate-500">{help}</span> : null}
    </label>
  );
}

function ToggleField({
  label,
  help,
  defaultChecked,
}: {
  label: string;
  help: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="grid gap-3">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <Switch
        defaultChecked={defaultChecked}
        className="data-checked:bg-emerald-500"
      />
      <span className="text-xs text-slate-500">{help}</span>
    </div>
  );
}

function StatusFormSidebar() {
  return (
    <div className="space-y-5">
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="font-bold">Status Type Guide</h3>
        <GuideBadge
          label="Active"
          className="bg-emerald-50 text-emerald-700"
          text="Regular employment statuses for active workforce"
        />
        <GuideBadge
          label="Inactive"
          className="bg-orange-50 text-orange-700"
          text="Temporary or non-active employment statuses"
        />
        <GuideBadge
          label="Archived"
          className="bg-violet-50 text-violet-700"
          text="Historical statuses no longer in use"
        />
      </Card>
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="text-sm flex items-center gap-2 font-semibold">
          <Lightbulb className="size-3.5" />
          Tip
        </h3>
        <p className="text-xs text-slate-600">
          You can manage employment status by creating it dynamically.
        </p>
        <Button variant="outline" size="sm" className="text-xs">
          Manage Employment Status
          <ArrowRight className="size-3.5" />
        </Button>
      </Card>
    </div>
  );
}

function GuideBadge({
  label,
  text,
  className,
}: {
  label: string;
  text: string;
  className: string;
}) {
  return (
    <div>
      <span
        className={cn("rounded-md px-2 py-1 text-xs font-semibold", className)}
      >
        {label}
      </span>
      <p className="mt-1.5 text-xs text-slate-600">{text}</p>
    </div>
  );
}
