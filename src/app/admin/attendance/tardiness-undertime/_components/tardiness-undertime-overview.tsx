"use client";

import { CalendarDays, FileText, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { IconChevronRight, IconClockHour3Filled } from "@tabler/icons-react";

import {
  TARDINESS_UNDERTIME_KPI_DATA,
  TARDINESS_UNDERTIME_TABLE_DATA,
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

export function TardinessUndertimeOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/attendance">
            <IconClockHour3Filled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Tardiness & Undertime
            </h1>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
        >
          <FileText className="size-4" />
          Export
        </Button>
      </div>
      <ViolationKpis />
      <div className="space-y-5">
        <ViolationFilters />
        <ViolationTable />
      </div>
    </div>
  );
}

function ViolationKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {TARDINESS_UNDERTIME_KPI_DATA.map((item) => (
        <Card
          key={item.title}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {item.title}
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-normal text-zinc-500">
                {item.note}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}

function ViolationFilters() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start gap-2"
        >
          <CalendarDays className="size-3.5" />
          May 1, 2026 - May 15, 2026
        </Button>
        <FilterSelect
          value="all-departments"
          options={[
            "All Departments",
            "Information Technology",
            "Human Resources",
            "Finance",
          ]}
        />
        <FilterSelect
          value="all-employees"
          options={["All Employees", "Regular", "Probationary", "Contractual"]}
        />
        <FilterSelect
          value="all-violations"
          options={[
            "All Violation Types",
            "Tardy (Late)",
            "Undertime (Early Out)",
            "Insufficient Hours",
          ]}
        />
        <FilterSelect
          value="all-statuses"
          options={["All Statuses", "Reviewed", "Unreviewed"]}
        />
        <div className="relative ml-auto min-w-62.5">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-9 text-xs! bg-transparent border-input pr-9"
            placeholder="Search employees..."
          />
        </div>
      </div>
    </Card>
  );
}

function FilterSelect({
  value,
  options,
}: {
  value: string;
  options: string[];
}) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-9 text-xs w-44">
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

function ViolationTable() {
  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 border-zinc-200 bg-white shadow-xs">
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Violation Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time In / Out</TableHead>
            <TableHead>Late / Undertime</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TARDINESS_UNDERTIME_TABLE_DATA.map((item) => (
            <TableRow
              key={`${item.employeeId}-${item.date}`}
              className="h-16 hover:bg-zinc-50"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.employee}</p>
                    <p className="text-xs text-slate-500">{item.employeeId}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn("rounded-md", violationClass(item.type))}
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell
                className={cn(
                  item.type === "Tardy (Late)"
                    ? "text-red-600"
                    : "text-blue-600",
                )}
              >
                {item.duration}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 174 entries</span>
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

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md",
        status === "Reviewed"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700",
      )}
    >
      {status}
    </Badge>
  );
}

function violationClass(type: string) {
  if (type === "Tardy (Late)") return "bg-red-50 text-red-700";
  if (type === "Insufficient Hours") return "bg-violet-50 text-violet-700";
  return "bg-blue-50 text-blue-700";
}
