import { ArrowRight, Check, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";

import {
  POSITION_FORM_OPTIONS,
  POSITION_LIST_DATA,
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

type PositionFormPageProps = {
  positionId: string;
  mode: "create" | "update";
};

type FieldProps = {
  label: string;
  help?: string;
  children: React.ReactNode;
};

export function PositionFormPage({ positionId, mode }: PositionFormPageProps) {
  const position =
    POSITION_LIST_DATA.find((item) => item.id === positionId) ??
    POSITION_LIST_DATA[0];
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
              href="/admin/employees/positions"
              className="text-lg font-bold tracking-tight text-zinc-900"
            >
              Positions
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              {isCreate ? "Add Position" : "Edit Position"}
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
            {isCreate ? "Save Position" : "Update Position"}
          </Button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Position Title"
              help="e.g., Software Developer, HR Manager"
            >
              <Input
                defaultValue={isCreate ? "" : position.title}
                placeholder="Enter position title"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Position Code"
              help="Unique code for this position (e.g., DEV001)"
            >
              <Input
                defaultValue={isCreate ? "" : position.code}
                placeholder="Enter position code"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Department"
              help="Choose the department this position belongs to"
            >
              <Select defaultValue={isCreate ? undefined : position.department}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {POSITION_FORM_OPTIONS.departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Employment Type"
              help="e.g., Full-time, Part-time, Contract"
            >
              <Select defaultValue={isCreate ? undefined : position.type}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {POSITION_FORM_OPTIONS.employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Reports To (Position)"
              help="Select the position this role reports to"
            >
              <Select defaultValue={isCreate ? undefined : position.reportsTo}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select position (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {POSITION_FORM_OPTIONS.reportsTo.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Job Grade / Level" help="e.g., Grade 5, Level 2">
              <Input
                defaultValue={isCreate ? "" : position.grade}
                placeholder="Enter grade or level (optional)"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
          </div>
          <FormField
            label="Position Description"
            help="Describe main purpose and responsibilities of this position"
          >
            <Textarea
              placeholder="Enter position description"
              className="min-h-24 rounded-sm text-xs! border-slate-200"
            />
          </FormField>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-950">
              Compensation & Benefits
            </h2>
            <div className="mt-4 mb-4 grid gap-5 md:grid-cols-2">
              <FormField
                label="Salary Grade (Optional)"
                help="Choose salary grade or range"
              >
                <Select>
                  <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                    <SelectValue placeholder="Select salary grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITION_FORM_OPTIONS.salaryGrades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField
                label="Salary Range (Optional)"
                help="Enter monthly salary range"
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Input
                    placeholder="Min Salary"
                    className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
                  />
                  <span className="text-slate-500">-</span>
                  <Input
                    placeholder="Max Salary"
                    className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
                  />
                </div>
              </FormField>
            </div>
            <ToggleField
              label="Allow Overtime"
              help="Enable if overtime is applicable"
              defaultChecked
            />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-950">Settings</h2>
            <div className="mt-4 mb-4 grid gap-5 md:grid-cols-2">
              <FormField
                label="Position Status"
                help="Set current status of this position"
              >
                <Select defaultValue={isCreate ? "Active" : position.status}>
                  <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITION_FORM_OPTIONS.statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField
                label="Headcount"
                help="Number of employees for this position"
              >
                <Input
                  defaultValue={isCreate ? "1" : String(position.employees)}
                  className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
                />
              </FormField>
            </div>
            <ToggleField
              label="Allow Multiple Incumbents"
              help="Enable if multiple employees can hold this position"
            />
          </div>
        </Card>
        <PositionFormSidebar />
      </div>
    </div>
  );
}

function FormField({ label, help, children }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-slate-800">{label}</span>
      {children}
      {help ? <span className="text-[10px] text-slate-500">{help}</span> : null}
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

function PositionFormSidebar() {
  return (
    <div className="space-y-5">
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="flex items-center gap-2 font-semibold text-sm">
          <Info className="size-3.5" />
          Position Guidelines
        </h3>
        <ul className="space-y-3 text-xs text-slate-600">
          {[
            "Use a clear and standard position title.",
            "Position code must be unique.",
            "Assign to the correct department.",
            "Provide detailed description of responsibilities.",
            "Set appropriate headcount and reporting structure.",
            "Review compensation settings if applicable.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="text-sm flex items-center gap-2 font-semibold">
          <Lightbulb className="size-3.5" />
          Tip
        </h3>
        <p className="text-xs text-slate-600">
          Learn more about creating and managing positions.
        </p>
        <Button variant="outline" size="sm" className="text-xs">
          View User Guide
          <ArrowRight className="size-3.5" />
        </Button>
      </Card>
    </div>
  );
}
