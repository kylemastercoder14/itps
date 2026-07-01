import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Printer,
} from "lucide-react";
import Link from "next/link";
import { IconChevronRight, IconClockHour3Filled } from "@tabler/icons-react";

import {
  DTR_DETAIL_EMPLOYEE_DATA,
  DTR_DETAIL_METRIC_DATA,
  DTR_DETAIL_SUMMARY_DATA,
  DTR_DETAIL_TIME_RECORD_DATA,
} from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function DailyAttendanceDetail() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/attendance/daily-attendance">
            <IconClockHour3Filled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <Link
              href="/admin/attendance/daily-attendance"
              className="text-lg font-bold tracking-tight text-zinc-900"
            >
              Daily Attendance
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Time Record
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
            size="sm"
          >
            <Printer className="size-4" />
            Print DTR
          </Button>
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
            size="sm"
          >
            <Download className="size-4" />
            Export DTR
          </Button>
          <Button
            size="sm"
            className="rounded-lg bg-zinc-900 text-xs text-white hover:bg-zinc-800"
          >
            <Check className="size-3.5" />
            Approve DTR
          </Button>
        </div>
      </div>
      <EmployeeRecordHeader />
      <MetricStrip />
      <TimeRecordCard />
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <RemarksCard />
        <ApprovalHistoryCard />
      </div>
    </div>
  );
}

function EmployeeRecordHeader() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.8fr] xl:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarFallback className="text-xl font-bold">
              {DTR_DETAIL_EMPLOYEE_DATA.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-slate-950">
                {DTR_DETAIL_EMPLOYEE_DATA.name}
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {DTR_DETAIL_EMPLOYEE_DATA.employeeId} ·{" "}
              {DTR_DETAIL_EMPLOYEE_DATA.department}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {DTR_DETAIL_EMPLOYEE_DATA.position}
            </p>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="w-60">
            <p className="mb-2 text-xs font-semibold text-slate-700">Date</p>
            <div className="flex h-9! overflow-hidden rounded-md border border-slate-200">
              <Button variant="ghost" size="icon" className="h-9! rounded-none">
                <CalendarDays className="size-3.5" />
              </Button>
              <div className="flex flex-1 items-center justify-center border-x px-3 text-xs font-semibold">
                {DTR_DETAIL_EMPLOYEE_DATA.date}
              </div>
              <Button variant="ghost" size="icon" className="h-9! rounded-none">
                <ChevronLeft className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9! rounded-none">
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
          <HeaderStat
            label="Work Schedule"
            value={DTR_DETAIL_EMPLOYEE_DATA.workSchedule}
          />
          <HeaderStat label="Shift" value={DTR_DETAIL_EMPLOYEE_DATA.shift} />
          <HeaderStat
            label="Min. Hours Required"
            value={DTR_DETAIL_EMPLOYEE_DATA.minHours}
          />
          <HeaderStat
            label="Total Hours"
            value={DTR_DETAIL_EMPLOYEE_DATA.totalHours}
            success
          />
        </div>
      </div>
    </Card>
  );
}

function HeaderStat({
  label,
  value,
  success,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-slate-700">{label}</p>
      <p
        className={cn(
          "text-xs font-semibold",
          success ? "text-green-600" : "text-slate-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function MetricStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {DTR_DETAIL_METRIC_DATA.map((item) => (
        <Card
          key={item.label}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {item.label}
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

function TimeRecordCard() {
  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 border-zinc-200 bg-white shadow-xs">
      <h2 className="text-sm font-bold text-slate-950">Time Record</h2>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Note / Remarks</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {DTR_DETAIL_TIME_RECORD_DATA.map((record) => (
            <TableRow key={record.no} className="h-14 hover:bg-zinc-50">
              <TableCell>{record.no}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.time}</TableCell>
              <TableCell>{record.source}</TableCell>
              <TableCell>{record.location}</TableCell>
              <TableCell>{record.note}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    {record.photo}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Badge
                  className="rounded-md bg-green-50 text-green-700"
                  variant="secondary"
                >
                  {record.status}
                </Badge>
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
      <div className="grid border-t md:grid-cols-4 xl:grid-cols-8">
        {DTR_DETAIL_SUMMARY_DATA.map(([label, value]) => (
          <div key={label} className="border-b p-4 md:border-r xl:border-b-0">
            <p className="text-xs font-semibold text-slate-600">{label}</p>
            {label === "DTR Status" ? (
              <Badge
                className="mt-2 rounded-md bg-emerald-50 text-emerald-700"
                variant="secondary"
              >
                {value}
              </Badge>
            ) : (
              <p className="mt-2 font-bold text-slate-950">{value}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function RemarksCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 gap-2! py-4 shadow-xs">
      <h2 className="text-sm font-semibold text-slate-950">Remarks</h2>
      <Textarea placeholder="Add remarks here..." className="min-h-28 text-xs!" />
      <p className="text-[11px] text-slate-500">0 / 500 characters</p>
    </Card>
  );
}

function ApprovalHistoryCard() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs">
      <h2 className="text-sm font-semibold text-slate-950">
        Approval History
      </h2>
      <div className="flex min-h-28 items-center justify-center text-sm text-slate-500">
        No approval record yet.
      </div>
    </Card>
  );
}
