"use client";

import {
  IconFileImport,
  IconTableExport,
  IconUserFilled,
} from "@tabler/icons-react";
import { EmployeeKpiGrid } from "./employee-kpi-grid";
import { EmployeeTableCard } from "./employee-table-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function EmployeesOverview() {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <IconUserFilled className="size-4 text-zinc-900" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-900">
            Employee List
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            <IconTableExport className="size-4" />
            Export
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/employees/bulk-import")}
            className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          >
            <IconFileImport className="size-4" />
            Bulk import
          </Button>
          <Button
            onClick={() => router.push("/admin/employees/new")}
            className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
          >
            Add new employee
          </Button>
        </div>
      </div>
      <EmployeeKpiGrid />
      <EmployeeTableCard />
    </div>
  );
}
