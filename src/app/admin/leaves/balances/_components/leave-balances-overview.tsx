"use client";

import { FileText, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { IconCalendarFilled, IconChevronRight } from "@tabler/icons-react";

import {
  LEAVE_BALANCE_EMPLOYEE_DATA,
  LEAVE_BALANCE_KPI_DATA,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function LeaveBalancesOverview() {
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
              Leave Balances
            </h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
        >
          <FileText className="size-4" />
          Export
        </Button>
      </div>
      <BalanceKpis />
      <BalanceTableCard />
    </div>
  );
}

function BalanceKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {LEAVE_BALANCE_KPI_DATA.map((item) => (
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

function BalanceTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 border-zinc-200 bg-white shadow-xs">
      <Tabs defaultValue="employee" className="min-w-0">
        <TabsList variant="line" className="justify-start">
          <TabsTrigger
            value="employee"
            className="h-9 px-3 text-xs data-active:text-black group-data-[variant=line]/tabs-list:data-active:after:bg-black"
          >
            Employee Balance
          </TabsTrigger>
          <TabsTrigger
            value="department"
            className="h-9 px-3 text-xs data-active:text-black group-data-[variant=line]/tabs-list:data-active:after:bg-black"
          >
            Department Summary
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap items-center gap-3">
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
          value="all-leave-types"
          options={[
            "All Leave Types",
            "Vacation Leave",
            "Sick Leave",
            "Emergency Leave",
          ]}
        />
        <FilterSelect
          value="all-status"
          options={["All Status", "Excellent", "Good", "Low", "Critical"]}
        />
        <div className="relative min-w-64">
          <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-9 rounded-lg border-input bg-transparent pr-9 text-xs!"
            placeholder="Search employees..."
          />
        </div>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Credit Entitlement (Days)</TableHead>
            <TableHead>Used (Days)</TableHead>
            <TableHead>Pending (Days)</TableHead>
            <TableHead>Balance (Days)</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAVE_BALANCE_EMPLOYEE_DATA.map((employee) =>
            employee.balances.map((balance, index) => (
              <TableRow
                key={`${employee.employeeId}-${balance.leaveType}`}
                className="h-12 hover:bg-zinc-50"
              >
                {index === 0 ? (
                  <>
                    <TableCell rowSpan={employee.balances.length}>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{employee.employee}</p>
                          <p className="text-xs text-slate-500">
                            {employee.employeeId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell rowSpan={employee.balances.length}>
                      {employee.department}
                    </TableCell>
                  </>
                ) : null}
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-sm"
                      style={{ backgroundColor: balance.fill }}
                    />
                    {balance.leaveType}
                  </span>
                </TableCell>
                <TableCell>{balance.entitlement}</TableCell>
                <TableCell>{balance.used}</TableCell>
                <TableCell>{balance.pending}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-3">
                    <span
                      
                    >
                      {balance.balance}
                    </span>
                    <StatusBadge status={balance.status} />
                  </span>
                </TableCell>
                {index === 0 ? (
                  <TableCell rowSpan={employee.balances.length}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            )),
          )}
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

function FilterSelect({
  value,
  options,
}: {
  value: string;
  options: string[];
}) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-10 w-44 rounded-lg border-zinc-200 text-xs">
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

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "Excellent" && "bg-emerald-50 text-emerald-700",
        status === "Good" && "bg-emerald-50 text-emerald-700",
        status === "Low" && "bg-orange-50 text-orange-700",
        status === "Critical" && "bg-red-50 text-red-700",
      )}
    >
      {status}
    </Badge>
  );
}
