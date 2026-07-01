"use client";

import Link from "next/link";
import {
  Baby,
  CheckCircle2,
  HeartPulse,
  MoreHorizontal,
  Plane,
  Plus,
  Search,
  Siren,
  Sparkles,
  UsersRound,
  XCircle,
} from "lucide-react";
import { IconCalendarFilled, IconChevronRight } from "@tabler/icons-react";

import {
  LEAVE_TYPE_KPI_DATA,
  LEAVE_TYPE_LIST_DATA,
} from "@/constants/admin-dashboard";
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

const TYPE_ICONS = {
  Plane,
  HeartPulse,
  Siren,
  Baby,
  UsersRound,
  Sparkles,
} as const;

export function LeaveTypesOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/leaves">
            <IconCalendarFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Leave Types
            </h1>
          </div>
        </div>
        <Button
          asChild
          className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
        >
          <Link href="/admin/leaves/types/create">
            <Plus className="size-4" />
            Add leave type
          </Link>
        </Button>
      </div>
      <LeaveTypeKpis />
      <LeaveTypesTableCard />
    </div>
  );
}

function LeaveTypeKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {LEAVE_TYPE_KPI_DATA.map((item) => (
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

function LeaveTypesTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl py-4 px-5 border-zinc-200 bg-white shadow-xs">
      <div className="relative w-full max-w-64">
        <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        <Input
          className="h-9 text-xs! border-input bg-transparent pr-9"
          placeholder="Search leave types..."
        />
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Credit Basis</TableHead>
            <TableHead>Default Credits</TableHead>
            <TableHead>Max Carry Forward</TableHead>
            <TableHead>Encashable</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAVE_TYPE_LIST_DATA.map((item) => {
            const Icon = TYPE_ICONS[item.icon];

            return (
              <TableRow key={item.id} className="h-20 hover:bg-zinc-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-11 items-center bg-accent justify-center rounded-full",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.code}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="font-semibold">{item.creditBasis}</p>
                  <p className="text-xs text-slate-500">{item.creditNote}</p>
                </TableCell>
                <TableCell>{item.defaultCredits}</TableCell>
                <TableCell>{item.maxCarryForward}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "flex items-center gap-1 font-semibold",
                      item.encashable === "Yes"
                        ? "text-emerald-600"
                        : "text-red-600",
                    )}
                  >
                    {item.encashable === "Yes" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    {item.encashable}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700"
                  >
                    {item.status}
                  </Badge>
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
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 entries</span>
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
