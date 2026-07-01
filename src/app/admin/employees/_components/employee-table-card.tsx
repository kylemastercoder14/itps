/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Columns3,
  Eye,
  EyeOff,
  GripVertical,
  MoreVertical,
  Search,
} from "lucide-react";

import { EMPLOYEE_TABLE_DATA } from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

type Employee = {
  contact: string;
  dateHired: string;
  department: string;
  email: string;
  id: string;
  initials: string;
  name: string;
  position: string;
  status: "On Probation" | "Regular" | "Resigned";
  tone: "blue" | "pink" | "slate";
};

const STATUS_STYLES = {
  "On Probation": "bg-orange-100 text-orange-800",
  Regular: "bg-emerald-100 text-emerald-800",
  Resigned: "bg-red-100 text-red-800",
} as const;

const COLUMN_MENU = [
  "status",
  "department",
  "position",
  "dateHired",
  "contact",
] as const;

export function EmployeeTableCard() {
  "use no memo";

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    contact: true,
    dateHired: true,
    department: true,
    position: true,
    status: true,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const data = useMemo<Employee[]>(
    () => EMPLOYEE_TABLE_DATA.map((employee) => ({ ...employee })),
    [],
  );

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all employees"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label={`Select ${row.original.name}`}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          />
        ),
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Employee",
        cell: ({ row }) => (
          <div className="flex min-w-60 items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback>{row.original.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-semibold text-zinc-900">
                {row.original.name}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {row.original.id} · {row.original.email}
              </p>
            </div>
          </div>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={cn(STATUS_STYLES[row.original.status])}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "position",
        header: "Position",
      },
      {
        accessorKey: "dateHired",
        header: "Date Hired",
      },
      {
        accessorKey: "contact",
        header: "Contact",
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-4" />
          </Button>
        ),
        enableHiding: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
    },
  });

  return (
    <section className="overflow-hidden rounded-xl border shadow-xs border-zinc-200 bg-white">
      <div className="flex min-h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4">
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-11 border-0 bg-transparent px-0 text-sm font-medium shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="probation">On probation</SelectItem>
            <SelectItem value="resigned">Resigned</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search and filter"
            className="h-9 pl-9 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent shadow-none text-sm"
          />
        </div>

        <ColumnsMenu table={table} />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-zinc-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-10 whitespace-nowrap px-4 font-semibold text-zinc-600",
                      header.id === "select" && "w-12",
                      header.id === "actions" && "w-28 text-right",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="h-15 hover:bg-zinc-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "whitespace-nowrap px-4 text-sm text-zinc-700",
                      cell.column.id === "actions" && "text-right",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
        <span>{getPaginationLabel(table.getState().pagination, table.getFilteredRowModel().rows.length)}</span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger size="sm" className="h-8 w-20 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {[5, 10, 25, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button size="icon-sm" className="text-xs">
            {table.getState().pagination.pageIndex + 1}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

function ColumnsMenu({
  table,
}: {
  table: ReturnType<typeof useReactTable<Employee>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg text-zinc-600 hover:bg-zinc-100"
        >
          <Columns3 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 rounded-lg p-3 shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-medium text-zinc-700">
              <ArrowUpDown className="size-3.5" />
              Sort by
            </span>
            <span className="flex items-center gap-1 font-medium text-zinc-700">
              Date hired
              <ChevronDown className="size-3.5" />
            </span>
          </div>
          <div className="h-px bg-zinc-200" />
          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-500">Columns</p>
            {COLUMN_MENU.map((columnId) => {
              const column = table.getColumn(columnId);
              if (!column) return null;

              return (
                <button
                  key={columnId}
                  type="button"
                  className="flex h-7 w-full items-center gap-2 rounded-md px-1.5 text-xs text-zinc-700 hover:bg-zinc-100"
                  onClick={() =>
                    column.toggleVisibility(!column.getIsVisible())
                  }
                >
                  <GripVertical className="size-3.5 text-zinc-500" />
                  <span className="min-w-0 flex-1 truncate text-left">
                    {formatColumnName(columnId)}
                  </span>
                  {column.getIsVisible() ? (
                    <Eye className="size-3.5 text-zinc-600" />
                  ) : (
                    <EyeOff className="size-3.5 text-zinc-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function formatColumnName(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function getPaginationLabel(
  pagination: PaginationState,
  rowCount: number,
) {
  if (!rowCount) {
    return "Showing 0 employees";
  }

  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + pagination.pageSize - 1, rowCount);

  return `Showing ${start}-${end} of ${rowCount} employees`;
}
