"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeInfo,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Pencil,
  Save,
  Search,
  Trash2,
} from "lucide-react";

import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import {
  PAYROLL_DEDUCTIONS_DATA,
  PAYROLL_EARNINGS_DATA,
  PAYROLL_EMPLOYEE_DATA,
  PAYROLL_EXCLUDED_EMPLOYEE_DATA,
  PAYROLL_GENERATE_KPI_DATA,
  PAYROLL_REVIEW_KPI_DATA,
  PAYROLL_SUMMARY_DETAILS,
} from "@/constants/admin-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IconCreditCardFilled } from "@tabler/icons-react";

type PayrollEmployee =
  | (typeof PAYROLL_EMPLOYEE_DATA)[number]
  | (typeof PAYROLL_EXCLUDED_EMPLOYEE_DATA)[number];

const STEPS = [
  {
    step: 1,
    title: "Select Criteria",
    description: "Choose payroll parameters",
  },
  { step: 2, title: "Review Employees", description: "120 included" },
  {
    step: 3,
    title: "Generate Payroll",
    description: "Configure payroll details",
  },
  { step: 4, title: "Confirm & Generate", description: "Review and confirm" },
] as const;

export function PayrollGenerateWizard() {
  const [step, setStep] = useState(1);
  const kpis = step === 2 ? PAYROLL_REVIEW_KPI_DATA : PAYROLL_GENERATE_KPI_DATA;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        currentStep={step}
        totalSteps={STEPS.length}
        onBack={() => setStep((current) => Math.max(1, current - 1))}
        onNext={() => setStep((current) => Math.min(STEPS.length, current + 1))}
      />
      <PayrollKpis items={kpis} />
      <Stepper
        value={step}
        onValueChange={setStep}
        indicators={{ completed: <Check className="size-3.5" /> }}
      >
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs">
          <StepperNav>
            {STEPS.map((item) => (
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
                {item.step < STEPS.length ? (
                  <StepperSeparator className="mx-3 group-data-[state=completed]/step:bg-zinc-900" />
                ) : null}
              </StepperItem>
            ))}
          </StepperNav>
        </div>
        <StepperPanel className="mt-5">
          <StepperContent value={1}>
            <CriteriaStep />
          </StepperContent>
          <StepperContent value={2}>
            <ReviewEmployeesStep />
          </StepperContent>
          <StepperContent value={3}>
            <GeneratePayrollStep
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          </StepperContent>
          <StepperContent value={4}>
            <ConfirmGenerateStep onBack={() => setStep(3)} />
          </StepperContent>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

function PageHeader({
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
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IconCreditCardFilled className="size-4 text-zinc-900" />
        <div className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">
            Generate Payroll
          </h1>
        </div>
      </div>
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
          onClick={onNext}
        >
          {currentStep === totalSteps
            ? "Generate Payroll"
            : `Next: ${nextStepLabel(currentStep)}`}
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

function nextStepLabel(step: number) {
  return (
    ["Review Employees", "Generate Payroll", "Confirm & Generate"][step - 1] ??
    "Next"
  );
}

function PayrollKpis({
  items,
}: {
  items: typeof PAYROLL_GENERATE_KPI_DATA | typeof PAYROLL_REVIEW_KPI_DATA;
}) {
  return (
    <section
      className={cn(
        "grid gap-4",
        items.length === 6
          ? "sm:grid-cols-2 xl:grid-cols-6"
          : "sm:grid-cols-2 xl:grid-cols-5",
      )}
    >
      {items.map((item) => (
        <Card
          key={item.title}
          className="min-h-17 rounded-xl border-zinc-200 bg-white px-4 py-4 shadow-xs"
        >
          <div className="flex h-full items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="w-fit border-b border-dotted border-zinc-400 text-xs font-bold text-zinc-700">
                {item.title}
              </p>
              <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-normal text-zinc-500">
                {item.note}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}

function CriteriaStep() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <SelectedRunCard />
        <EmployeeSelectionCard compact />
      </div>
      <aside className="space-y-5">
        <PayrollConfigurationCard />
        <PayrollSummaryCard />
      </aside>
    </div>
  );
}

function SelectedRunCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-3 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold">Selected Payroll Run</h3>
          <div className="grid mt-3 gap-8 text-sm md:grid-cols-3">
            <InfoPair label="Pay Period" value="May 1 - May 31, 2026" />
            <InfoPair label="Pay Date" value="May 31, 2026" />
            {/* <InfoPair label="Payroll Type" value="Monthly" /> */}
            <InfoPair label="Company" value="NAD IT Solutions Inc." />
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmployeeSelectionCard({ compact = false }: { compact?: boolean }) {
  const data = compact
    ? PAYROLL_EMPLOYEE_DATA.slice(0, 5)
    : PAYROLL_EMPLOYEE_DATA;

  return (
    <Card className="overflow-hidden rounded-xl px-5 py-4 border-zinc-200 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-bold">Employees ({compact ? "124" : "120"})</h3>
        {!compact ? (
          <div className="flex gap-2">
            <Button variant="outline">Bulk Actions</Button>
            <Button variant="outline">Export</Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-60">
          <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-9 text-xs! bg-transparent border-input pr-9"
            placeholder="Search employee..."
          />
        </div>
        <FilterSelect
          value="all-departments"
          options={[
            "All Departments",
            "Information Technology",
            "Human Resources",
            "Finance",
          ]}
        />
        <FilterSelect
          value="all-types"
          options={["All Employment Types", "Regular", "Probationary"]}
        />
        <FilterSelect
          value="all-locations"
          options={["All Locations", "Head Office", "Branch Office"]}
        />
      </div>
      <EmployeeTable employees={data} showStatus={!compact} />
      {!compact ? <ExcludedEmployeesSection /> : null}
      <TablePager total={compact ? "124 employees" : "124 employees"} />
    </Card>
  );
}

function EmployeeTable({
  employees,
  showStatus,
}: {
  employees: readonly PayrollEmployee[];
  showStatus: boolean;
}) {
  return (
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead className="w-10">
            <Checkbox defaultChecked />
          </TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Employee ID</TableHead>
          <TableHead>Department</TableHead>
          {showStatus ? <TableHead>Employment Type</TableHead> : null}
          {showStatus ? <TableHead>Location</TableHead> : null}
          <TableHead>Basic Salary</TableHead>
          <TableHead>Allowances</TableHead>
          <TableHead>Deductions</TableHead>
          <TableHead>Net Pay</TableHead>
          {showStatus ? <TableHead>Status</TableHead> : null}
          {!showStatus ? <TableHead /> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.employeeId} className="h-14">
            <TableCell>
              <Checkbox defaultChecked />
            </TableCell>
            <TableCell>
              <EmployeeName employee={employee} />
            </TableCell>
            <TableCell>{employee.employeeId}</TableCell>
            <TableCell>{employee.department}</TableCell>
            {showStatus ? (
              <TableCell>{employee.employmentType}</TableCell>
            ) : null}
            {showStatus ? <TableCell>{employee.location}</TableCell> : null}
            <TableCell>{employee.basicSalary}</TableCell>
            <TableCell>{employee.allowances}</TableCell>
            <TableCell>{employee.deductions}</TableCell>
            <TableCell>{employee.netPay}</TableCell>
            {showStatus ? (
              <TableCell>
                <StatusBadge status={employee.status} />
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ExcludedEmployeesSection() {
  return (
    <div className="border-t bg-red-50/50">
      <p className="px-5 py-3 text-sm font-bold text-red-600">
        Excluded Employees (4)
      </p>
      <EmployeeTable employees={PAYROLL_EXCLUDED_EMPLOYEE_DATA} showStatus />
    </div>
  );
}

function ReviewEmployeesStep() {
  return (
    <div className="grid gap-5">
      <div className="space-y-5">
        <h3 className="font-semibold text-sm">Review Employees</h3>
        <div className="flex gap-2">
          {["All (124)", "Included (120)", "Excluded (4)"].map((tab, index) => (
            <Button
              key={tab}
              variant={index === 0 ? "default" : "outline"}
              className={cn(index === 0 && "bg-zinc-900 hover:bg-zinc-800")}
            >
              {tab}
            </Button>
          ))}
        </div>
        <EmployeeSelectionCard />
      </div>
    </div>
  );
}

function GeneratePayrollStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="space-y-5">
        <PayrollParametersCard />
        <div className="grid gap-5 lg:grid-cols-3">
          <AmountBreakdownCard
            title="Earnings"
            total="₱1,348,000.00"
            rows={PAYROLL_EARNINGS_DATA}
            tone="green"
          />
          <AmountBreakdownCard
            title="Deductions"
            total="₱152,876.00"
            rows={PAYROLL_DEDUCTIONS_DATA}
            tone="red"
          />
          <SummaryBreakdownCard />
        </div>
        <AdditionalOptionsCard />
      </div>
    </div>
  );
}

function ConfirmGenerateStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <div>
          <h2 className="text-sm font-semibold">Confirm & Generate Payroll</h2>
          <p className="text-xs text-slate-600">
            Please review all details below. Once you confirm, payroll will be
            generated and locked.
          </p>
        </div>
        <div className="rounded-xl border border-green-100 bg-green-50 px-5 py-4">
          <div className="flex gap-3">
            <CheckCircle2 className="size-6 text-green-600" />
            <div>
              <p className="font-bold text-sm text-green-800">
                You are ready to generate payroll
              </p>
              <p className="text-xs text-green-700">
                All checks passed. You can generate payroll for selected period.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <PayrollDetailsCard />
          <FinalPayrollSummaryCard />
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              <BadgeInfo className="size-5" />
              <div>
                <p className="font-bold text-sm">
                  Please confirm to generate payroll
                </p>
                <p className="text-xs text-muted-foreground">
                  Once generated, payroll will be locked and payslips will be
                  available after generation.
                </p>
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold">
              <Checkbox />I have reviewed all details and confirm information is
              correct.
            </label>
          </div>
        </div>
      </div>
      <aside className="space-y-5">
        <PayrollSummaryCard />
        <ValidationChecklistCard />
      </aside>
    </div>
  );
}

function PayrollConfigurationCard() {
  return (
    <Card className="rounded-xl border-zinc-200 gap-4! px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payroll Configuration</h3>
      <div className="flex flex-col gap-y-5 text-xs">
        <FilterSelect
          label="Pay Period"
          value="may-2026"
          options={["May 1, 2026 -> May 31, 2026"]}
        />
        <FilterSelect
          label="Pay Date"
          value="may-31"
          options={["May 31, 2026"]}
        />
        <FilterSelect
          label="Payroll Type"
          value="monthly"
          options={["Monthly Payroll"]}
        />
        <div>
          <p className="font-semibold">Include in Payroll</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              "Basic Salary",
              "Allowances",
              "Overtime Pay",
              "Leave Encashment",
            ].map((item, index) => (
              <label key={item} className="flex items-center gap-2">
                <Checkbox defaultChecked={index < 2} />
                {item}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2">
          <Checkbox defaultChecked />
          Employees on Leave Without Pay
        </label>
        <FilterSelect
          label="Rounding Option"
          value="round"
          options={["Round to Nearest Peso"]}
        />
      </div>
    </Card>
  );
}

function PayrollSummaryCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payroll Summary</h3>
      <SummaryRows />
    </Card>
  );
}

function SummaryRows() {
  return (
    <div className="space-y-3 text-xs">
      {PAYROLL_SUMMARY_DETAILS.slice(4).map(([label, value]) => (
        <InfoPair
          key={label}
          label={label}
          value={value}
          highlight={label.includes("Net")}
        />
      ))}
      <InfoPair label="Employer Contributions" value="₱11,700.00" />
      <InfoPair label="Total Employer Cost" value="₱158,980.00" highlight />
    </div>
  );
}

function SelectionSummaryCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Selection Summary</h3>
      <SummaryRows />
    </Card>
  );
}

function ExclusionSummaryCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Exclusion Summary</h3>
      <div className="mt-4 space-y-3 text-sm">
        <InfoPair label="Employees on Leave" value="2" />
        <InfoPair label="Employees without Pay" value="1" />
        <InfoPair label="Incomplete Data" value="1" />
        <InfoPair label="Manually Excluded" value="0" />
      </div>
    </Card>
  );
}

function PayrollParametersCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payroll Parameters</h3>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Payroll Name" required>
          <Input
            defaultValue="Monthly Payroll - May 2026"
            className="text-xs! mt-1 h-9! rounded-sm bg-transparent! border-zinc-200"
          />
        </FormField>
        <FormField label="Payroll Frequency">
          <Input
            defaultValue="Monthly"
            disabled
            className="text-xs! h-9! mt-1 rounded-sm bg-transparent! border-zinc-200"
          />
        </FormField>
        <FormField label="Pay Period" required>
          <Input
            defaultValue="May 1, 2026 - May 31, 2026"
            className="text-xs! h-9! mt-1 rounded-sm bg-transparent! border-zinc-200"
          />
        </FormField>
        <FormField label="Cut-off Date">
          <Input
            defaultValue="May 31, 2026 (10 text-xs! border-input:59 PM)"
            className="text-xs! h-9! mt-1 rounded-sm bg-transparent! border-zinc-200"
          />
        </FormField>
        <FormField label="Payment Date" required>
          <Input
            defaultValue="June 5, 2026"
            className="text-xs! h-9! mt-1 rounded-sm bg-transparent! border-zinc-200"
          />
        </FormField>
        <FormField label="Department Filter">
          <FilterSelect value="all-departments" options={["All Departments"]} />
        </FormField>
        <FormField label="Pay Type" required>
          <div className="flex gap-5 mt-1 text-sm">
            <label className="flex items-center gap-2">
              <Checkbox defaultChecked />
              Regular Payroll
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              Final Payroll
            </label>
          </div>
        </FormField>
        <FormField label="Notes (Optional)">
          <Textarea
            placeholder="Enter any notes for this payroll run"
            className="mt-1"
          />
        </FormField>
      </div>
    </Card>
  );
}

