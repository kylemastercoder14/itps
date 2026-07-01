"use client"

import { useMemo, useState } from "react"
import {
  Banknote,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Grid3X3,
  HelpCircle,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
} from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import {
  PAYROLL_SETTINGS_COMPONENT_CATEGORIES,
  PAYROLL_SETTINGS_COMPONENT_DATA,
  PAYROLL_COMPONENT_CATEGORY_BREAKDOWN,
  PAYROLL_COMPONENT_CATEGORY_DATA,
  PAYROLL_COMPONENT_CATEGORY_SUMMARY,
  PAYROLL_SETTINGS_CONTRIBUTION_BREAKDOWN,
  PAYROLL_SETTINGS_CONTRIBUTION_DATA,
  PAYROLL_SETTINGS_DEDUCTION_CATEGORIES,
  PAYROLL_SETTINGS_DEDUCTION_DATA,
  PAYROLL_SETTINGS_RULE_CATEGORIES,
  PAYROLL_SETTINGS_RULE_DATA,
  PAYROLL_SETTINGS_SUMMARY_DATA,
  PAYROLL_SETTINGS_TAX_DATA,
  PAYROLL_SETTINGS_TAX_DISTRIBUTION,
} from "@/constants/admin-dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "general", label: "General Settings" },
  { id: "components", label: "Pay Components" },
  { id: "deductions", label: "Deductions" },
  { id: "rules", label: "Payroll Rules" },
  { id: "taxes", label: "Taxes" },
  { id: "contributions", label: "Government Contributions" },
  { id: "bank", label: "Bank Accounts" },
  { id: "email", label: "Email Notifications" },
] as const

type TabId = (typeof TABS)[number]["id"]

const TONE_DOT = {
  green: "bg-emerald-500",
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  violet: "bg-violet-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  amber: "bg-amber-500",
  slate: "bg-slate-500",
  brown: "bg-stone-600",
} as const

export function PayrollSettingsOverview() {
  const [activeTab, setActiveTab] = useState<TabId>("general")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Settings className="size-4 text-zinc-900" />
          <ChevronRight className="size-4 text-zinc-500" />
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">Payroll Settings</h1>
        </div>
        <Button className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "border-b-2 px-1 pb-4 text-sm font-semibold",
              activeTab === tab.id
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-slate-600 hover:text-slate-950"
            )}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "general" ? <GeneralSettingsTab /> : null}
      {activeTab === "components" ? <ComponentsTab /> : null}
      {activeTab === "deductions" ? <DeductionsTab /> : null}
      {activeTab === "rules" ? <RulesTab /> : null}
      {activeTab === "taxes" ? <TaxesTab /> : null}
      {activeTab === "contributions" ? <ContributionsTab /> : null}
      {activeTab === "bank" ? <SimpleSettingsTab title="Bank Accounts" description="Configure payroll disbursement bank accounts." icon={Banknote} /> : null}
      {activeTab === "email" ? <SimpleSettingsTab title="Email Notifications" description="Configure payslip and payroll email delivery." icon={Mail} /> : null}
    </div>
  )
}

function GeneralSettingsTab() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <SettingsCard title="Payroll Information">
          <FormGrid>
            <Field label="Company Name"><Input defaultValue="NAD IT Solutions Inc." /></Field>
            <Field label="Payroll Start Date"><Input defaultValue="January 1, 2026" /></Field>
            <Field label="Payroll Frequency"><SelectField value="monthly" options={["Monthly"]} /></Field>
            <Field label="Time Zone"><SelectField value="asia-manila" options={["(GMT+08:00) Asia/Manila"]} /></Field>
            <Field label="Payroll Cut-off Day"><SelectField value="last-day" options={["Last Day of the Month"]} /></Field>
            <Field label="Default Pay Type"><SelectField value="regular" options={["Regular Payroll"]} /></Field>
          </FormGrid>
        </SettingsCard>
        <SettingsCard title="Pay Period Settings">
          <FormGrid>
            <Field label="Pay Period Start"><SelectField value="first-day" options={["1st Day of the Month"]} /></Field>
            <Field label="Payment Date"><SelectField value="fifth-day" options={["5th Day of the Following Month"]} /></Field>
            <Field label="Pay Period End"><SelectField value="last-day" options={["Last Day of the Month"]} /></Field>
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">Example: For May 1-31 payroll, payment date will be June 5.</div>
          </FormGrid>
        </SettingsCard>
        <SettingsCard title="Rounding Settings">
          <FormGrid>
            <Field label="Rounding Method"><SelectField value="nearest" options={["Round to Nearest"]} /></Field>
            <ToggleField title="Round Final Net Pay" note="Round final net pay amount based on selected rounding method." defaultChecked />
            <Field label="Rounding Value"><SelectField value="centavo" options={["0.01 (Centavo)"]} /></Field>
          </FormGrid>
        </SettingsCard>
        <SettingsCard title="Overtime Settings">
          <FormGrid columns="md:grid-cols-3">
            <Field label="Overtime Rate (Regular Days)"><Input defaultValue="1.25" /></Field>
            <Field label="Overtime Rate (Rest Days)"><Input defaultValue="1.30" /></Field>
            <Field label="Overtime Rate (Holidays)"><Input defaultValue="2.00" /></Field>
          </FormGrid>
        </SettingsCard>
        <SettingsCard title="Other Preferences">
          <div className="grid gap-4 md:grid-cols-3">
            <ToggleField title="Auto-calculate Payroll" note="Automatically calculate payroll when generating." defaultChecked />
            <ToggleField title="Include Inactive Employees" note="Include inactive employees in payroll generation." />
            <ToggleField title="Lock Payroll After Payment" note="Prevent changes after payroll has been marked as paid." defaultChecked />
            <ToggleField title="Allow Payroll Edits After Approval" note="Allow changes to payroll after approved." />
            <ToggleField title="Require Approval Before Payment" note="Payroll must be approved before marking as paid." defaultChecked />
            <ToggleField title="Enable Payslip Email Distribution" note="Automatically send payslips to employees via email." defaultChecked />
          </div>
        </SettingsCard>
        <div className="flex justify-between">
          <Button variant="outline"><RotateCcw className="size-4" />Reset to Default</Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800"><Save className="size-4" />Save Changes</Button>
        </div>
      </div>
      <aside className="space-y-5">
        <SummaryCard title="Payroll Summary (This Year)" rows={PAYROLL_SETTINGS_SUMMARY_DATA} />
        <ActiveComponentsCard />
        <QuickActions title="Quick Actions" items={["Pay Components", "Deductions", "Government Contributions", "Payroll Rules"]} />
        <HelpCard topic="payroll settings" />
      </aside>
    </div>
  )
}

