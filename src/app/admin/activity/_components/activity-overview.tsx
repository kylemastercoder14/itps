"use client";

import {
  ArrowUpDown,
  CalendarDays,
  ChevronRight,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  ACTIVITY_LOG_DATA,
  ACTIVITY_LOG_DETAILS,
  ACTIVITY_LOG_SUMMARY,
  ACTIVITY_QUICK_ACTIONS,
} from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IconActivity } from "@tabler/icons-react";

const TONE_SOFT = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  red: "bg-red-50 text-red-700",
  violet: "bg-violet-50 text-violet-700",
  cyan: "bg-cyan-50 text-cyan-700",
} as const;

const TONE_SOLID = {
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  violet: "bg-violet-600",
  cyan: "bg-cyan-500",
} as const;

export function ActivityOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <ActivityKpis />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <main className="space-y-5">
          <ActivityTableCard />
        </main>
        <aside className="space-y-5">
          <LogSummaryCard />
          <LogDetailsCard />
        </aside>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconActivity className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">
          Activity Logs
        </h1>
      </div>
      <Button
        variant="secondary"
        className="rounded-lg text-xs bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
      >
        <CalendarDays className="size-3.5" />
        May 17, 2025 - May 24, 2025
      </Button>
    </div>
  );
}

function ActivityKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {ACTIVITY_LOG_SUMMARY.map((item) => (
        <Card
          key={item.label}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {item.label}
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
                {item.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}

function ActivityTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 shadow-xs px-5 py-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-72 flex-1">
          <Input
            className="h-9 text-xs! border-input bg-transparent pr-10"
            placeholder="Search activities..."
          />
          <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        </div>
        <SelectField
          value="all-users"
          options={["All Users", "Admin", "HR Manager", "Payroll Officer"]}
        />
        <SelectField
          value="all-actions"
          options={[
            "All Actions",
            "Login",
            "Create",
            "Update",
            "Delete",
            "Export",
          ]}
        />
        <SelectField
          value="all-modules"
          options={[
            "All Modules",
            "Authentication",
            "Employee",
            "Payroll Run",
            "Attendance",
          ]}
        />
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>
              <span className="flex items-center gap-2">
                Date & Time
                <ArrowUpDown className="size-3" />
              </span>
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ACTIVITY_LOG_DATA.map((item, index) => (
            <TableRow key={`${item.date}-${index}`} className="h-16">
              <TableCell>
                <Multiline
                  value={item.date}
                  className="font-semibold text-xs"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-900">{item.user}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.action}</TableCell>
              <TableCell className="font-semibold text-black">
                {item.module}
              </TableCell>
              <TableCell>
                <Multiline value={item.description} />
              </TableCell>
              <TableCell className="font-semibold text-blue-900">
                {item.ip}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 activities</span>
        <div className="flex items-center gap-1.5">
          <span>Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger size="sm" className="h-8 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon-sm" className="text-xs">
            1
          </Button>
          <Button variant="outline" size="icon-sm" className="text-xs">
            2
          </Button>
        </div>
      </div>
    </Card>
  );
}

function LogSummaryCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Log Summary</h3>
      </div>
      <div className="space-y-3.5">
        {ACTIVITY_LOG_SUMMARY.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">
                {item.label}
              </span>
            </span>
            <span className="text-xs font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LogDetailsCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Log Details</h3>
      <div className="flex items-center gap-3">
        <div>
          Login
          <p className="mt-1 text-xs text-slate-500">
            May 24, 2025 10:30:15 AM
          </p>
        </div>
      </div>
      <div className="space-y-3 border-t pt-5 text-xs">
        {ACTIVITY_LOG_DETAILS.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[6rem_1fr] gap-3">
            <span className="font-semibold text-slate-500">{label}</span>
            <span
              className={cn(
                "font-semibold text-slate-900",
                label === "Status" && "text-green-600",
              )}
            >
              {value}
            </span>
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
        {ACTIVITY_QUICK_ACTIONS.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              {index === 1 ? (
                <Trash2 className="size-4" />
              ) : index === 2 ? (
                <ShieldCheck className="size-4" />
              ) : (
                <Download className="size-4" />
              )}
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
            Learn more about activity logs and how to audit user actions.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ActionBadge({
  action,
  tone,
}: {
  action: string;
  tone: keyof typeof TONE_SOFT;
}) {
  return (
    <Badge variant="secondary" className={TONE_SOFT[tone]}>
      {action}
    </Badge>
  );
}

function Multiline({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={cn("text-xs text-slate-700", className)}>
      {value.split("\n").map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </span>
  );
}

function SelectField({
  value,
  options,
  compact = false,
}: {
  value: string;
  options: string[];
  compact?: boolean;
}) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className={cn("h-9 text-xs!", compact ? "w-28" : "w-40")}>
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