function AmountBreakdownCard({
  title,
  total,
  rows,
  tone,
}: {
  title: string;
  total: string;
  rows: readonly { label: string; amount: string }[];
  tone: "green" | "red";
}) {
  return (
    <Card
      className={cn("rounded-xl gap-3! border-zinc-200 px-5 py-4 shadow-xs")}
    >
      <h3 className={cn("font-bold")}>{title}</h3>
      <p className="text-lg font-bold">{total}</p>
      <p className="text-xs text-slate-500">Total {title.toLowerCase()}</p>
      <div className="space-y-3 text-sm">
        {rows.map((row) => (
          <InfoPair key={row.label} label={row.label} value={row.amount} />
        ))}
      </div>
      <div
        className={cn(
          "flex justify-between rounded-md p-3 bg-accent text-xs font-bold",
        )}
      >
        <span>Total {title}</span>
        <span>{total}</span>
      </div>
    </Card>
  );
}

function SummaryBreakdownCard() {
  return (
    <Card className="rounded-xl gap-3! border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Summary</h3>
      <p className="text-lg font-bold">₱1,195,124.00</p>
      <p className="text-xs text-slate-500">Total Net Pay</p>
      <div className="space-y-3 text-xs">
        <InfoPair label="Total Employees" value="120" />
        <InfoPair label="Included in Payroll" value="120" />
        <InfoPair label="Excluded from Payroll" value="4" />
        <InfoPair label="Total Earnings" value="₱1,348,000.00" />
        <InfoPair label="Total Deductions" value="₱152,876.00" />
      </div>
      <div className="flex justify-between rounded-md bg-accent p-3 text-xs font-bold">
        <span>Net Pay</span>
        <span>₱1,195,124.00</span>
      </div>
    </Card>
  );
}

