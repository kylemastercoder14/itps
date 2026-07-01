import { PAYROLL_SUMMARY_DATA } from "@/constants/admin-dashboard"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function PayrollSummaryCard() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Payroll Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-zinc-100 px-3 py-3">
          <p className="text-xs font-medium text-zinc-500">
            Current Payroll Period
          </p>
          <p className="text-sm font-bold text-blue-700">
            June 1 - June 15, 2026
          </p>
        </div>
        <div className="mt-3 space-y-1">
          {PAYROLL_SUMMARY_DATA.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-lg px-3 py-3 text-xs odd:bg-white even:bg-zinc-100"
            >
              <span className="truncate font-medium text-blue-700">
                {item.label}
              </span>
              <span
                className={cn(
                  "font-bold tabular-nums text-zinc-800",
                  item.tone === "danger" && "text-red-600",
                  item.tone === "success" && "text-emerald-600"
                )}
              >
                {item.value}
              </span>
              <span className="font-semibold text-zinc-500">—</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button variant="outline" className="rounded-lg text-sm border-zinc-300 text-zinc-800 hover:bg-zinc-100">
            Review Payroll
          </Button>
          <Button className="rounded-lg bg-zinc-900 text-sm text-white hover:bg-zinc-800">
            Generate Payslips
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
