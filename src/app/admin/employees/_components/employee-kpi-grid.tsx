import { EMPLOYEE_KPI_DATA } from "@/constants/admin-dashboard";
import { Card } from "@/components/ui/card";

export function EmployeeKpiGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {EMPLOYEE_KPI_DATA.map((item) => {
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
                <p className="mt-1 text-xs font-normal text-zinc-500">
                  {item.note}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
