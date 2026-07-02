"use client";

import Link from "next/link";
import {
  Activity,
  ChevronRight,
  Download,
  Filter,
  HelpCircle,
  MoreVertical,
  PauseCircle,
  Pencil,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  USER_MANAGEMENT_STATS,
  USER_MANAGEMENT_USERS,
  USER_QUICK_ACTIONS,
  USER_ROLE_DISTRIBUTION,
  USER_STATUS_SUMMARY,
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
import { IconShieldCheckFilled } from "@tabler/icons-react";

const TONE_CLASS = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  violet: "bg-violet-50 text-violet-700",
  cyan: "bg-cyan-50 text-cyan-700",
  slate: "bg-slate-100 text-slate-700",
} as const;

export function UsersOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <UserStats />
      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <main className="space-y-5">
          <UsersTableCard />
        </main>
        <aside className="space-y-5">
          <DonutCard
            title="User Summary"
            data={USER_ROLE_DISTRIBUTION}
            total="28"
          />
          <StatusSummary />
        </aside>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconShieldCheckFilled className="size-4 text-zinc-900" />
        <ChevronRight className="size-4 text-zinc-500" />
        <h1 className="text-lg font-bold tracking-tight text-zinc-950">
          User Management
        </h1>
      </div>
      <Button
        asChild
        className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
      >
        <Link href="/admin/users/create">Add User</Link>
      </Button>
    </div>
  );
}

function UserStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {USER_MANAGEMENT_STATS.map((stat) => (
        <Card
          key={stat.title}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {stat.title}
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}

function UsersTableCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      {/* <div className="flex gap-7 border-b">
        {["All Users", "Active", "Inactive", "Pending"].map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "border-b-2 pb-4 text-sm font-semibold",
              index === 0
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-slate-500 hover:text-slate-900",
            )}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div> */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-72 flex-1">
          <Input
            className="h-9 text-xs! border-input bg-transparent pr-10"
            placeholder="Search users by name, email, or username..."
          />
          <Users className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        </div>
        <div className="flex flex-wrap gap-3">
          <SelectField
            value="all-roles"
            options={[
              "All Roles",
              "Administrator",
              "Payroll Officer",
              "HR Manager",
            ]}
          />
          <SelectField
            value="all-status"
            options={["All Status", "Active", "Inactive", "Pending"]}
          />
          <Button variant="outline" className="text-xs!">
            <Filter className="size-3.5" />
            Filters
          </Button>
          <Button variant="outline" className="text-xs!">
            <Download className="size-3.5" />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {USER_MANAGEMENT_USERS.map((user) => (
            <TableRow key={user.id} className="h-16">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="font-medium text-slate-700">
                {user.department}
              </TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell>
                {user.lastLogin.split("\n").map((line) => (
                  <span key={line} className="block text-xs text-slate-700">
                    {line}
                  </span>
                ))}
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
        <span>Showing 1 to 10 of 28 users</span>
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

function DonutCard({
  title,
  data,
  total,
}: {
  title: string;
  data: typeof USER_ROLE_DISTRIBUTION;
  total: string;
}) {
  const chartTotal = data.reduce((sum, item) => sum + item.value, 0);
  const gradient = data
    .reduce(
      (parts, item) => {
        const start = (parts.offset / chartTotal) * 100;
        const end = ((parts.offset + item.value) / chartTotal) * 100;
        parts.items.push(`${item.fill} ${start}% ${end}%`);
        parts.offset += item.value;
        return parts;
      },
      { offset: 0, items: [] as string[] },
    )
    .items.join(", ");

  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">{title}</h3>
      <div className="flex flex-col items-center gap-5">
        <div
          className="relative size-32 mx-auto rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-xl font-bold">{total}</span>
          </div>
        </div>
        <div className="w-full space-y-2 text-xs">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex w-full items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                {item.label}
              </span>
              <span className="font-semibold">
                {item.value} ({item.note})
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function StatusSummary() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Users by Status</h3>
      <div className="space-y-3">
        {USER_STATUS_SUMMARY.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="flex items-center gap-2 text-xs">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.label}
            </span>
            <span className="font-bold text-xs">
              {item.value} ({item.note})
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RoleBadge({
  role,
  tone,
}: {
  role: string;
  tone: keyof typeof TONE_CLASS;
}) {
  return (
    <Badge variant="secondary" className={TONE_CLASS[tone]}>
      {role}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Pending"
        ? "bg-orange-50 text-orange-700"
        : "bg-red-50 text-red-700";

  return (
    <Badge variant="secondary" className={tone}>
      {status}
    </Badge>
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
      <SelectTrigger className={cn("h-9 text-xs!", compact ? "w-20" : "w-40")}>
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