function AdditionalOptionsCard() {
  const options = [
    "Include Leave Encashment",
    "Include Government Contributions",
    "Send Payslip Notification",
    "Lock Payroll After Generation",
    "Create Journal Entry",
    "Backup Payroll Data",
  ];

  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Additional Options</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option, index) => (
          <label key={option} className="flex items-center gap-2 text-xs">
            <Checkbox defaultChecked={[0, 1, 3, 4].includes(index)} />
            {option}
          </label>
        ))}
      </div>
    </Card>
  );
}

function PayrollDetailsCard() {
  return (
    <Card className="rounded-xl gap-4! border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payroll Details</h3>
      <div className="grid gap-4 text-xs md:grid-cols-2">
        {PAYROLL_SUMMARY_DETAILS.slice(0, 6).map(([label, value]) => (
          <InfoPair key={label} label={label} value={value} />
        ))}
        <InfoPair label="Generated By" value="Admin" />
        <InfoPair label="Date Generated" value="May 31, 2026 10:30 AM" />
      </div>
    </Card>
  );
}

function FinalPayrollSummaryCard() {
  return (
    <Card className="rounded-xl gap-4! border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Payroll Summary</h3>
      <div className="space-y-4">
        <InfoPair label="Total Basic Salary" value="₱1,348,000.00" />
        <InfoPair label="Total Allowances" value="₱64,150.00" />
        <InfoPair label="Total Deductions" value="₱152,876.00" />
        <InfoPair label="Total Net Pay" value="₱1,195,124.00" highlight />
      </div>
    </Card>
  );
}

