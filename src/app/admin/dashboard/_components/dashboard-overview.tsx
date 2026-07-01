"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Clock3,
  Expand,
  FileText,
  Landmark,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Users,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AttendanceSummaryChart } from "./attendance-summary-chart";
import { AttendanceTrendChart } from "./attendance-trend-chart";
import { DepartmentChartCard } from "./department-chart-card";
import { GovernmentContributionsCard } from "./government-contributions-card";
import { KpiGrid } from "./kpi-grid";
import { PayrollSummaryCard } from "./payroll-summary-card";
import { PendingApprovalsCard } from "./pending-approvals-card";
import { RecentActivitiesCard } from "./recent-activities-card";
import { OnboardingCard } from "./dashboard-empty-state";
import { IconFileExport, IconHomeFilled } from "@tabler/icons-react";

const DASHBOARD_TIME_ZONE = "Asia/Manila";

type DateParts = {
  day: number;
  month: number;
  year: number;
};

type MonthCalendarData = {
  days: string[];
  month: string;
  year: string;
};

export function DashboardOverview() {
  const hasData = true;

  if (!hasData) {
    return <DashboardEmptyState />;
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <DashboardToolbar />

      <KpiGrid />

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.6fr]">
        <AttendanceTrendChart />
        <GovernmentContributionsCard />
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-3 *:data-[slot=card]:h-full *:data-[slot=card]:min-h-72">
        <AttendanceSummaryChart />
        <DepartmentChartCard />
        <PendingApprovalsCard />
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <PayrollSummaryCard />
        <RecentActivitiesCard />
      </section>
    </div>
  );
}

