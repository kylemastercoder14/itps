"use client";

import {
  Building2,
  ChevronRight,
  FileText,
  HelpCircle,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
} from "lucide-react";

import {
  CONTRIBUTIONS_PAGE_DATA,
  CONTRIBUTIONS_PAGE_QUICK_ACTIONS,
  CONTRIBUTIONS_PAGE_SUMMARY,
  CONTRIBUTIONS_PAGE_TABS,
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
import { IconBuildingBroadcastTowerFilled } from "@tabler/icons-react";

const TONE_STYLES = {
  blue: "bg-blue-600 text-white",
  green: "bg-emerald-500 text-white",
  orange: "bg-orange-500 text-white",
  violet: "bg-violet-600 text-white",
} as const;

const SOFT_TONE_STYLES = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  violet: "bg-violet-50 text-violet-700",
} as const;

export function ContributionsOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <SummaryKpis />
      <div className="grid gap-5 xl:grid-cols-[1fr_19rem]">
        <div className="space-y-5">
          <ContributionsTableCard />
        </div>
        <aside className="space-y-5">
          <ContributionSummary />
          <QuickActionsCard />
        </aside>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconBuildingBroadcastTowerFilled className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">
          Government Contributions
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
        >
          <RefreshCcw className="size-4" />
          Update All Rates
        </Button>
        <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
          Add Contribution
        </Button>
      </div>
    </div>
  );
}

function SummaryKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CONTRIBUTIONS_PAGE_SUMMARY.map((item) => (
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

function ContributionsTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl py-4 px-5 border-zinc-200 shadow-xs">
      {/* <div className="flex flex-wrap gap-7">
        {CONTRIBUTIONS_PAGE_TABS.map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "border-b-2 pb-4 text-sm font-semibold",
              index === 0
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-slate-600 hover:text-slate-950",
            )}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div> */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-64">
            <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-9 text-xs! bg-transparent border-input pr-9"
              placeholder="Search contributions..."
            />
          </div>
          <SelectField
            value="all-agencies"
            options={["All Agencies", "SSS", "PhilHealth", "Pag-IBIG", "ECC"]}
          />
          <SelectField
            value="active"
            options={["Active Only", "Inactive Only", "All Statuses"]}
          />
        </div>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Contribution</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Employee Rate</TableHead>
            <TableHead>Employer Rate</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CONTRIBUTIONS_PAGE_DATA.map((item) => (
            <TableRow key={item.name} className="h-20">
              <TableCell>
                <NameCell
                  description={item.description}
                  name={item.name}
                  tone={item.tone}
                />
              </TableCell>
              <TableCell className="font-semibold text-slate-700">
                {item.agency}
              </TableCell>
              <TableCell>
                <RateCell basis={item.employeeBasis} rate={item.employeeRate} />
              </TableCell>
              <TableCell>
                <RateCell basis={item.employerBasis} rate={item.employerRate} />
              </TableCell>
              <TableCell>{item.frequency}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 contributions</span>
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
      <div className="m-3 rounded-lg border bg-accent px-5 py-4 text-xs">
        <p className="font-bold">Important Note</p>
        <p className="mt-2">
          These contribution rates are used to automatically calculate employee
          and employer contributions during payroll processing.
        </p>
        <p className="mt-1">
          Please verify rates regularly and update when government agencies
          publish changes.
        </p>
      </div>
    </Card>
  );
}

function ContributionSummary() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Contribution Summary</h3>
      <div className="space-y-3">
        {CONTRIBUTIONS_PAGE_SUMMARY.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700">
                {item.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-950">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuickActionsCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="space-y-4">
        {CONTRIBUTIONS_PAGE_QUICK_ACTIONS.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent">
              {index === 0 ? (
                <Plus className="size-4" />
              ) : index === 1 ? (
                <RefreshCcw className="size-4" />
              ) : (
                <FileText className="size-4" />
              )}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NameCell({
  name,
  description,
  tone,
}: {
  name: string;
  description: string;
  tone: keyof typeof TONE_STYLES;
}) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="font-bold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function RateCell({ rate, basis }: { rate: string; basis: string }) {
  return (
    <div>
      <p className="font-bold text-slate-900">{rate}</p>
      <p className="text-xs text-slate-500">{basis}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "Active"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      )}
    >
      {status}
    </Badge>
  );
}

function RowActions() {
  return (
    <Button variant="ghost" size="icon" className="size-8">
      <MoreVertical className="size-4" />
    </Button>
  );
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-9 w-40 text-xs!">
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