function ValidationChecklistCard() {
  const items = [
    "All employees have basic salary",
    "Pay period is valid",
    "Payment date is valid",
    "All required deductions configured",
    "Employee attendance data is available",
    "No validation errors found",
  ];

  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold">Validation Checklist</h3>
      <div className="space-y-3 text-xs">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              {item}
            </span>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              Passed
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EmployeePreviewCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Employee Preview (Top 5)</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Basic Salary</TableHead>
            <TableHead>Allowances</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Net Pay</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PAYROLL_EMPLOYEE_DATA.slice(0, 5).map((employee) => (
            <TableRow key={employee.employeeId}>
              <TableCell>
                <EmployeeName employee={employee} />
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.basicSalary}</TableCell>
              <TableCell>{employee.allowances}</TableCell>
              <TableCell>{employee.deductions}</TableCell>
              <TableCell>{employee.netPay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="link" className="mt-3 h-auto p-0 text-blue-600">
        View all 120 employees
      </Button>
    </Card>
  );
}

function QuickActionsCard() {
  const actions = [
    "Include Employee",
    "Exclude Employee",
    "View Employee Details",
    "Preview Payslips",
    "Export Summary",
    "View Payroll Run History",
  ];

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="mt-4 space-y-4 text-sm">
        {actions.slice(0, 3).map((action) => (
          <div key={action} className="flex gap-3">
            <FileText className="mt-0.5 size-4 text-blue-600" />
            <div>
              <p className="font-semibold">{action}</p>
              <p className="text-xs text-slate-500">
                Manage payroll employee data
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NoteCard({ text }: { text: string }) {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 shadow-sm">
      <span className="flex gap-2">
        <BadgeInfo className="size-4" />
        {text}
      </span>
    </Card>
  );
}

function FilterSelect({
  label,
  value,
  options,
}: {
  label?: string;
  value: string;
  options: string[];
}) {
  return (
    <label className="space-y-2">
      {label ? (
        <span className="text-xs font-semibold text-slate-700">{label}</span>
      ) : null}
      <Select defaultValue={value}>
        <SelectTrigger className="h-9 mt-1 text-xs w-full min-w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={option} value={index === 0 ? value : option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function InfoPair({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-600 text-xs">{label}:</span>
      <span
        className={cn(
          "font-semibold text-xs text-slate-950",
          highlight && "text-blue-700",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function EmployeeName({ employee }: { employee: PayrollEmployee }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-blue-100 text-blue-700">
          {employee.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{employee.employee}</p>
        <p className="text-xs text-slate-500">{employee.position}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "Included"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700",
      )}
    >
      {status}
    </Badge>
  );
}

function TablePager({ total }: { total: string }) {
  return (
    <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600">
      <span>Showing 1 to 10 of {total}</span>
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
  );
}
