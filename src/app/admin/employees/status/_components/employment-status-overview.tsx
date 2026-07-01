"use client";

import Link from "next/link";
import {
  Download,
  Edit,
  Columns3,
  Search,
  Star,
  ArrowRight,
} from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  EMPLOYMENT_STATUS_KPI_DATA,
  EMPLOYMENT_STATUS_LIST_DATA,
} from "@/constants/admin-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";

const SUMMARY_DATA = [
  { name: "Active", value: 7, fill: "#22c55e" },
  { name: "Inactive", value: 2, fill: "#f59e0b" },
  { name: "Archived", value: 1, fill: "#8b5cf6" },
];

export function EmploymentStatusOverview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/employees">
            <IconUserFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Employment Status
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            <Download className="size-4" />
            Export
          </Button>
          <Button
            asChild
            className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
          >
            <Link href="/admin/employees/status/create">Add status</Link>
          </Button>
        </div>
      </div>

      <StatusKpis />

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <StatusTable />
        <StatusSidebar />
      </div>
    </div>
  );
}

function StatusKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {EMPLOYMENT_STATUS_KPI_DATA.map((item) => (
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

function StatusTable() {
  return (
    <Card className="overflow-hidden rounded-xl py-0! gap-0! border border-zinc-200 bg-white shadow-xs">
      <div className="flex min-h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4">
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-11 border-0 bg-transparent px-0 text-sm font-medium shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            className="h-9 border-0 bg-transparent pl-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search and filter"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg text-zinc-600 hover:bg-zinc-100"
        >
          <Columns3 className="size-4" />
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead className="h-10 px-4 font-semibold text-zinc-600">
              Status Name
            </TableHead>
            <TableHead>Status Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {EMPLOYMENT_STATUS_LIST_DATA.map((item) => (
            <TableRow key={item.id} className="h-15 hover:bg-zinc-50">
              <TableCell className="px-4">
                <Link
                  href={`/admin/employees/status/${item.id}`}
                  className="font-semibold"
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell className="font-semibold">{item.code}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Star
                  className={cn(
                    "size-4",
                    item.default
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-400",
                  )}
                />
              </TableCell>
              <TableCell>
                <TypeBadge type={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg"
                  >
                    <Link href={`/admin/employees/status/${item.id}`}>
                      <Edit className="size-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 departments</span>
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

function StatusSidebar() {
  return (
    <div className="space-y-5">
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs gap-3!">
        <h3 className="font-bold">Status Distribution</h3>
        <div className="relative">
          <ChartContainer
            config={{ value: { label: "Statuses" } }}
            className="mx-auto h-40 aspect-square"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={SUMMARY_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={70}
              >
                {SUMMARY_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-2xl font-bold">10</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          {SUMMARY_DATA.map((item) => (
            <div key={item.name} className="flex justify-between">
              <span className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                {item.name}
              </span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="rounded-xl border-zinc-200 gap-4! px-5 py-4 shadow-xs">
        <h3 className="font-bold">Quick Actions</h3>
        <div className="space-y-4 text-xs">
          {[
            "Add New Status",
            "Reorder Status",
            "Set Default Status",
            "View Employee Summary",
          ].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 text-left font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      </Card>
      <Card className="rounded-xl border-zinc-200 gap-3! px-5 py-4 shadow-xs">
        <h3 className="font-bold">Need Help?</h3>
        <p className="text-xs text-slate-600">
          Learn more about employment status.
        </p>
        <Button variant="outline" size="sm" className="mt-2 text-xs">
          View User Guide <ArrowRight className="size-3.5" />
        </Button>
      </Card>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md",
        type === "Active" && "bg-green-50 text-green-700",
        type === "Inactive" && "bg-red-50 text-red-700",
        type === "Archived" && "bg-gray-50 text-gray-700",
      )}
    >
      {type}
    </Badge>
  );
}
