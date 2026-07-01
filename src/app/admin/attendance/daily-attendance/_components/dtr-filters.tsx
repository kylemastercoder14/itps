import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react"

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

export function DtrFilters() {
  return (
    <Card className="rounded-xl border-zinc-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex h-9! overflow-hidden rounded-md border border-slate-200 bg-white">
          <Button variant="ghost" size="icon" className="h-9! rounded-none">
            <CalendarDays className="size-3.5" />
          </Button>
          <div className="flex min-w-40 items-center justify-center border-x px-2 text-xs font-semibold">
            July 2, 2026
          </div>
          <Button variant="ghost" size="icon" className="h-9! rounded-none">
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9! rounded-none">
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
        <FilterSelect
          value="all-departments"
          options={[
            ["all-departments", "All Departments"],
            ["it", "Information Technology"],
            ["hr", "Human Resources"],
            ["finance", "Finance"],
            ["operations", "Operations"],
          ]}
        />
        <FilterSelect
          value="all-status"
          options={[
            ["all-status", "All Status"],
            ["regular", "Regular"],
            ["probation", "Probation"],
          ]}
        />
        <FilterSelect
          value="all-shifts"
          options={[
            ["all-shifts", "All Shifts"],
            ["day", "Day Shift"],
            ["night", "Night Shift"],
          ]}
        />
        <div className="relative min-w-60">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search employee..." className="h-9 bg-transparent border-input text-xs! pr-9" />
        </div>
        <Button variant="ghost" className="h-9 rounded-lg text-xs text-zinc-700 hover:bg-zinc-100">
          <Filter className="size-3.5" />
          More Filters
        </Button>
      </div>
    </Card>
  )
}

function FilterSelect({
  value,
  options,
}: {
  value: string
  options: [string, string][]
}) {
  return (
    <label className="grid min-w-44 gap-1">
      <Select defaultValue={value}>
        <SelectTrigger className="h-10 w-full rounded-lg border-zinc-200 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([optionValue, optionLabel]) => (
            <SelectItem key={optionValue} value={optionValue}>
              {optionLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}
