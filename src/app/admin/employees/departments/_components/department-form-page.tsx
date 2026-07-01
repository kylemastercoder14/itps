import { ArrowRight, Check, CloudUpload, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";

import {
  DEPARTMENT_FORM_OPTIONS,
  DEPARTMENT_LIST_DATA,
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
import { Textarea } from "@/components/ui/textarea";

type DepartmentFormPageProps = {
  departmentId: string;
  mode: "create" | "update";
};

type FormFieldProps = {
  label: string;
  help?: string;
  children: React.ReactNode;
};

export function DepartmentFormPage({
  departmentId,
  mode,
}: DepartmentFormPageProps) {
  const department =
    DEPARTMENT_LIST_DATA.find((item) => item.id === departmentId) ??
    DEPARTMENT_LIST_DATA[0];
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
            <Link href="/admin/employees/departments" className="text-lg font-bold tracking-tight text-zinc-900">
              Departments
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              {isCreate ? "Add Department" : "Edit Department"}
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
            {isCreate ? "Save Department" : "Update Department"}
          </Button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Department Name" help="e.g., Human Resources">
              <Input
                defaultValue={isCreate ? "" : department.name}
                placeholder="Enter department name"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Department Code"
              help="Unique code for this department (e.g., HR)"
            >
              <Input
                defaultValue={isCreate ? "" : department.id.toUpperCase()}
                placeholder="Enter department code"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Department Head"
              help="Select the head or manager of this department"
            >
              <Select defaultValue={isCreate ? undefined : department.head}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Search and select department head" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_FORM_OPTIONS.heads.map((head) => (
                    <SelectItem key={head} value={head}>
                      {head}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Parent Department"
              help="Choose a parent department if applicable"
            >
              <Select>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select parent department (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_FORM_OPTIONS.parents.map((parent) => (
                    <SelectItem key={parent} value={parent}>
                      {parent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Status" help="Select department status">
              <Select defaultValue={isCreate ? "Active" : department.status}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_FORM_OPTIONS.statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Department Type"
              help="e.g., Operational, Support, Administrative"
            >
              <Select>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue placeholder="Select department type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_FORM_OPTIONS.types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField
              label="Budget Code (Optional)"
              help="Budget or cost center code associated with this department"
            >
              <Input
                placeholder="Enter budget code"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField
              label="Location (Optional)"
              help="Main location or office of this department"
            >
              <Input
                placeholder="Enter location"
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
          </div>
          <FormField
            label="Description"
            help="Briefly describe purpose and responsibilities of this department"
          >
            <Textarea
              defaultValue={isCreate ? "" : department.description}
              placeholder="Enter department description"
              className="min-h-24 rounded-sm text-xs! border-slate-200"
            />
          </FormField>
          <div>
            <FormField label="Attachments (Optional)">
              <button className="flex min-h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-600">
                <CloudUpload className="size-5 mb-2" />
                <span>
                  Drag and drop files here, or{" "}
                  <span className="font-semibold">click to browse</span>
                </span>
                <span className="mt-1 text-[10px] text-slate-500">
                  Upload organizational charts, documents, or related files
                  (PDF, PNG, JPG - Max 5MB)
                </span>
              </button>
            </FormField>
          </div>
        </Card>
        <DepartmentFormSidebar />
      </div>
    </div>
  );
}

function FormField({ label, help, children }: FormFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      {children}
      {help ? <span className="text-[10px] text-slate-500">{help}</span> : null}
    </label>
  );
}

function DepartmentFormSidebar() {
  return (
    <div className="space-y-5">
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="flex items-center gap-2 font-semibold text-sm">
          <Info className="size-3.5" />
          Department Guidelines
        </h3>
        <ul className="space-y-3 text-xs text-slate-600">
          {[
            "Department name should be clear and descriptive.",
            "Department code must be unique and easy to remember.",
            "Assign a department head to ensure proper management.",
            "Use parent departments to maintain organization structure.",
            "Provide a description to help others understand department role.",
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
          You can manage department heads and structure anytime after creating
          department.
        </p>
        <Button variant="outline" size="sm" className="text-xs">
          Manage Department Heads
          <ArrowRight className="size-3.5" />
        </Button>
      </Card>
    </div>
  );
}
