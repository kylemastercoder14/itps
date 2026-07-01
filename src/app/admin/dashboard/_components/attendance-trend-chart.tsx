"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { ATTENDANCE_TREND_DATA } from "@/constants/admin-dashboard";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ATTENDANCE_RANGE_OPTIONS = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 15 Days", value: "15" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
] as const;

export function AttendanceTrendChart() {
  const latest = ATTENDANCE_TREND_DATA.at(-1);

  return (
    <Card className="py-4">
      <CardHeader className="items-start">
        <div>
          <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm">
            Attendance over time
          </CardTitle>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              {latest?.present.toLocaleString() ?? 0}
            </span>
            <span className="text-xs font-medium text-zinc-500">
              present
            </span>
            <span className="text-zinc-400">—</span>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              {latest?.absent.toLocaleString() ?? 0}
            </span>
            <span className="text-sm font-medium text-zinc-500">absent</span>
          </div>
        </div>
        <CardAction>
          <Select defaultValue="30">
            <SelectTrigger size="sm" className="rounded-md text-xs">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent align="end">
              {ATTENDANCE_RANGE_OPTIONS.map((option) => (
                <SelectItem className="text-xs" key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            absent: { label: "Absent", color: "#fb2c36" },
            present: { label: "Present", color: "#1447e6" },
          }}
          className="h-85 w-full aspect-auto"
        >
          <LineChart
            data={ATTENDANCE_TREND_DATA}
            margin={{ bottom: 18, left: -20, right: 8, top: 16 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              fontSize="10px"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize="10px"
              domain={[0, 1500]}
              ticks={[0, 300, 600, 900, 1200, 1500]}
            />
            <ChartTooltip
              cursor={{ stroke: "#d4d4d8", strokeDasharray: "3 3" }}
              content={<AttendanceTrendTooltip />}
            />
            <Line
              dot={false}
              activeDot={{ r: 3 }}
              dataKey="present"
              stroke="var(--color-present)"
              strokeWidth={1}
            />
            <Line
              dot={false}
              activeDot={{ r: 3 }}
              dataKey="absent"
              stroke="var(--color-absent)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-5 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-blue-700" />
            Present
          </div>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-red-500" />
            Absent
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type AttendanceTrendTooltipPayload = {
  color?: string;
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
};

function AttendanceTrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: AttendanceTrendTooltipPayload[];
  label?: string | number;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="min-w-40 rounded-sm shadow-md border bg-card px-3 py-3 text-xs">
      <p className="mb-2 font-semibold text-zinc-900">{label}</p>
      <div className="space-y-4">
        {payload.map((item) => {
          const labelText = formatTooltipLabel(item.dataKey ?? item.name);

          return (
            <div key={labelText} className="space-y-1">
              <div className="flex items-center gap-1 text-zinc-600">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{labelText}</span>
              </div>
              <span className="inline-flex rounded-sm bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-800">
                {formatTooltipValue(item.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatTooltipLabel(value?: string | number) {
  return String(value ?? "")
    .replace(/^\w/, (letter) => letter.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2");
}

function formatTooltipValue(value?: number | string) {
  return typeof value === "number" ? value.toLocaleString() : String(value ?? "-");
}
