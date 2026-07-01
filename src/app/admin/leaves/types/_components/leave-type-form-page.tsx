import { CheckCircle2, CircleHelp, Info, Plane } from "lucide-react";
import Link from "next/link";
import { IconCalendarFilled, IconChevronRight } from "@tabler/icons-react";

import {
  LEAVE_TYPE_FORM_OPTIONS,
  LEAVE_TYPE_LIST_DATA,
} from "@/constants/admin-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type LeaveTypeFormPageProps = {
  mode: "create" | "update";
  typeId: string;
};

type FieldProps = {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
};

export function LeaveTypeFormPage({ mode, typeId }: LeaveTypeFormPageProps) {
  const isCreate = mode === "create";
  const leaveType =
    LEAVE_TYPE_LIST_DATA.find((item) => item.id === typeId) ??
    LEAVE_TYPE_LIST_DATA[0];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/leaves">
            <IconCalendarFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <Link
              href="/admin/leaves/types"
              className="text-lg font-bold tracking-tight text-zinc-900"
            >
              Leave Types
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              {isCreate ? "Add Leave Type" : "Edit Leave Type"}
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
            {isCreate ? "Save Leave Type" : "Update Leave Type"}
          </Button>
        </div>
      </div>
      <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Leave Type Name" required>
            <Input
              defaultValue={isCreate ? "" : leaveType.name}
              placeholder="e.g., Vacation Leave"
              className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
            />
          </FormField>
          <FormField
            label="Code"
            required
            help="Short code for system reference (2-5 characters)"
          >
            <Input
              defaultValue={isCreate ? "" : leaveType.code}
              placeholder="e.g., VL"
              className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
            />
          </FormField>
          <FormField label="Category" required help="Choose the leave category">
            <Select defaultValue={isCreate ? undefined : leaveType.category}>
              <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {LEAVE_TYPE_FORM_OPTIONS.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Description" help="Brief description for employees">
            <Textarea
              defaultValue={isCreate ? "" : leaveType.description}
              placeholder="Enter description of this leave type"
              className="min-h-24 rounded-sm border-zinc-200 bg-transparent text-xs"
            />
          </FormField>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="font-bold text-slate-950">Entitlement Rules</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <FormField label="Credit Basis" required>
              <RadioGroup
                defaultValue={isCreate ? "Monthly" : leaveType.creditBasis}
                className="gap-4"
              >
                <RadioOption
                  value="Monthly"
                  title="Monthly"
                  note="Earned monthly"
                />
                <RadioOption
                  value="Annual"
                  title="Annual"
                  note="Credited yearly"
                />
                <RadioOption
                  value="Fixed"
                  title="Fixed (One-time)"
                  note="One-time entitlement"
                />
              </RadioGroup>
            </FormField>
            <div className="space-y-5">
              <FormField
                label="Default Credits"
                required
                help="Number of days credited based on credit basis"
              >
                <UnitInput
                  defaultValue={
                    isCreate
                      ? "1.00"
                      : leaveType.defaultCredits.replace(" days", "")
                  }
                />
              </FormField>
              <FormField
                label="Maximum Carry Forward"
                help="Maximum days that can be carried forward (0 for no limit)"
              >
                <UnitInput
                  defaultValue={
                    isCreate
                      ? "15.00"
                      : leaveType.maxCarryForward.replace(" days", "")
                  }
                />
              </FormField>
            </div>
            <FormField
              label="Encashable"
              help="Can this leave type be encashed?"
            >
              <RadioGroup
                defaultValue={isCreate ? "Yes" : leaveType.encashable}
                className="flex gap-6"
              >
                <RadioOption value="Yes" title="Yes" />
                <RadioOption value="No" title="No" />
              </RadioGroup>
            </FormField>
            <FormField
              label="Allow Carry Forward"
              help="Can unused leave be carried forward?"
            >
              <RadioGroup defaultValue="Yes" className="flex gap-6">
                <RadioOption value="Yes" title="Yes" />
                <RadioOption value="No" title="No" />
              </RadioGroup>
            </FormField>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="font-bold text-slate-950">Additional Settings</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FormField
              label="Requires Approval"
              help="Require approval for this leave type?"
            >
              <RadioGroup defaultValue="Yes" className="flex gap-6">
                <RadioOption value="Yes" title="Yes" />
                <RadioOption value="No" title="No" />
              </RadioGroup>
            </FormField>
            <FormField
              label="Display Order"
              help="Set display order (lower number appears first)"
            >
              <Input
                defaultValue={isCreate ? "1" : "1"}
                className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
              />
            </FormField>
            <FormField label="Status" required help="Set leave type status">
              <Select defaultValue={isCreate ? "Active" : leaveType.status}>
                <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEAVE_TYPE_FORM_OPTIONS.statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>
      </Card>
    </div>
  );
}


function FormField({ label, required = false, help, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
      {help ? (
        <span className="block text-xs text-slate-500">{help}</span>
      ) : null}
    </label>
  );
}

function RadioOption({
  value,
  title,
  note,
}: {
  value: string;
  title: string;
  note?: string;
}) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <RadioGroupItem value={value} className="mt-0.5" />
      <span>
        <span className="block font-semibold">{title}</span>
        {note ? <span className="text-xs text-slate-500">{note}</span> : null}
      </span>
    </label>
  );
}

function UnitInput({ defaultValue }: { defaultValue: string }) {
  return (
    <div className="flex overflow-hidden rounded-md border border-slate-200">
      <Input
        defaultValue={defaultValue}
        className="h-9 rounded-none border-0 text-xs"
      />
      <span className="flex items-center bg-slate-100 px-4 text-sm text-slate-600">
        days
      </span>
    </div>
  );
}

function PreviewRow({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="font-semibold text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">
        {success ? (
          <CheckCircle2 className="mr-1 inline size-4 text-emerald-600" />
        ) : null}
        {value}
      </span>
    </div>
  );
}