function ComponentsTab() {
  const [showCategories, setShowCategories] = useState(false)

  if (showCategories) {
    return <ComponentCategoriesView onBack={() => setShowCategories(false)} />
  }

  return (
    <DataTabLayout
      title="Pay Components"
      description="Manage earnings, deductions, benefits, and other payroll components."
      addLabel="Add Component"
      tabs={["All Components", "Earnings", "Deductions", "Benefits", "Loans", "Other"]}
      searchPlaceholder="Search components..."
      sideTitle="Component Summary"
      sideRows={[["Total Components", "24"], ["Earnings", "12"], ["Deductions", "8"], ["Benefits", "3"], ["Loans", "1"], ["Other", "0"], ["Active Components", "22"], ["Inactive Components", "2"]]}
      chartTitle="Component Categories"
      chartData={PAYROLL_SETTINGS_COMPONENT_CATEGORIES}
      quickItems={["Add Component", "Component Categories", "Reorder Components"]}
      onCategoriesClick={() => setShowCategories(true)}
    >
      <StandardTable
        columns={["Component Name", "Category", "Type", "Calculation Method", "Taxable", "Status", "Actions"]}
        rows={PAYROLL_SETTINGS_COMPONENT_DATA.map((item) => [
          <NameCell key="name" name={item.name} description={item.description} tone={item.tone} />,
          <Tag key="category" label={item.category} tone={item.category === "Deductions" ? "orange" : item.category === "Benefits" ? "blue" : "green"} />,
          item.type,
          item.method,
          <Tag key="taxable" label={item.taxable} tone={item.taxable === "Yes" ? "green" : "red"} />,
          <Tag key="status" label={item.status} tone="green" />,
          <RowActions key="actions" />,
        ])}
      />
    </DataTabLayout>
  )
}

function DeductionsTab() {
  return (
    <DataTabLayout
      title="Deductions"
      description="Manage employee deductions such as taxes, loans, and other withholdings."
      addLabel="Add Deduction"
      tabs={["All Deductions", "Statutory", "Loans", "Other Deductions"]}
      searchPlaceholder="Search deductions..."
      sideTitle="Deduction Summary"
      sideRows={[["Total Deductions", "8"], ["Statutory Deductions", "4"], ["Loan Deductions", "3"], ["Other Deductions", "1"], ["Active Deductions", "8"], ["Inactive Deductions", "0"]]}
      chartTitle="Deduction Categories"
      chartData={PAYROLL_SETTINGS_DEDUCTION_CATEGORIES}
      quickItems={["Add Deduction", "Component Categories", "Reorder Deductions"]}
    >
      <StandardTable
        columns={["Deduction Name", "Category", "Type", "Calculation Method", "Cap / Limit", "Taxable", "Status", "Actions"]}
        rows={PAYROLL_SETTINGS_DEDUCTION_DATA.map((item) => [
          <NameCell key="name" name={item.name} description={item.description} tone={item.tone} />,
          <Tag key="category" label={item.category} tone={item.category === "Loans" ? "orange" : item.category === "Other" ? "slate" : "blue"} />,
          item.type,
          item.method,
          item.cap,
          <Tag key="taxable" label={item.taxable} tone={item.taxable === "Yes" ? "green" : "red"} />,
          <Tag key="status" label={item.status} tone="green" />,
          <RowActions key="actions" />,
        ])}
      />
    </DataTabLayout>
  )
}

function RulesTab() {
  return (
    <DataTabLayout
      title="Payroll Rules"
      description="Define rules that control how payroll is calculated for your organization."
      addLabel="Add Rule"
      searchPlaceholder="Search rules..."
      sideTitle="Rules Summary"
      sideRows={[["Total Rules", "15"], ["Active Rules", "13"], ["Inactive Rules", "2"]]}
      chartTitle="Rules by Category"
      chartData={PAYROLL_SETTINGS_RULE_CATEGORIES}
      quickItems={["Add Rule", "Rule Templates", "Reorder Rules", "View Audit Log"]}
    >
      <StandardTable
        columns={["Rule Name", "Applies To", "Condition", "Action / Result", "Priority", "Status", "Actions"]}
        rows={PAYROLL_SETTINGS_RULE_DATA.map((item) => [
          <NameCell key="name" name={item.name} description={item.description} tone={item.tone} />,
          <Multiline key="applies" value={item.appliesTo} />,
          <Multiline key="condition" value={item.condition} />,
          item.result,
          item.priority,
          <Tag key="status" label={item.status} tone="green" />,
          <RowActions key="actions" />,
        ])}
      />
    </DataTabLayout>
  )
}

