import { DEPARTMENT_DATA } from "@/constants/admin-dashboard"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const MAX_EMPLOYEES = Math.max(
  ...DEPARTMENT_DATA.map((item) => item.employees),
)

export function DepartmentChartCard() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Employees by Department
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-center">
        <div className="space-y-4">
          {DEPARTMENT_DATA.map((item) => (
            <div key={item.department} className="space-y-1.5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
                <span className="truncate font-medium text-zinc-600">
                  {item.department}
                </span>
                <span className="font-semibold tabular-nums text-zinc-700">
                  {item.employees.toLocaleString()}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-xs bg-zinc-100">
                <div
                  className="h-full rounded-xs bg-sky-500"
                  style={{
                    width: `${Math.max(8, (item.employees / MAX_EMPLOYEES) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
