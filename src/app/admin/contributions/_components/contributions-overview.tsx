"use client"

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
} from "lucide-react"

import {
  CONTRIBUTIONS_PAGE_DATA,
  CONTRIBUTIONS_PAGE_QUICK_ACTIONS,
  CONTRIBUTIONS_PAGE_SUMMARY,
  CONTRIBUTIONS_PAGE_TABS,
} from "@/constants/admin-dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const TONE_STYLES = {
  blue: "bg-blue-600 text-white",
  green: "bg-emerald-500 text-white",
  orange: "bg-orange-500 text-white",
  violet: "bg-violet-600 text-white",
} as const

const SOFT_TONE_STYLES = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  violet: "bg-violet-50 text-violet-700",
} as const

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
          <HelpCard />
        </aside>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <Building2 className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">Government Contributions</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="rounded-lg bg-zinc-200 text-zinc-800 hover:bg-zinc-300">
          <RefreshCcw className="size-4" />
          Update All Rates
        </Button>
        <Button className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Contribution
        </Button>
      </div>
    </div>
  )
}

function SummaryKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CONTRIBUTIONS_PAGE_SUMMARY.map((item) => (
        <Card key={item.label} className="flex min-h-[122px] flex-col justify-center rounded-xl border-zinc-200 bg-white p-5 shadow-xs">
          <p className="w-fit border-b border-dotted border-zinc-400 text-sm font-semibold text-zinc-800">{item.label}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">{item.value}</p>
          {item.note ? <p className="mt-2 text-sm text-slate-600">{item.note}</p> : null}
        </Card>
      ))}
    </section>
  )
}

function ContributionsTableCard() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
      <div className="flex flex-wrap gap-7 border-b px-5 pt-5">
        {CONTRIBUTIONS_PAGE_TABS.map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "border-b-2 pb-4 text-sm font-semibold",
              index === 0
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-slate-600 hover:text-slate-950"
            )}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-64">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-11 pr-9" placeholder="Search contributions..." />
          </div>
          <SelectField value="all-agencies" options={["All Agencies", "SSS", "PhilHealth", "Pag-IBIG", "ECC"]} />
          <SelectField value="active" options={["Active Only", "Inactive Only", "All Statuses"]} />
        </div>
        <Button className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Contribution
        </Button>
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
              <TableCell className="font-semibold text-slate-700">{item.agency}</TableCell>
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-t p-5 text-sm text-slate-600">
        <span>Showing 1 to 5 of 5 contributions</span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger className="h-9 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="size-9">{"<"}</Button>
          <Button size="icon" className="size-9 bg-zinc-900 hover:bg-zinc-800">1</Button>
          <Button variant="outline" size="icon" className="size-9">{">"}</Button>
        </div>
      </div>
      <div className="m-5 rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm text-blue-800">
        <p className="font-bold">Important Note</p>
        <p className="mt-2">
          These contribution rates are used to automatically calculate employee and employer contributions during payroll processing.
        </p>
        <p className="mt-1">
          Please verify rates regularly and update when government agencies publish changes.
        </p>
      </div>
    </Card>
  )
}

function ContributionSummary() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Contribution Summary</h3>
      <div className="mt-5 space-y-5">
        {CONTRIBUTIONS_PAGE_SUMMARY.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className={cn("flex size-10 items-center justify-center rounded-full", SOFT_TONE_STYLES[item.tone])}>
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-700">{item.label}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-950">{item.value}</p>
              {item.note ? <p className="text-xs text-slate-500">{item.note}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function QuickActionsCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4">
        {CONTRIBUTIONS_PAGE_QUICK_ACTIONS.map((item, index) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              {index === 0 ? <Plus className="size-4" /> : index === 1 ? <RefreshCcw className="size-4" /> : <FileText className="size-4" />}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HelpCard() {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="mt-0.5 size-5 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-700">
            Learn more about government contributions and how they affect payroll calculations.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  )
}

function NameCell({
  name,
  description,
  tone,
}: {
  name: string
  description: string
  tone: keyof typeof TONE_STYLES
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex size-10 items-center justify-center rounded-lg", TONE_STYLES[tone])}>
        <Building2 className="size-5" />
      </span>
      <div>
        <p className="font-bold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function RateCell({ rate, basis }: { rate: string; basis: string }) {
  return (
    <div>
      <p className="font-bold text-slate-900">{rate}</p>
      <p className="text-xs text-slate-500">{basis}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "Active"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      )}
    >
      {status}
    </Badge>
  )
}

function RowActions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" className="size-8 text-blue-600">
        <Pencil className="size-4" />
      </Button>
      <Button variant="outline" size="icon" className="size-8">
        <MoreVertical className="size-4" />
      </Button>
    </div>
  )
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-40">
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
  )
}