function TaxesTab() {
  return (
    <DataTabLayout
      title="Taxes"
      description="Configure tax settings and rates used in payroll calculations."
      addLabel="Add Tax"
      tabs={["All Taxes", "Withholding Taxes", "Percentage Taxes", "Fixed Amount Taxes"]}
      searchPlaceholder="Search taxes..."
      sideTitle="Tax Summary"
      sideRows={[["Total Taxes", "8"], ["Active Taxes", "7"], ["Inactive Taxes", "1"], ["Withholding Taxes", "2"], ["Percentage Taxes", "3"], ["Fixed Amount Taxes", "3"]]}
      chartTitle="Tax Distribution"
      chartData={PAYROLL_SETTINGS_TAX_DISTRIBUTION}
      quickItems={["Add Tax", "Tax Tables", "Reorder Taxes", "Tax Report"]}
    >
      <StandardTable
        columns={["Tax Name", "Type", "Applies To", "Calculation Method", "Rate / Amount", "Status", "Actions"]}
        rows={PAYROLL_SETTINGS_TAX_DATA.map((item) => [
          <NameCell key="name" name={item.name} description={item.description} tone={item.tone} />,
          <Tag key="type" label={item.type} tone={item.type === "Withholding" ? "green" : item.type === "Fixed Amount" ? "violet" : "blue"} />,
          item.appliesTo,
          item.method,
          item.rate,
          <Tag key="status" label={item.status} tone={item.status === "Active" ? "green" : "red"} />,
          <RowActions key="actions" />,
        ])}
      />
    </DataTabLayout>
  )
}

function ContributionsTab() {
  return (
    <DataTabLayout
      title="Government Contributions"
      description="Configure mandatory government contributions and rates used in payroll calculations."
      addLabel="Add Contribution"
      tabs={["All Contributions", "SSS", "PhilHealth", "Pag-IBIG", "HDMF", "Others"]}
      searchPlaceholder="Search contributions..."
      sideTitle="Contribution Summary"
      sideRows={[["Total Contributions", "7"], ["Mandatory Contributions", "3"], ["Optional Contributions", "4"], ["Active Contributions", "5"], ["Inactive Contributions", "2"]]}
      chartTitle="Contribution Cost Breakdown"
      chartData={PAYROLL_SETTINGS_CONTRIBUTION_BREAKDOWN}
      quickItems={["Contribution Groups", "Rate History", "Contribution Report", "Compliance Calendar"]}
      note="Government contribution rates are subject to change based on regulations. Please ensure rates are updated regularly."
    >
      <StandardTable
        columns={["Contribution Name", "Agency", "Employee Share", "Employer Share", "Computation Basis", "Status", "Actions"]}
        rows={PAYROLL_SETTINGS_CONTRIBUTION_DATA.map((item) => [
          <NameCell key="name" name={item.name} description={item.description} tone={item.tone} />,
          <span key="agency">{item.agency}<br /><Tag label={item.category} tone={item.category === "Mandatory" ? "green" : "violet"} /></span>,
          <Multiline key="employee" value={item.employeeShare} />,
          <Multiline key="employer" value={item.employerShare} />,
          <Multiline key="basis" value={item.basis} />,
          <Tag key="status" label={item.status} tone={item.status === "Active" ? "green" : "red"} />,
          <RowActions key="actions" />,
        ])}
      />
    </DataTabLayout>
  )
}

