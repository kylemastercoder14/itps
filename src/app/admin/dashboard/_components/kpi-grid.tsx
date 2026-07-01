import { KPI_DATA } from "@/constants/admin-dashboard";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SparklineTrend = "up" | "down" | "flat";

const KPI_TRENDS: Record<string, SparklineTrend> = {
  "Absent Today": "down",
  "Late Today": "down",
  "On Leave": "flat",
  "Overtime Requests": "up",
  "Payroll Due": "flat",
  "Pending Approvals": "up",
  "Present Today": "up",
  "Total Employees": "up",
};

const TREND_STYLES = {
  down: "text-red-500",
  flat: "text-sky-500",
  up: "text-emerald-500",
} as const;

export function KpiGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_DATA.map((item) => {
        const trend = KPI_TRENDS[item.title] ?? "flat";

        return (
          <Card
            key={item.title}
            className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4"
          >
            <div className="flex h-full items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-base font-bold tracking-tight text-zinc-900">
                    {item.value}
                  </p>
                  {item.value === null && (
                    <span className="text-sm font-semibold text-zinc-500">
                      —
                    </span>
                  )}
                </div>
              </div>
              <Sparkline trend={trend} />
            </div>
          </Card>
        );
      })}
    </section>
  );
}

function Sparkline({ trend }: { trend: SparklineTrend }) {
  const path =
    trend === "up"
      ? "M1 28 C14 25 18 18 30 20 C42 22 45 8 59 6"
      : trend === "down"
        ? "M1 8 C14 10 18 18 30 16 C42 14 45 28 59 30"
        : "M1 18 H59";

  return (
    <svg
      aria-hidden="true"
      className={cn("h-8 w-16 shrink-0", TREND_STYLES[trend])}
      fill="none"
      viewBox="0 0 60 36"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
