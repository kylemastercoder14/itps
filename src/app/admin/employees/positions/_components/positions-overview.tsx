"use client";

import Link from "next/link";
import {
  ArrowRight,
  Columns3,
  Download,
  Edit,
  Search,
  Users,
} from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  POSITION_KPI_DATA,
  POSITION_LIST_DATA,
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
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";

const SUMMARY_DATA = [
  { name: "Active", value: 22, fill: "#22c55e" },
  { name: "Inactive", value: 1, fill: "#f59e0b" },
  { name: "Draft", value: 1, fill: "#94a3b8" },
];

export function PositionsOverview() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/employees">
            <IconUserFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Positions
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
            <Link href="/admin/employees/positions/create">Add position</Link>
          </Button>
        </div>
      </div>
      <PositionKpis />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <PositionsTable />
        <PositionsSidebar />
      </div>
    </div>
  );
}

function PositionKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {POSITION_KPI_DATA.map((item) => (
        <Card
          key={item.title}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4"
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

function PositionsTable() {
  return (
    <Card className="overflow-hidden rounded-xl border py-0! gap-0! border-zinc-200 bg-white shadow-xs">
      <div className="flex min-h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4">
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-11 border-0 bg-transparent px-0 text-sm font-medium shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
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
          <TableRow className="hover:bg-zinc-50">
            <TableHead className="h-10 px-4 font-semibold text-zinc-600">
              Position Title
            </TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Employment Type</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {POSITION_LIST_DATA.map((position) => (
            <TableRow key={position.id} className="h-15 hover:bg-zinc-50">
              <TableCell className="px-4">
                <Link
                  href={`/admin/employees/positions/${position.id}`}
                  className="font-semibold"
                >
                  {position.title}
                </Link>
              </TableCell>
              <TableCell>{position.department}</TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {position.type}
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1">
                  <Users className="size-4 text-slate-500" />
                  {position.employees}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="rounded-md bg-emerald-50 text-emerald-700"
                >
                  {position.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-8"
                  >
                    <Link href={`/admin/employees/positions/${position.id}`}>
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
        <span>Showing 1 to 10 of 24 positions</span>
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
          <Button variant="outline" size="icon-sm" className="text-xs">
            3
          </Button>
        </div>
      </div>
    </Card>
  );
}

function PositionsSidebar() {
  return (
    <div className="space-y-5">
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="font-semibold text-sm">Position Summary</h3>
        <div className="relative">
          <ChartContainer
            config={{ value: { label: "Positions" } }}
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
              <p className="text-2xl font-bold">24</p>
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
      <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
        <h3 className="font-semibold text-sm">Top Positions by Employees</h3>
        <div className="space-y-3">
          {POSITION_LIST_DATA.slice(4, 9).map((item) => (
            <div key={item.id}>
              <div className="flex justify-between text-xs">
                <span>{item.title}</span>
                <span className="font-semibold">{item.employees}</span>
              </div>
              <div className="mt-1 h-2 rounded-xs bg-slate-100">
                <div
                  className="h-2 rounded-xs bg-black"
                  style={{ width: `${Math.min(100, item.employees * 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="rounded-xl border-zinc-200 gap-3! px-5 py-4 shadow-xs">
        <h3 className="font-bold">Need Help?</h3>
        <p className="text-xs text-slate-600">
          Learn more about managing positions.
        </p>
        <Button variant="outline" size="sm" className="mt-2 text-xs">
          View User Guide <ArrowRight className="size-3.5" />
        </Button>
      </Card>
    </div>
  );
}