function DashboardToolbar() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const currentDate = useLiveDashboardDate();
  const toolbarDate = useMemo(
    () => getToolbarDateModel(currentDate),
    [currentDate],
  );

  return (
    <section className="flex flex-col gap-4 rounded-none pb-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <IconHomeFilled className="size-4 text-zinc-900" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DateRangePopover
              currentMonth={toolbarDate.currentMonth}
              previousMonth={toolbarDate.previousMonth}
              selectedDay={toolbarDate.today.day}
              todayLabel={toolbarDate.todayLong}
            />
            <ComparisonPopover comparisonLabel={toolbarDate.comparisonMedium} />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {autoRefresh ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
              <span className="size-2.5 rounded-full bg-sky-500 ring-2 ring-sky-100" />
              Just now
            </div>
          ) : (
            <div className="text-xs font-medium text-zinc-500">
              Last refreshed: {toolbarDate.refreshedTime}
            </div>
          )}
          <div className="flex items-center gap-2">
            <ToolbarActionsPopover
              autoRefresh={autoRefresh}
              onAutoRefreshChange={setAutoRefresh}
            />
            <Button
              variant="secondary"
              className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
            >
              <IconFileExport className="size-4" />
              Export
            </Button>
            <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
              Generate Payroll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolbarActionsPopover({
  autoRefresh,
  onAutoRefreshChange,
}: {
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
}) {
  const actions = [
    {
      icon: RefreshCcw,
      label: autoRefresh ? "Turn off auto-refresh" : "Turn on auto-refresh",
      onClick: () => onAutoRefreshChange(!autoRefresh),
    },
    {
      icon: Expand,
      label: "Expand to full screen",
      onClick: () => undefined,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="size-9 rounded-lg bg-zinc-200 text-zinc-700 hover:bg-zinc-300 data-[state=open]:bg-zinc-300"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-56 rounded-lg border-zinc-200 bg-white p-2 shadow-2xl"
      >
        <div className="space-y-1">
          {actions.map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100"
              type="button"
              onClick={onClick}
            >
              <Icon className="size-3.5 text-zinc-500" />
              {label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DateRangePopover({
  currentMonth,
  previousMonth,
  selectedDay,
  todayLabel,
}: {
  currentMonth: MonthCalendarData;
  previousMonth: MonthCalendarData;
  selectedDay: number;
  todayLabel: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="group rounded-lg border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 data-[state=open]:border-blue-700 data-[state=open]:ring-2 data-[state=open]:ring-blue-700/20"
        >
          <Calendar className="size-3.5" />
          Today
          <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[min(850px,calc(100vw-2rem))] overflow-hidden rounded-xl border-zinc-200 bg-white p-0"
      >
        <div className="grid min-h-80 md:grid-cols-[200px_1fr]">
          <div className="border-b border-zinc-200 bg-zinc-50 p-3 md:border-b-0 md:border-r">
            <div className="space-y-1">
              {["Today", "Yesterday"].map((item, index) => (
                <button
                  key={item}
                  className={`flex h-7 cursor-pointer w-full items-center rounded-lg px-2 text-left text-xs font-medium text-zinc-800 ${
                    index === 0 ? "bg-zinc-200" : "hover:bg-zinc-100"
                  }`}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="my-3 h-px bg-zinc-200" />
            <div className="space-y-1">
              {["Last", "Period to date"].map((item) => (
                <button
                  key={item}
                  className="flex cursor-pointer h-7 w-full items-center rounded-lg px-2 text-left text-xs font-medium text-zinc-800 hover:bg-zinc-100"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="my-3 h-px bg-zinc-200" />
            <div className="space-y-1">
              {["Black Friday", "Cyber Monday", "Quarters"].map((item) => (
                <button
                  key={item}
                  className="flex h-7 cursor-pointer w-full items-center rounded-lg px-2 text-left text-xs font-medium text-zinc-800 hover:bg-zinc-100"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="my-3 h-px bg-zinc-200" />
            <button
              className="flex h-7 cursor-pointer w-full items-center rounded-lg px-2 text-left text-xs font-medium text-zinc-800 hover:bg-zinc-100"
              type="button"
            >
              Custom range
            </button>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center">
              <div className="rounded-lg border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-800">
                {todayLabel}
              </div>
              <ArrowRight className="hidden size-4 text-zinc-500 sm:block" />
              <div className="rounded-lg border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-800">
                {todayLabel}
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                className="size-8 rounded-md border-zinc-300"
              >
                <Clock3 className="size-4" />
              </Button>
            </div>

            <div className="grid gap-5 px-5 pb-8 lg:grid-cols-2">
              <MiniMonth
                days={previousMonth.days}
                month={previousMonth.month}
                year={previousMonth.year}
              />
              <MiniMonth
                days={currentMonth.days}
                month={currentMonth.month}
                mutedFromDay={selectedDay + 1}
                selectedDay={String(selectedDay)}
                year={currentMonth.year}
              />
            </div>

            <div className="mt-auto flex justify-end gap-1.5 border-t border-zinc-200 px-4 py-3">
              <Button variant="outline" size="sm" className="text-sm">
                Cancel
              </Button>
              <Button size="sm" disabled className="text-sm">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ComparisonPopover({ comparisonLabel }: { comparisonLabel: string }) {
  const options = [
    "No comparison",
    "Yesterday",
    "Previous year",
    "Previous year (match day of week)",
    "Custom",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="group rounded-lg border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 data-[state=open]:bg-zinc-200"
        >
          <CalendarDays className="size-3.5" />
          {comparisonLabel}
          <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-72 rounded-lg border-zinc-200 bg-white p-2 shadow-2xl"
      >
        <div className="space-y-0.5">
          {options.map((option) => (
            <button
              key={option}
              className="flex cursor-pointer min-h-8 w-full items-center rounded-md px-3 text-left text-xs font-medium text-zinc-800 hover:bg-zinc-100"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MiniMonth({
  month,
  year,
  days,
  selectedDay,
  mutedFromDay,
}: {
  month: string;
  year: string;
  days: string[];
  selectedDay?: string;
  mutedFromDay?: number;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <ChevronDown className="size-4 rotate-90 text-zinc-500" />
        <p className="text-sm font-bold text-zinc-800">
          {month} <span>{year}</span>
        </p>
        <ChevronDown className="-rotate-90 size-4 text-zinc-500" />
      </div>
      <div className="grid grid-cols-7 gap-y-3 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-[11px] font-medium text-zinc-500">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const muted = mutedFromDay && day && Number(day) >= mutedFromDay;
          const selected = selectedDay === day;

          return (
            <button
              key={`${month}-${index}-${day}`}
              className={`mx-auto cursor-pointer flex size-6 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                selected
                  ? "bg-zinc-900 text-white"
                  : muted
                    ? "text-zinc-300"
                    : day
                      ? "text-zinc-700 hover:bg-zinc-100"
                      : "text-transparent"
              }`}
              disabled={!day}
              type="button"
            >
              {day || "-"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function useLiveDashboardDate() {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return currentDate;
}

function getToolbarDateModel(currentDate: Date) {
  const today = getDateParts(currentDate);
  const comparisonDate = addDays(today, -1);
  const previousMonth = addMonths(today, -1);

  return {
    comparisonMedium: formatDateParts(comparisonDate, "medium"),
    currentMonth: getMonthCalendar(today.year, today.month),
    previousMonth: getMonthCalendar(previousMonth.year, previousMonth.month),
    refreshedTime: formatRefreshedTime(currentDate),
    today,
    todayLong: formatDateParts(today, "long"),
  };
}

function getDateParts(date: Date): DateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "numeric",
    timeZone: DASHBOARD_TIME_ZONE,
    year: "numeric",
  }).formatToParts(date);

  return {
    day: Number(parts.find((part) => part.type === "day")?.value ?? 1),
    month: Number(parts.find((part) => part.type === "month")?.value ?? 1),
    year: Number(parts.find((part) => part.type === "year")?.value ?? 2026),
  };
}

function formatRefreshedTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(date);
}

function formatDateParts(parts: DateParts, style: "long" | "medium") {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(toUtcDate(parts));
}

function addDays(parts: DateParts, amount: number): DateParts {
  const date = toUtcDate(parts);
  date.setUTCDate(date.getUTCDate() + amount);

  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
}

function addMonths(parts: DateParts, amount: number): DateParts {
  const date = new Date(Date.UTC(parts.year, parts.month - 1 + amount, 1));

  return {
    day: 1,
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
}

function getMonthCalendar(year: number, month: number): MonthCalendarData {
  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const totalDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const days = [
    ...Array.from({ length: firstDay }, () => ""),
    ...Array.from({ length: totalDays }, (_, index) => String(index + 1)),
  ];

  return {
    days,
    month: new Intl.DateTimeFormat("en-US", {
      month: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, 1))),
    year: String(year),
  };
}

function toUtcDate(parts: DateParts) {
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
}

function DashboardEmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-10 lg:py-14">
      <section className="flex w-full max-w-4xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold leading-tight text-zinc-600 md:text-4xl">
          Welcome to ITPS!
          <span className="block text-zinc-900">
            Where do you want to start?
          </span>
        </h1>
        <div className="mt-8 flex h-15 w-full max-w-3xl items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 shadow-sm">
          <span className="flex size-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
            <Sparkles className="size-4" />
          </span>
          <span className="min-w-0 flex-1 truncate text-left text-base text-zinc-500">
            Help me set up workforce, attendance, and payroll
          </span>
          <Plus className="size-5 text-zinc-700" />
          <span className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-300">
            <ArrowUp className="size-4" />
          </span>
        </div>
      </section>

      <section className="mt-24 grid w-full gap-6 lg:grid-cols-2">
        <OnboardingCard
          action="Add employees"
          description="Start by creating employee profiles and assigning each person to a department."
          icon={Users}
          title="Add your first employees"
          variant="people"
        />
        <OnboardingCard
          action="Configure shifts"
          description="Set work schedules, attendance rules, and daily time record settings."
          icon={Clock3}
          title="Set up attendance tracking"
          variant="attendance"
        />
      </section>

      <section className="mt-6 grid w-full gap-6 lg:grid-cols-3">
        <OnboardingCard
          action="Create departments"
          description="Organize teams, department heads, and reporting lines."
          icon={Building2}
          title="Build your organization"
          variant="org"
        />
        <OnboardingCard
          action="Set pay period"
          description="Define payroll frequency, cut-off dates, and payment settings."
          icon={FileText}
          title="Prepare payroll settings"
          variant="payroll"
        />
        <OnboardingCard
          action="Review rates"
          description="Check SSS, PhilHealth, Pag-IBIG, and other contribution settings."
          icon={Landmark}
          title="Review government contributions"
          variant="contributions"
        />
      </section>

      <section className="mt-6 w-full max-w-2xl">
        <OnboardingCard
          action="Open checklist"
          description="Follow the setup checklist before generating your first payroll run."
          icon={ShieldCheck}
          title="Complete your system setup"
          variant="checklist"
        />
      </section>
    </div>
  );
}
