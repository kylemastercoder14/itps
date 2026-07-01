"use client";
import { ArrowUpRight } from "lucide-react";

import { DTR_TAB_DATA, DTR_TABLE_DATA } from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function DtrTable() {
  const router = useRouter();
  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 border-zinc-200 bg-white shadow-xs">
      <Tabs defaultValue="all" className="min-w-0">
        <TabsList variant="line" className="justify-start">
          {DTR_TAB_DATA.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-9 px-3 text-xs data-active:text-black group-data-[variant=line]/tabs-list:data-active:after:bg-black"
            >
              {tab.label} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead className="w-12 px-4">
              <Checkbox aria-label="Select all DTR rows" />
            </TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Time Out</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DTR_TABLE_DATA.map((row) => {
            return (
              <TableRow key={row.id} className="h-15 hover:bg-zinc-50">
                <TableCell className="px-4">
                  <Checkbox aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell className="font-medium text-slate-800">
                  {row.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{row.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{row.name}</p>
                      <p className="text-xs text-slate-500">{row.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <p className="font-medium text-slate-900">{row.shift}</p>
                  <p className="text-xs text-slate-500">{row.schedule}</p>
                </TableCell>
                <TableCell className={timeTone(row.timeIn)}>
                  {row.timeIn}
                </TableCell>
                <TableCell className={timeTone(row.timeOut)}>
                  {row.timeOut}
                </TableCell>
                <TableCell className="font-semibold">{row.hours}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      router.push(
                        `/admin/attendance/daily-attendance/bur345trg73459f7-f034`,
                      )
                    }
                    size="icon"
                    className="size-8"
                  >
                    <ArrowUpRight className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
        <span>Showing 1 to 10 of 18 entries</span>
        <div className="flex items-center gap-1.5">
          <span>Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger size="sm" className="h-8 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon-sm" className="text-xs">
            1
          </Button>
          <Button variant="outline" size="icon-sm" className="text-xs">
            2
          </Button>
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md",
        status === "Present" && "bg-emerald-50 text-emerald-700",
        status.startsWith("Late") && "bg-orange-50 text-orange-700",
        status === "Absent" && "bg-red-50 text-red-700",
        status === "On Leave" && "bg-violet-50 text-violet-700",
        status === "Work From Home" && "bg-blue-50 text-blue-700",
      )}
    >
      {status}
    </Badge>
  );
}

function timeTone(value: string) {
  if (value === "-") return "text-slate-500";
  if (value.startsWith("08:1") || value.startsWith("08:2")) {
    return "font-semibold text-orange-600";
  }
  return "font-semibold text-emerald-600";
}