function DataTabLayout({
  title,
  description,
  addLabel,
  tabs,
  searchPlaceholder,
  sideTitle,
  sideRows,
  chartTitle,
  chartData,
  quickItems,
  note,
  onCategoriesClick,
  children,
}: {
  title: string
  description: string
  addLabel: string
  tabs?: readonly string[]
  searchPlaceholder: string
  sideTitle: string
  sideRows: readonly (readonly [string, string])[]
  chartTitle: string
  chartData: readonly { name: string; value: number; note?: string; fill: string }[]
  quickItems: readonly string[]
  note?: string
  onCategoriesClick?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 p-5">
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <div className="flex gap-3">
            {title === "Pay Components" || title === "Deductions" ? (
              <Button variant="outline" onClick={onCategoriesClick}><Grid3X3 className="size-4" />Component Categories</Button>
            ) : null}
            {title === "Pay Components" ? (
              <AddComponentSheet />
            ) : title === "Deductions" ? (
              <AddDeductionSheet />
            ) : title === "Payroll Rules" ? (
              <AddRuleSheet />
            ) : (
              <Button className="bg-zinc-900 hover:bg-zinc-800"><Plus className="size-4" />{addLabel}</Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-5">
          <div className="flex flex-wrap gap-2">
            {(tabs ?? []).map((tab, index) => (
              <Button key={tab} variant={index === 0 ? "default" : "outline"} className={cn(index === 0 && "bg-blue-50 text-blue-700 hover:bg-blue-100")}>{tab}</Button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative min-w-64">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-10 pr-9" placeholder={searchPlaceholder} />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </div>
        {children}
        {note ? <div className="mx-5 mb-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">{note}</div> : null}
        <Pager total={title.toLowerCase()} />
      </Card>
      <aside className="space-y-5">
        <SummaryCard title={sideTitle} rows={sideRows} />
        <DonutCard title={chartTitle} data={chartData} />
        <QuickActions title="Quick Actions" items={quickItems} />
        <HelpCard topic={title.toLowerCase()} />
      </aside>
    </div>
  )
}

function ComponentCategoriesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 p-5">
          <div>
            <h3 className="font-bold">Component Categories</h3>
            <p className="mt-1 text-sm text-slate-500">Organize payroll components by categories for better management.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>Back to Components</Button>
            <AddCategorySheet />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3 px-5 pb-5">
          <div className="relative min-w-72">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-10 pr-9" placeholder="Search categories..." />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Component Type</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYROLL_COMPONENT_CATEGORY_DATA.map((category) => (
              <TableRow key={category.name} className="h-20">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className={cn("flex size-10 items-center justify-center rounded-full text-white", TONE_DOT[category.tone])}>
                      <CircleDollarSign className="size-5" />
                    </span>
                    <span className="font-semibold">{category.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-72 text-slate-600">{category.description}</TableCell>
                <TableCell><Tag label={category.type} tone={categoryTone(category.type)} /></TableCell>
                <TableCell className="font-semibold">{category.components}</TableCell>
                <TableCell><Tag label={category.status} tone="green" /></TableCell>
                <TableCell><RowActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pager total="8 categories" />
      </Card>
      <aside className="space-y-5">
        <SummaryCard title="Category Summary" rows={PAYROLL_COMPONENT_CATEGORY_SUMMARY} />
        <DonutCard title="Components by Category" data={PAYROLL_COMPONENT_CATEGORY_BREAKDOWN} />
        <QuickActions title="Quick Actions" items={["Add Category", "Manage Components", "Reorder Categories"]} />
        <HelpCard topic="component categories" />
      </aside>
    </div>
  )
}

function AddCategorySheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-zinc-900 hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Category
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-4xl" side="right">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-bold">Add Component Category</SheetTitle>
          <SheetDescription>
            Create category for organizing payroll components.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 p-6 xl:grid-cols-[1fr_18rem]">
          <div className="space-y-5">
            <SettingsCard title="Category Information">
              <FormGrid columns="grid-cols-1">
                <SheetField label="Category Name" required>
                  <Input placeholder="e.g., Earnings" className="h-11" />
                </SheetField>
                <SheetField label="Description">
                  <Textarea placeholder="e.g., Components that add to employee gross pay" className="min-h-24" />
                </SheetField>
                <SheetField label="Component Type" required>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      ["Earning", "Adds to gross pay", "green"],
                      ["Deduction", "Subtracts from gross pay", "red"],
                      ["Reimbursement", "Repays expenses", "blue"],
                      ["Benefit", "Non-cash benefits", "violet"],
                      ["Tax", "Statutory taxes", "orange"],
                      ["Government Contribution", "Mandatory contributions", "cyan"],
                    ].map(([title, note, tone]) => (
                      <label key={title} className={cn("rounded-lg border p-3 text-sm", title === "Earning" ? "border-emerald-300 bg-emerald-50" : "border-slate-200")}>
                        <div className="flex items-start justify-between gap-2">
                          <span className="flex gap-2">
                            <span className={cn("size-6 rounded-full", TONE_DOT[tone as keyof typeof TONE_DOT])} />
                            <span>
                              <span className="block font-semibold">{title}</span>
                              <span className="text-xs text-slate-500">{note}</span>
                            </span>
                          </span>
                          <Checkbox defaultChecked={title === "Earning"} />
                        </div>
                      </label>
                    ))}
                  </div>
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Category Settings">
              <FormGrid>
                <SheetField label="Status" required>
                  <SelectField value="active" options={["Active", "Inactive"]} />
                </SheetField>
                <SheetField label="Display Order" required>
                  <Input defaultValue="1" className="h-11" />
                </SheetField>
                <SheetField label="Icon & Color">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {["green", "red", "blue", "violet", "orange", "cyan", "amber", "slate"].map((tone) => (
                        <span key={tone} className={cn("size-8 rounded-full ring-2 ring-white", TONE_DOT[tone as keyof typeof TONE_DOT])} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["#16a34a", "#ef4444", "#2563eb", "#7c3aed", "#f97316", "#06b6d4", "#f59e0b", "#64748b"].map((color) => (
                        <span key={color} className="size-6 rounded-full" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Applicability">
              <SheetField label="Available To" required>
                <SegmentedChoices options={["All Employees", "Specific Departments", "Specific Positions", "Custom Selection"]} active="All Employees" />
              </SheetField>
              <FormGrid>
                <SheetField label="Departments">
                  <SelectField value="departments" options={["Select departments (if applicable)", "Information Technology", "Human Resources"]} />
                </SheetField>
                <SheetField label="Positions">
                  <SelectField value="positions" options={["Select positions (if applicable)", "Software Developer", "HR Specialist"]} />
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Additional Notes">
              <SheetField label="Notes (Optional)">
                <Textarea placeholder="Enter any additional notes or guidelines for this category" />
              </SheetField>
            </SettingsCard>
          </div>
          <aside className="space-y-5">
            <CategoryPreviewCard />
            <ComponentTypesGuideCard />
            <HelpCard topic="component categories and how they work in payroll" />
          </aside>
        </div>
        <SheetFooter className="border-t bg-white px-6 py-4">
          <div className="flex justify-between gap-3">
            <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
            <Button className="bg-zinc-900 hover:bg-zinc-800"><Save className="size-4" />Save Category</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function CategoryPreviewCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-emerald-50/60 p-5 shadow-sm">
      <h3 className="font-bold">Category Preview</h3>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CircleDollarSign className="size-5" />
        </span>
        <div>
          <p className="font-bold">Earnings</p>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Earning</Badge>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">Components that add to employee gross pay</p>
      <div className="mt-4 space-y-3 border-t pt-4 text-sm">
        <InfoLine label="Type" value="Earning" />
        <InfoLine label="Status" value="Active" />
      </div>
    </Card>
  )
}

function ComponentTypesGuideCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Component Types Guide</h3>
      <div className="mt-4 space-y-4 text-sm">
        <GuideItem title="Earning" note="Increases gross pay. Examples: Basic Salary, Allowances, Bonuses" tone="green" />
        <GuideItem title="Deduction" note="Decreases gross pay. Examples: Loans, Advances, Taxes" tone="red" />
        <GuideItem title="Reimbursement" note="Repays employee expenses. Examples: Medical, Travel" tone="blue" />
        <GuideItem title="Benefit" note="Non-cash benefits. Examples: HMO, Insurance" tone="violet" />
        <GuideItem title="Tax" note="Statutory taxes. Examples: Withholding Tax" tone="orange" />
        <GuideItem title="Government Contribution" note="Mandatory contributions. Examples: SSS, PhilHealth, Pag-IBIG" tone="blue" />
      </div>
    </Card>
  )
}

function categoryTone(type: string): "green" | "red" | "orange" | "blue" | "violet" | "slate" | "cyan" | "amber" {
  if (type === "Earning") return "green"
  if (type === "Deduction") return "red"
  if (type === "Reimbursement") return "blue"
  if (type === "Benefit") return "violet"
  if (type === "Tax") return "orange"
  if (type === "Gov. Contribution") return "cyan"
  return "slate"
}

function AddComponentSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-zinc-900 hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Component
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-5xl" side="right">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-bold">Add Pay Component</SheetTitle>
          <SheetDescription>
            Create earning, deduction, or reimbursement component for payroll calculations.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 p-6 xl:grid-cols-[1fr_20rem]">
          <div className="space-y-5">
            <SettingsCard title="Component Information">
              <FormGrid>
                <SheetField label="Component Name" required>
                  <Input placeholder="e.g., Transportation Allowance" className="h-11" />
                </SheetField>
                <SheetField label="Component Code" required>
                  <Input placeholder="e.g., TRANS_ALLOW" className="h-11" />
                </SheetField>
                <SheetField label="Component Type" required>
                  <SegmentedChoices options={["Earning", "Deduction", "Reimbursement"]} active="Earning" />
                </SheetField>
                <SheetField label="Category" required>
                  <SelectField value="select-category" options={["Select category", "Earnings", "Benefits", "Deductions", "Loans"]} />
                </SheetField>
                <div className="md:col-span-2">
                  <SheetField label="Description">
                    <Textarea placeholder="Enter component description (optional)" className="min-h-24" />
                  </SheetField>
                </div>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Calculation Settings">
              <FormGrid>
                <SheetField label="Calculation Method" required>
                  <SelectField value="fixed" options={["Fixed Amount", "Percentage", "Formula", "Table Lookup"]} />
                </SheetField>
                <SheetField label="Amount" required>
                  <Input placeholder="0.00" className="h-11" />
                </SheetField>
                <SheetField label="Pay Frequency" required>
                  <SelectField value="monthly" options={["Monthly", "Semi-Monthly", "Weekly", "Per Payroll"]} />
                </SheetField>
                <SheetField label="Effective Date" required>
                  <Input defaultValue="05/24/2025" className="h-11" />
                </SheetField>
                <ToggleField title="Taxable" note="Include this component in taxable income." defaultChecked />
                <ToggleField title="Prorated" note="Prorate amount for partial-pay periods." />
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Applicability">
              <div className="space-y-5">
                <SheetField label="Applies To" required>
                  <SegmentedChoices options={["All Employees", "Specific Departments", "Specific Positions", "Custom Selection"]} active="All Employees" />
                </SheetField>
                <FormGrid>
                  <SheetField label="Departments">
                    <SelectField value="departments" options={["Select departments (if applicable)", "Information Technology", "Human Resources", "Finance"]} />
                  </SheetField>
                  <SheetField label="Positions">
                    <SelectField value="positions" options={["Select positions (if applicable)", "Software Developer", "HR Specialist", "Accountant"]} />
                  </SheetField>
                </FormGrid>
              </div>
            </SettingsCard>

            <SettingsCard title="Additional Settings">
              <FormGrid>
                <SheetField label="Display Order">
                  <Input defaultValue="0" className="h-11" />
                </SheetField>
                <ToggleField title="Status" note="Inactive components will not be included in payroll." defaultChecked />
                <div className="md:col-span-2">
                  <SheetField label="Notes (Optional)">
                    <Textarea placeholder="Add internal notes about this component" />
                  </SheetField>
                </div>
              </FormGrid>
            </SettingsCard>
          </div>

          <aside className="space-y-5">
            <ComponentPreviewCard />
            <ComponentTypeGuideCard />
            <CalculationMethodCard />
            <HelpCard topic="pay components and calculation methods" />
          </aside>
        </div>
        <SheetFooter className="border-t bg-white px-6 py-4">
          <div className="flex justify-between gap-3">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Save className="size-4" />
              Save Component
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function AddDeductionSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-zinc-900 hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Deduction
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-5xl" side="right">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-bold">Add Deduction</SheetTitle>
          <SheetDescription>
            Configure deduction rules, limits, and applicability for payroll processing.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 p-6 xl:grid-cols-[1fr_20rem]">
          <div className="space-y-5">
            <SettingsCard title="Deduction Information">
              <FormGrid>
                <SheetField label="Deduction Name" required>
                  <Input placeholder="e.g., Pag-IBIG Loan" className="h-11" />
                </SheetField>
                <SheetField label="Deduction Code" required>
                  <Input placeholder="e.g., PAGIBIG_LOAN" className="h-11" />
                </SheetField>
                <div className="md:col-span-2">
                  <SheetField label="Description">
                    <Textarea placeholder="Describe when and why this deduction applies" className="min-h-24" />
                  </SheetField>
                </div>
                <SheetField label="Deduction Category" required>
                  <SelectField value="deductions" options={["Deductions", "Statutory", "Loans", "Other Deductions"]} />
                </SheetField>
                <SheetField label="Related To">
                  <SelectField value="employee" options={["Employee", "Dependent", "Company"]} />
                </SheetField>
                <SheetField label="Is Mandatory?" required>
                  <SegmentedChoices options={["Yes", "No"]} active="Yes" />
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Calculation Settings">
              <FormGrid>
                <SheetField label="Calculation Method" required>
                  <SelectField value="fixed" options={["Fixed Amount", "Percentage", "Salary Bracket", "Tax Table", "Formula"]} />
                </SheetField>
                <SheetField label="Amount" required>
                  <Input placeholder="0.00" className="h-11" />
                </SheetField>
                <SheetField label="Pay Frequency" required>
                  <SelectField value="monthly" options={["Monthly", "Semi-Monthly", "Weekly", "Per Payroll"]} />
                </SheetField>
                <SheetField label="Effective Date" required>
                  <Input defaultValue="05/24/2025" className="h-11" />
                </SheetField>
                <SheetField label="Maximum Amount (Optional)">
                  <Input placeholder="0.00" className="h-11" />
                </SheetField>
                <SheetField label="Priority Order">
                  <Input defaultValue="1" className="h-11" />
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Applicability">
              <div className="space-y-5">
                <SheetField label="Applies To" required>
                  <SegmentedChoices options={["All Employees", "Specific Departments", "Specific Positions", "Custom Selection"]} active="All Employees" />
                </SheetField>
                <FormGrid>
                  <SheetField label="Departments">
                    <SelectField value="departments" options={["Select departments (if applicable)", "Information Technology", "Human Resources", "Finance"]} />
                  </SheetField>
                  <SheetField label="Positions">
                    <SelectField value="positions" options={["Select positions (if applicable)", "Software Developer", "HR Specialist", "Accountant"]} />
                  </SheetField>
                </FormGrid>
              </div>
            </SettingsCard>

            <SettingsCard title="Additional Settings">
              <FormGrid>
                <SheetField label="Taxable Deduction?">
                  <SelectField value="no" options={["No", "Yes"]} />
                </SheetField>
                <SheetField label="Affects Net Pay?">
                  <SelectField value="yes" options={["Yes", "No"]} />
                </SheetField>
                <SheetField label="Display Order">
                  <Input defaultValue="0" className="h-11" />
                </SheetField>
                <ToggleField title="Status" note="Inactive deductions will not be applied in payroll." defaultChecked />
                <div className="md:col-span-2">
                  <SheetField label="Notes (Optional)">
                    <Textarea placeholder="Add internal notes about this deduction" />
                  </SheetField>
                </div>
              </FormGrid>
            </SettingsCard>
          </div>

          <aside className="space-y-5">
            <DeductionPreviewCard />
            <DeductionTypeGuideCard />
            <HelpCard topic="deductions and how they affect payroll" />
          </aside>
        </div>
        <SheetFooter className="border-t bg-white px-6 py-4">
          <div className="flex justify-between gap-3">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Save className="size-4" />
              Save Deduction
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function DeductionPreviewCard() {
  return (
    <Card className="rounded-lg border-red-200 bg-red-50/60 p-5 shadow-sm">
      <h3 className="font-bold">Deduction Preview</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <CircleDollarSign className="size-5" />
        </span>
        <div>
          <p className="font-bold">New Deduction</p>
          <Badge variant="secondary" className="bg-red-100 text-red-700">Deduction</Badge>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-700">Deduction for employee Pag-IBIG multi-purpose loan</p>
      <div className="mt-5 space-y-3 border-t pt-4 text-sm">
        <InfoLine label="Type" value="Deduction" />
        <InfoLine label="Calculation" value="Fixed Amount" />
        <InfoLine label="Amount" value="₱0.00" />
        <InfoLine label="Pay Frequency" value="Monthly" />
        <InfoLine label="Applies To" value="All Employees" />
        <InfoLine label="Status" value="Active" />
      </div>
    </Card>
  )
}

function DeductionTypeGuideCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Deduction Types Guide</h3>
      <div className="mt-4 space-y-4 text-sm">
        <GuideItem title="Mandatory Deductions" note="Required by law or policy. Examples: SSS, Pag-IBIG, PhilHealth" tone="red" />
        <GuideItem title="Loan Deductions" note="Employee loans and advances. Examples: Pag-IBIG Loan, Salary Loan" tone="orange" />
        <GuideItem title="Tax Deductions" note="Statutory tax withholdings. Examples: Withholding Tax, BIR" tone="violet" />
        <GuideItem title="Other Deductions" note="Other authorized deductions. Examples: Union Dues, Insurance" tone="blue" />
      </div>
    </Card>
  )
}

function AddRuleSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-zinc-900 hover:bg-zinc-800">
          <Plus className="size-4" />
          Add Rule
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-5xl" side="right">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-bold">Add Payroll Rule</SheetTitle>
          <SheetDescription>
            Build rule logic for payroll calculations, validations, and notifications.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 p-6 xl:grid-cols-[1fr_20rem]">
          <div className="space-y-5">
            <SettingsCard title="Rule Information">
              <FormGrid>
                <SheetField label="Rule Name" required>
                  <Input placeholder="e.g., Overtime Rate Rule" className="h-11" />
                </SheetField>
                <SheetField label="Rule Code" required>
                  <Input placeholder="e.g., OVERTIME_RATE" className="h-11" />
                </SheetField>
                <div className="md:col-span-2">
                  <SheetField label="Description">
                    <Textarea placeholder="Describe what this rule does and when it applies" className="min-h-24" />
                  </SheetField>
                </div>
                <SheetField label="Rule Category" required>
                  <SelectField value="select-category" options={["Select category", "Calculation", "Component", "Validation", "Notification"]} />
                </SheetField>
                <SheetField label="Priority" required>
                  <Input defaultValue="1" className="h-11" />
                </SheetField>
                <ToggleField title="Status" note="Active rules will be applied in payroll." defaultChecked />
                <SheetField label="Effective Date" required>
                  <Input defaultValue="05/24/2025" className="h-11" />
                </SheetField>
              </FormGrid>
            </SettingsCard>

            <SettingsCard title="Rule Conditions">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">Apply rule when</span>
                  <SelectField value="all" options={["ALL", "ANY"]} />
                  <span className="text-slate-500">conditions are met</span>
                </div>
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_12rem_1fr_auto]">
                    <SelectField value="field" options={["Select field", "Hours Worked", "Employee Status", "Pay Group", "Department"]} />
                    <SelectField value="operator" options={["Select operator", "Greater than", "Equals", "Contains", "Between"]} />
                    <Input placeholder="Enter value" className="h-11 bg-white" />
                    <Button variant="outline" className="h-11">
                      <Plus className="size-4" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
                  No condition added yet. Add at least one condition or leave blank for global rule.
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Rule Actions">
              <div className="space-y-5">
                <SheetField label="Action Type" required>
                  <SegmentedChoices options={["Calculation", "Component", "Validation", "Notification"]} active="Calculation" />
                </SheetField>
                <FormGrid>
                  <SheetField label="Calculation Type" required>
                    <SelectField value="multiply" options={["Multiply", "Add", "Subtract", "Formula", "Table Lookup"]} />
                  </SheetField>
                  <SheetField label="Target" required>
                    <SelectField value="target" options={["Select target", "Basic Salary", "Overtime Pay", "Gross Pay", "Net Pay"]} />
                  </SheetField>
                  <SheetField label="Formula / Value" required>
                    <Input placeholder="e.g., BASE_SALARY * 1.25" className="h-11" />
                  </SheetField>
                  <SheetField label="Round Result To">
                    <SelectField value="2" options={["2 decimal places", "Nearest peso", "No rounding"]} />
                  </SheetField>
                </FormGrid>
                <SheetField label="Apply To" required>
                  <SegmentedChoices options={["Employee", "Department", "All Employees"]} active="Employee" />
                </SheetField>
              </div>
            </SettingsCard>

            <SettingsCard title="Additional Settings">
              <FormGrid>
                <ToggleField title="Stop Processing Further Rules" note="If enabled, no other rules run after this one." />
                <ToggleField title="Log Rule Execution" note="Track each time this rule runs during payroll." defaultChecked />
                <SheetField label="Notes (Optional)">
                  <Textarea placeholder="Add internal notes about this rule" />
                </SheetField>
              </FormGrid>
            </SettingsCard>
          </div>

          <aside className="space-y-5">
            <RulePreviewCard />
            <RuleCategoryGuideCard />
            <AvailableVariablesCard />
            <HelpCard topic="payroll rules and rule conditions" />
          </aside>
        </div>
        <SheetFooter className="border-t bg-white px-6 py-4">
          <div className="flex justify-between gap-3">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Save className="size-4" />
              Save Payroll Rule
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function RulePreviewCard() {
  return (
    <Card className="rounded-lg border-violet-200 bg-violet-50/60 p-5 shadow-sm">
      <h3 className="font-bold">Rule Preview</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
          <Settings className="size-5" />
        </span>
        <div>
          <p className="font-bold">New Payroll Rule</p>
          <Badge variant="secondary" className="bg-violet-100 text-violet-700">Calculation</Badge>
        </div>
      </div>
      <div className="mt-5 space-y-3 border-t pt-4 text-sm">
        <InfoLine label="Category" value="Calculation" />
        <InfoLine label="Priority" value="1" />
        <InfoLine label="Effective Date" value="05/24/2025" />
        <InfoLine label="Conditions" value="0 conditions" />
        <InfoLine label="Actions" value="0 actions" />
        <InfoLine label="Status" value="Active" />
      </div>
    </Card>
  )
}

function RuleCategoryGuideCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Rule Categories</h3>
      <div className="mt-4 space-y-4 text-sm">
        <GuideItem title="Calculation Rules" note="Compute rates, totals, and salary amounts" tone="green" />
        <GuideItem title="Component Rules" note="Add or modify pay components" tone="red" />
        <GuideItem title="Validation Rules" note="Validate data and business logic" tone="orange" />
        <GuideItem title="Notification Rules" note="Trigger alerts and approvals" tone="violet" />
      </div>
    </Card>
  )
}

function AvailableVariablesCard() {
  const variables = [
    ["BASE_SALARY", "Basic salary amount"],
    ["HOURS_WORKED", "Total hours worked"],
    ["OVERTIME_HOURS", "Overtime hours"],
    ["DAILY_RATE", "Daily rate amount"],
    ["ALLOWANCES", "Total allowances"],
    ["DEDUCTIONS", "Total deductions"],
  ]

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Available Variables</h3>
      <p className="mt-1 text-xs text-slate-500">Use these variables in formulas.</p>
      <div className="mt-4 space-y-3 text-sm">
        {variables.map(([name, note]) => (
          <div key={name} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-blue-700">{name}</p>
            <p className="text-xs text-slate-500">{note}</p>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-4 w-full text-blue-600">View All Variables</Button>
    </Card>
  )
}

function ComponentPreviewCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-emerald-50/60 p-5 shadow-sm">
      <h3 className="font-bold">Component Preview</h3>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CircleDollarSign className="size-5" />
        </span>
        <div>
          <p className="font-bold">New Component</p>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Earning</Badge>
        </div>
      </div>
      <div className="mt-5 space-y-3 border-t pt-4 text-sm">
        <InfoLine label="Type" value="Earning" />
        <InfoLine label="Calculation" value="Fixed Amount" />
        <InfoLine label="Pay Frequency" value="Monthly" />
      </div>
    </Card>
  )
}

function ComponentTypeGuideCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Component Types</h3>
      <div className="mt-4 space-y-4 text-sm">
        <GuideItem title="Earning" note="Add to gross pay: Basic Salary, Allowances, Bonuses" tone="green" />
        <GuideItem title="Deduction" note="Subtract from gross pay: tax, loans, advances" tone="red" />
        <GuideItem title="Reimbursement" note="Repay employee expenses" tone="blue" />
      </div>
    </Card>
  )
}

function CalculationMethodCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Calculation Methods</h3>
      <div className="mt-4 space-y-3 text-sm">
        {[
          ["Fixed Amount", "Set amount for each pay period"],
          ["Percentage", "Based on percentage of base amount"],
          ["Formula", "Custom calculation formula"],
          ["Table Lookup", "Based on value from a table"],
        ].map(([title, note]) => (
          <div key={title}>
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-slate-500">{note}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SheetField({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm">
      <span className="font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

function SegmentedChoices({ options, active }: { options: string[]; active: string }) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked={option === active} />
          {option}
        </label>
      ))}
    </div>
  )
}

function GuideItem({ title, note, tone }: { title: string; note: string; tone: "green" | "red" | "blue" | "violet" | "orange" | "cyan" }) {
  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "mt-1 size-3 rounded-full",
          tone === "green" && "bg-emerald-500",
          tone === "red" && "bg-red-500",
          tone === "blue" && "bg-blue-500",
          tone === "violet" && "bg-violet-500",
          tone === "orange" && "bg-orange-500",
          tone === "cyan" && "bg-cyan-500"
        )}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-slate-500">{note}</p>
      </div>
    </div>
  )
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function SimpleSettingsTab({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Icon className="size-5" /></span>
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label={`${title} Name`}><Input placeholder={`Enter ${title.toLowerCase()} name`} /></Field>
          <Field label="Status"><SelectField value="active" options={["Active"]} /></Field>
          <Field label="Default"><ToggleField title="Set as default" note="Use this as default setting." /></Field>
        </div>
        <div className="mt-8 flex justify-end">
          <Button className="bg-zinc-900 hover:bg-zinc-800"><Save className="size-4" />Save Changes</Button>
        </div>
      </Card>
      <aside className="space-y-5">
        <QuickActions title="Quick Actions" items={[`Add ${title}`, `${title} Settings`, `${title} History`]} />
        <HelpCard topic={title.toLowerCase()} />
      </aside>
    </div>
  )
}

function StandardTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>{columns.map((column) => <TableHead key={column}>{column}</TableHead>)}</TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index} className="h-16">
            {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-lg border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-5">{children}</div>
    </Card>
  )
}

function FormGrid({ children, columns = "md:grid-cols-2" }: { children: React.ReactNode; columns?: string }) {
  return <div className={cn("grid gap-5", columns)}>{children}</div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm">
      <span className="font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-full"><SelectValue /></SelectTrigger>
      <SelectContent>{options.map((option, index) => <SelectItem key={option} value={index === 0 ? value : option}>{option}</SelectItem>)}</SelectContent>
    </Select>
  )
}

function ToggleField({ title, note, defaultChecked = false }: { title: string; note: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Switch defaultChecked={defaultChecked} />
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{note}</p>
      </div>
    </div>
  )
}

function NameCell({ name, description, tone }: { name: string; description: string; tone: keyof typeof TONE_DOT }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex size-9 items-center justify-center rounded-full text-white", TONE_DOT[tone])}>
        <BriefcaseBusiness className="size-4" />
      </span>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function Tag({ label, tone }: { label: string; tone: "green" | "red" | "orange" | "blue" | "violet" | "slate" | "cyan" | "amber" }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        tone === "green" && "bg-emerald-50 text-emerald-700",
        tone === "red" && "bg-red-50 text-red-700",
        tone === "orange" && "bg-orange-50 text-orange-700",
        tone === "blue" && "bg-blue-50 text-blue-700",
        tone === "violet" && "bg-violet-50 text-violet-700",
        tone === "slate" && "bg-slate-100 text-slate-700",
        tone === "cyan" && "bg-cyan-50 text-cyan-700",
        tone === "amber" && "bg-amber-50 text-amber-700"
      )}
    >
      {label}
    </Badge>
  )
}

