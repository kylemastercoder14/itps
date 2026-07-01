"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Lightbulb,
  Search,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  BULK_IMPORT_EMPLOYEE_ROWS,
  BULK_IMPORT_MAPPING_DATA,
  BULK_IMPORT_RECENT_DATA,
  BULK_IMPORT_STATS,
  BULK_IMPORT_STEPS,
} from "@/constants/admin-dashboard";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PIE_DATA = [
  { name: "Imported", value: 114, fill: "#22c55e" },
  { name: "Warnings", value: 2, fill: "#f59e0b" },
  { name: "Failed", value: 4, fill: "#ef4444" },
];

export function BulkImportWizard() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/employees">
            <IconUserFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Bulk Import
            </h1>
          </div>
        </div>
        <BulkWizardActions
          currentStep={step}
          totalSteps={BULK_IMPORT_STEPS.length}
          onBack={() => setStep((value) => Math.max(1, value - 1))}
          onNext={() =>
            setStep((value) => Math.min(BULK_IMPORT_STEPS.length, value + 1))
          }
        />
      </div>
      <BulkStepper activeStep={step} onStepChange={setStep} />
      {step === 1 ? <UploadStep /> : null}
      {step === 2 ? <MappingStep /> : null}
      {step === 3 ? <ValidateStep /> : null}
      {step === 4 ? <ImportStep /> : null}
    </div>
  );
}

function BulkWizardActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      {currentStep > 1 ? (
        <Button
          variant="secondary"
          className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          onClick={onBack}
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Button>
      ) : null}
      <Button
        variant="secondary"
        className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
      >
        Cancel
      </Button>
      <Button
        className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
        onClick={() => {
          onNext();
          if (currentStep === totalSteps) {
            toast.success("Bulk imported successfully!");
            router.push("/admin/employees");
          }
        }}
      >
        {currentStep === totalSteps ? "Finish" : nextText(currentStep)}
        <ArrowRight className="size-3.5" />
      </Button>
    </div>
  );
}

function BulkStepper({
  activeStep,
  onStepChange,
}: {
  activeStep: number;
  onStepChange: (step: number) => void;
}) {
  return (
    <Stepper
      value={activeStep}
      onValueChange={onStepChange}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
      indicators={{ completed: <Check className="size-3.5" /> }}
    >
      <StepperNav>
        {BULK_IMPORT_STEPS.map((item) => (
          <StepperItem key={item.step} step={item.step}>
            <StepperTrigger className="gap-2">
              <StepperIndicator className="size-6 text-[10px]">
                {item.step}
              </StepperIndicator>
              <span className="hidden min-w-0 text-left xl:block">
                <StepperTitle className="text-xs font-bold text-zinc-900">
                  {item.title}
                </StepperTitle>
                <StepperDescription className="text-[10px]">
                  {item.description}
                </StepperDescription>
              </span>
            </StepperTrigger>
            {item.step < BULK_IMPORT_STEPS.length ? (
              <StepperSeparator className="mx-3 group-data-[state=completed]/step:bg-zinc-900" />
            ) : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}

function UploadStep() {
  return (
    <>
      <Card className="grid gap-6 rounded-xl border-zinc-200 bg-white px-5 py-4 shadow-xs lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="text-sm font-semibold">Import Employees in Bulk</h2>
          <p className="mt-1 text-xs text-slate-600">
            Upload an Excel file to add multiple employees at once. Download
            template file to ensure data is in correct format.
          </p>
        </div>
        <InfoPanel title="Important Notes" tone="green">
          <li>Maximum file size: 5MB</li>
          <li>Allowed file format: Excel (.xlsx, .xls)</li>
          <li>Maximum of 2,000 records per import</li>
          <li>Required fields are marked with * in template</li>
        </InfoPanel>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.9fr]">
        <div className="space-y-5">
          <Card className="rounded-xl gap-3! border-zinc-200 px-5 py-4 shadow-xs">
            <h3 className="text-sm font-semibold">1. Download Template</h3>
            <p className="text-xs text-slate-600">
              Download Excel template with correct headers and sample data.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="size-3.5" />
                Download Excel Template
              </Button>
              <span className="text-xs text-slate-500">
                File name: Employee_Import_Template.xlsx
              </span>
            </div>
          </Card>
          <Card className="rounded-xl gap-3! border-zinc-200 px-5 py-4 shadow-xs">
            <h3 className="text-sm font-semibold">2. Upload Excel File</h3>
            <p className="text-xs text-slate-600">
              Upload completed Excel file to import employee records.
            </p>
            <div className="mt-4 flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed shadow-xs">
              <UploadCloud className="size-10" />
              <p className="mt-2 text-sm font-medium">
                Drag and drop your Excel file here
              </p>
              <span className="text-sm text-slate-500">or</span>
              <Button size="sm" className="mt-2 text-xs">
                Choose File
              </Button>
            </div>
            <p className="mt-1 text-center text-xs text-slate-500">
              Supported formats: .xlsx, .xls | Maximum file size: 5MB
            </p>
          </Card>
        </div>
        <RecentImportsCard />
      </div>
      <HowToImportCard />
    </>
  );
}

function MappingStep() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_18rem]">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold">Map Columns</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Map Excel columns to corresponding fields in system.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <MiniCard
            title="File Information"
            rows={[
              "File name: Employee_Import_May2026.xlsx",
              "Total rows: 120",
            ]}
          />
          <MiniCard
            title="Mapping Progress"
            rows={["Mapped: 12 of 18 required fields"]}
            progress={66}
          />
        </div>
        <Card className="overflow-hidden py-4 px-5 rounded-xl border-zinc-200 shadow-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Excel Columns</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-40">Preview</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {BULK_IMPORT_MAPPING_DATA.map(
                ([column, preview, system, tag]) => (
                  <TableRow key={column}>
                    <TableCell>
                      <div className="font-semibold">{column}</div>
                    </TableCell>
                    <TableCell>
                      {system.includes("Do not") ? (
                        <StatusBadge status="Not mapped" />
                      ) : (
                        <StatusBadge status="Mapped" />
                      )}
                    </TableCell>
                    <TableCell>{preview}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700"
                      >
                        {tag}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="secondary" className="text-xs" size="sm">
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
      <SideHelp />
    </div>
  );
}

function ValidateStep() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_18rem]">
      <div className="space-y-5">
        <div>
          <h2 className="text-sm font-semibold">Preview & Validate</h2>
          <p className="mt-1 text-xs text-slate-600">
            Review data before importing. Check errors and warnings.
          </p>
        </div>
        <StatsGrid />
        <EmployeePreviewTable />
        <div className="grid gap-5 lg:grid-cols-3">
          <DetailsCard title="Error Details (4)" tone="red" />
          <DetailsCard title="Warning Details (2)" tone="amber" />
          <InfoPanel title="Data Quality Tips">
            <li>Check all error rows and update file.</li>
            <li>Warnings do not block import but review recommended.</li>
            <li>Use filters to view specific status.</li>
          </InfoPanel>
        </div>
      </div>
      <ValidationSidebar />
    </div>
  );
}

function ImportStep() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_18rem]">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Import Employees</h2>
            <p className="mt-1 text-xs text-slate-600">
              File has been processed and imported.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
            >
              <Download className="size-3.5" />
              Download Report
            </Button>
            <Button size="sm" className="text-xs">
              Import Another File
            </Button>
          </div>
        </div>
        <StatsGrid />
        <Card className="rounded-xl gap-1! border-zinc-200 px-5 py-4 shadow-xs">
          <h3 className="font-semibold">Import Completed</h3>
          <p className="mt-1 text-xs text-slate-600">
            All valid employees have been imported successfully.
          </p>
          <div className="mt-4 h-2.25 rounded-full bg-zinc-100">
            <div className="h-2.25 w-full rounded-full bg-green-500" />
          </div>
          <p className="mt-1 text-right text-xs font-bold">100%</p>
        </Card>
        <EmployeePreviewTable />
      </div>
      <ImportSidebar />
    </div>
  );
}

