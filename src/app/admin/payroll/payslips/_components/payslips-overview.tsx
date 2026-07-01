"use client";

import {
  ChevronRight,
  Download,
  Eye,
  FileText,
  HelpCircle,
  MoreVertical,
  Search,
  Settings,
} from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  PAYSLIP_KPI_DATA,
  PAYSLIP_STATUS_DATA,
  PAYSLIP_SUMMARY_DATA,
  PAYSLIP_TABLE_DATA,
} from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { IconCreditCardFilled } from "@tabler/icons-react";

export function PayslipsOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <PayslipKpis />
          <PayslipTableCard />
        </div>
        <aside className="space-y-5">
          <SummaryCard />
          <StatusCard />
          <HelpCard />
        </aside>
      </div>
    </div>
  );
}

function PayslipKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {PAYSLIP_KPI_DATA.map((item) => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          note={item.note}
        />
      ))}
    </section>
  );
}

function PayslipTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 shadow-xs px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-60">
          <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-9! text-xs! bg-transparent border-input pr-9"
            placeholder="Search employee name or ID..."
          />
        </div>
        <FilterSelect
          value="all-pay-periods"
          options={["All Pay Periods", "May 1 - May 31, 2026"]}
        />
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
          value="all-statuses"
          options={["All Statuses", "Paid", "Pending"]}
        />
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Pay Period</TableHead>
            <TableHead>Pay Date</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {PAYSLIP_TABLE_DATA.map((item) => (
            <TableRow key={item.employeeId} className="h-16">
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
              <TableCell>{item.payPeriod}</TableCell>
              <TableCell>{item.payDate}</TableCell>
              <TableCell className="font-bold">{item.netPay}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 245 payslips</span>
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

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconCreditCardFilled className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">
          Payslips
        </h1>
      </div>
      <Button
        variant="secondary"
        className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
      >
        Export
      </Button>
    </div>
  );
}

function MetricCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <Card
      key={title}
      className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs"
    >
      <div className="flex h-full items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
            {title}
          </p>
          <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
            {value}
          </p>
          <p className="mt-1 text-xs font-normal text-zinc-500">{note}</p>
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
      <SelectTrigger className="h-9 text-xs w-45">
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

function SummaryCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payslip Summary (This Year)</h3>
      <div className="space-y-4 text-xs">
        {PAYSLIP_SUMMARY_DATA.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <span className="text-slate-600">{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatusCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payslip Status</h3>
      <div className="relative">
        <ChartContainer
          config={{ value: { label: "Payslips" } }}
          className="mx-auto h-40 aspect-square"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={PAYSLIP_STATUS_DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={44}
              outerRadius={64}
            >
              {PAYSLIP_STATUS_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="space-y-2 text-xs">
        {PAYSLIP_STATUS_DATA.map((item) => (
          <div key={item.name} className="flex justify-between gap-3">
            <span className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.name} ({item.value})
            </span>
            <span className="font-semibold">{item.note}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HelpCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <div className="flex gap-3">
        <HelpCircle className="size-4" />
        <div>
          <h3 className="font-bold">Need Help?</h3>
          <p className="mt-2 text-xs">Learn more about payslips and payroll</p>
          <Button variant="outline" size="sm" className="mt-4 w-full text-xs bg-white">
            View Help Center
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
        status === "Paid"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700",
      )}
    >
      {status}
    </Badge>
  );
}