function Multiline({ value }: { value: string }) {
  return <span>{value.split("\n").map((line) => <span key={line} className="block">{line}</span>)}</span>
}

function RowActions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" className="size-8"><Pencil className="size-4" /></Button>
      <Button variant="outline" size="icon" className="size-8"><MoreVertical className="size-4" /></Button>
    </div>
  )
}

function SummaryCard({ title, rows }: { title: string; rows: readonly (readonly [string, string])[] }) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-5 space-y-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <span className="text-slate-600">{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function DonutCard({ title, data }: { title: string; data: readonly { name: string; value: number; note?: string; fill: string }[] }) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data])

  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="relative mt-4">
        <ChartContainer config={{ value: { label: title } }} className="mx-auto h-44 aspect-square">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={44} outerRadius={64}>
              {data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="space-y-2 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between gap-3">
            <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: item.fill }} />{item.name}</span>
            <span className="font-semibold">{item.value}{item.note ? ` (${item.note})` : total ? ` (${Math.round((item.value / total) * 100)}%)` : ""}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ActiveComponentsCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Active Pay Components</h3>
      <div className="mt-5 space-y-3 text-sm">
        {[
          ["Earnings (Allowances)", "12", "green"],
          ["Deductions", "8", "pink"],
          ["Taxes", "3", "orange"],
          ["Loans", "2", "red"],
          ["Other Benefits", "4", "blue"],
        ].map(([label, value, tone]) => (
          <div key={label} className="flex justify-between">
            <span className="flex items-center gap-2"><span className={cn("size-2 rounded-full", TONE_DOT[tone as keyof typeof TONE_DOT])} />{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-5 w-full text-blue-600">Manage Components</Button>
    </Card>
  )
}

function QuickActions({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 space-y-4 text-sm">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-blue-50 text-blue-600"><Settings className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{item}</p>
              <p className="text-xs text-slate-500">Manage {item.toLowerCase()}</p>
            </div>
            <ChevronRight className="size-4 text-slate-400" />
          </div>
        ))}
      </div>
    </Card>
  )
}

function HelpCard({ topic }: { topic: string }) {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="size-5 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-700">Learn more about {topic}</p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">View Help Center</Button>
        </div>
      </div>
    </Card>
  )
}

function Pager({ total }: { total: string }) {
  return (
    <div className="flex items-center justify-between border-t p-4 text-sm text-slate-600">
      <span>Showing 1 to 10 of {total}</span>
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <Select defaultValue="10">
          <SelectTrigger className="h-9 w-20"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="10">10</SelectItem></SelectContent>
        </Select>
        {["<", "1", "2", ">"].map((item) => (
          <Button key={item} variant={item === "1" ? "default" : "outline"} size="icon" className={cn("size-9", item === "1" && "bg-zinc-900 hover:bg-zinc-800")}>{item}</Button>
        ))}
      </div>
    </div>
  )
}