function RecentImportsCard() {
  return (
    <Card className="rounded-xl gap-2! border-zinc-200 px-5 py-2 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent Imports</h3>
        <Button variant="link" className="p-0 text-xs">
          View All
        </Button>
      </div>
      <div className="divide-y">
        {BULK_IMPORT_RECENT_DATA.map((item) => (
          <div key={item.file} className="flex items-center gap-3 py-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
              <FileSpreadsheet className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{item.file}</p>
              <p className="text-xs text-slate-500">{item.date}</p>
            </div>
            <div className="text-right">
              <Badge
                className={cn(
                  "rounded-md",
                  item.status === "Failed"
                    ? "bg-red-50 text-red-700"
                    : "bg-emerald-50 text-emerald-700",
                )}
                variant="secondary"
              >
                {item.status}
              </Badge>
              <p className="mt-1 text-xs text-slate-500">{item.result}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HowToImportCard() {
  const steps = [
    "Download Excel template.",
    "Fill in employee data following provided format.",
    "Upload completed Excel file.",
    "Map columns and validate data.",
    "Confirm and import employee records.",
  ];

  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="text-sm font-semibold">How to Import Employees</h3>
      <div className="grid gap-2">
        {steps.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-2 text-xs text-slate-700"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-black font-medium text-white">
              {index + 1}
            </span>
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {BULK_IMPORT_STATS.map((item) => (
        <Card
          key={item.label}
          className="rounded-xl border-zinc-200 px-4 py-3 shadow-xs"
        >
          <div className="flex items-center gap-4">
            <div>
              <p className="text-base font-bold">{item.value}</p>
              <p className="font-semibold text-xs">{item.label}</p>
              <p className="text-[10px] text-slate-500">{item.note}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmployeePreviewTable() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 py-4 px-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b">
        <div>
          <h3 className="font-bold text-sm">Data Preview</h3>
          <span className="text-xs text-slate-500">
            Showing 1-10 of 120 rows
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="text-xs">
            Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger size="sm" className="w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-7 h-8 bg-transparent rounded-md border-input text-xs!"
              placeholder="Search in data..."
            />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Row #</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BULK_IMPORT_EMPLOYEE_ROWS.map((row) => (
            <TableRow
              key={row.row}
              className={cn(
                row.status === "Error" && "bg-red-50/70",
                row.status === "Warning" && "bg-amber-50/70",
              )}
            >
              <TableCell>{row.row}</TableCell>
              <TableCell className="font-semibold">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell
                className={cn(
                  row.status === "Error" && "font-semibold text-red-600",
                )}
              >
                {row.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function ValidationSidebar() {
  return (
    <div className="space-y-5 mt-15.5">
      <PieCard title="Validation Summary" />
      <InfoPanel title="Validation Rules">
        {[
          "Required fields",
          "Email format",
          "Employee ID format",
          "Date format",
          "Data type check",
          "Duplicate check",
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </InfoPanel>
      <InfoPanel title="What's Next?">
        <li>If everything looks good, import 120 employees into system.</li>
      </InfoPanel>
    </div>
  );
}

function ImportSidebar({ completed }: { completed?: boolean }) {
  return (
    <div className="space-y-5">
      <PieCard title="Import Summary" />
      <InfoPanel title={completed ? "Next Steps" : "What's Next?"}>
        <li>View imported employees in Employee List.</li>
        <li>Download import report for records.</li>
        <li>Import another file if needed.</li>
      </InfoPanel>
      {completed ? (
        <InfoPanel title="All Done!" tone="green">
          <li>Bulk import completed successfully.</li>
        </InfoPanel>
      ) : (
        <InfoPanel title="Need Help?">
          <li>Check guide or contact support.</li>
        </InfoPanel>
      )}
    </div>
  );
}

function SideHelp() {
  return (
    <div className="space-y-5 mt-15.5">
      <InfoPanel title="Mapping Tips">
        <li>Map each column to correct system field.</li>
        <li>Required fields must be mapped to proceed.</li>
        <li>Use preview to verify mapping.</li>
      </InfoPanel>
      <InfoPanel title="Legend">
        <li>
          <span className="text-emerald-600">Mapped</span> - column mapped
        </li>
        <li>
          <span className="text-orange-600">Partial</span> - has warnings
        </li>
        <li>
          <span className="text-red-600">Unmapped</span> - missing field
        </li>
      </InfoPanel>
      <InfoPanel title="Need Help?">
        <li>Download template for correct column format.</li>
      </InfoPanel>
    </div>
  );
}

function PieCard({ title }: { title: string }) {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">{title}</h3>
      <div className="relative">
        <ChartContainer
          config={{ value: { label: "Rows" } }}
          className="mx-auto h-40 w-full aspect-square"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={PIE_DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={70}
            >
              {PIE_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-xl font-bold">120</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        {PIE_DATA.map((item) => (
          <div key={item.name} className="flex justify-between">
            <span className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.name}
            </span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MiniCard({
  title,
  rows,
  progress,
}: {
  title: string;
  rows: string[];
  progress?: number;
}) {
  return (
    <Card className="rounded-xl border-zinc-200 py-4 px-5 shadow-xs">
      <div className="flex gap-3">
        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          {rows.map((row) => (
            <p key={row} className="mt-1 text-xs text-slate-600">
              {row}
            </p>
          ))}
          {progress ? (
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-sm bg-slate-100">
                <div
                  className="h-2 rounded-sm bg-black"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function InfoPanel({
  title,
  tone = "blue",
  children,
}: {
  title: string;
  tone?: "blue" | "green";
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "rounded-xl border-zinc-200 px-5 gap-3! py-4 shadow-xs",
        tone === "green" ? "bg-accent" : "bg-white",
      )}
    >
      <h3 className="flex items-center gap-2 font-bold">
        {tone === "green" ? <Lightbulb className="size-4" /> : null}
        {title}
      </h3>
      <ul className="space-y-2 list-disc pl-5 text-xs text-slate-600">
        {children}
      </ul>
    </Card>
  );
}

function DetailsCard({
  title,
  tone,
}: {
  title: string;
  tone: "red" | "amber";
}) {
  return (
    <Card className={cn("rounded-xl gap-3! px-4 py-3 shadow-xs")}>
      <h3 className="font-semibold">{title}</h3>
      <div className="text-xs text-slate-600">
        <p>
          Employee ID:{" "}
          {tone === "red" ? "Missing Employee ID" : "Missing mobile number"}
        </p>
        <p>
          Email Address:{" "}
          {tone === "red"
            ? "Invalid email format"
            : "Overtime rate is unusually high"}
        </p>
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
        (status === "Valid" || status === "Mapped" || status === "Imported") &&
          "bg-green-50 text-green-700",
        status === "Warning" && "bg-amber-50 text-amber-700",
        status === "Error" && "bg-red-50 text-red-700",
        status === "Not mapped" && "bg-slate-100 text-slate-600",
      )}
    >
      {status === "Valid" || status === "Mapped" ? (
        <CheckCircle2 className="size-3" />
      ) : null}
      {status}
    </Badge>
  );
}

function nextText(step: number) {
  if (step === 1) return "Next: Map Columns";
  if (step === 2) return "Next: Preview & Validate";
  if (step === 3) return "Next: Import Employees";
  return "Next";
}
