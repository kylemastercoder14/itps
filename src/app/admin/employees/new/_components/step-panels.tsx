import { Check, Edit, Fingerprint } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ADD_EMPLOYEE_SUMMARY_DATA } from "@/constants/admin-dashboard";
import { cn } from "@/lib/utils";

import {
  Button,
  Field,
  SameAddressCheckbox,
  SelectField,
  TextareaField,
  UploadBox,
} from "./form-controls";
import { IconCircleCheckFilled } from "@tabler/icons-react";

type StepPanelProps = {
  step: number;
};

const SELECT_OPTIONS = {
  gender: ["Male", "Female", "Prefer not to say"],
  status: ["Single", "Married", "Separated", "Widowed"],
  nationality: ["Filipino", "American", "Japanese", "Korean"],
  citizenship: ["Filipino", "Dual Citizen", "Foreign National"],
  blood: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  department: [
    "Human Resources",
    "Information Technology",
    "Finance",
    "Operations",
    "Sales",
  ],
  position: [
    "HR Specialist",
    "Software Developer",
    "Accountant",
    "Operations Manager",
  ],
  employmentType: ["Regular", "Probationary", "Contractual", "Part-time"],
  schedule: ["Monday - Friday (9:00 AM - 6:00 PM)", "Flexible", "Night Shift"],
  payGroup: ["Regular", "Executive", "Contractor"],
  payType: ["Monthly", "Daily", "Hourly"],
  currency: ["PHP - Philippine Peso", "USD - US Dollar"],
  frequency: ["Semi-Monthly", "Monthly", "Weekly"],
  bank: ["BDO", "BPI", "Metrobank", "Security Bank"],
} as const;

export function StepPanel({ step }: StepPanelProps) {
  if (step === 1) return <PersonalInformationStep />;
  if (step === 2) return <JobInformationStep />;
  if (step === 3) return <CompensationStep />;
  if (step === 4) return <BiometricsStep />;
  return <ReviewSubmitStep />;
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-xl border-zinc-200 bg-white py-4 px-5 shadow-xs",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
        {title}
      </div>
      {children}
    </Card>
  );
}

function PersonalInformationStep() {
  return (
    <div className="grid gap-5">
      <div className="space-y-5">
        <Section title="Personal Information">
          <div className="grid gap-x-4 gap-y-3 lg:grid-cols-[12rem_1fr_1fr_1fr]">
            <UploadBox
              label="Upload Photo"
              hint="JPG, PNG (Max. 2MB)"
              className="min-h-20 lg:row-span-3"
            />
            <Field label="First Name" placeholder="Enter first name" required />
            <Field label="Middle Name" placeholder="Enter middle name" />
            <Field label="Last Name" placeholder="Enter last name" required />
            <Field
              label="Date of Birth"
              placeholder="Select date"
              required
              suffix="calendar"
            />
            <SelectField
              label="Gender"
              placeholder="Select gender"
              required
              options={SELECT_OPTIONS.gender}
            />
            <SelectField
              label="Civil Status"
              placeholder="Select civil status"
              required
              options={SELECT_OPTIONS.status}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field
              label="Email Address"
              placeholder="Enter email address"
              required
            />
            <SelectField
              label="Nationality"
              placeholder="Select nationality"
              required
              options={SELECT_OPTIONS.nationality}
            />
            <Field label="Religion" placeholder="Enter religion" />
          </div>
          <div className="grid gap-4 items-center md:grid-cols-2">
            <TextareaField
              label="Present Address"
              placeholder="Enter complete present address"
              required
            />
            <div className="grid gap-2">
              <TextareaField
                label="Permanent Address"
                placeholder="Enter complete permanent address"
              />
            </div>
            <SameAddressCheckbox label="Same as present address" />
          </div>
        </Section>
        <Section title="Government IDs">
          <Field label="ID Number" placeholder="Enter ID number" />
          <div className="grid gap-4 md:grid-cols-5">
            {[
              "Upload SSS ID",
              "Upload PhilHealth ID",
              "Upload Pag-IBIG ID",
              "Upload TIN ID",
              "Upload Valid ID",
            ].map((item) => (
              <UploadBox key={item} label={item} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function JobInformationStep() {
  return (
    <div className="grid gap-5">
      <Section title="Job Information">
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField
            label="Department"
            placeholder="Select department"
            required
            options={SELECT_OPTIONS.department}
          />
          <SelectField
            label="Position"
            placeholder="Select position"
            required
            options={SELECT_OPTIONS.position}
          />
          <SelectField
            label="Employment Type"
            placeholder="Select employment type"
            required
            options={SELECT_OPTIONS.employmentType}
          />
          <SelectField
            label="Employment Status"
            placeholder="Select employment status"
            required
            options={SELECT_OPTIONS.employmentType}
          />
          <div className="grid gap-2">
            <span className="text-xs font-semibold text-slate-700">
              Work Location <span className="text-red-500">*</span>
            </span>
            <RadioGroup
              defaultValue="office"
              className="flex items-center gap-5"
            >
              {["Office", "Remote", "Hybrid"].map((item) => (
                <label key={item} className="flex items-center gap-2 text-xs">
                  <RadioGroupItem value={item.toLowerCase()} />
                  {item}
                </label>
              ))}
            </RadioGroup>
          </div>
          <SelectField
            label="Work Schedule"
            placeholder="Select work schedule"
            required
            options={SELECT_OPTIONS.schedule}
          />
          <SelectField
            label="Shift (if applicable)"
            placeholder="Select shift (optional)"
            options={["Morning", "Mid", "Night"]}
          />
          <Field
            label="Date Hired"
            placeholder="Select date"
            required
            suffix="calendar"
          />
          <SelectField
            label="Probation Period (Months)"
            placeholder="Select months"
            options={["3", "6", "12"]}
          />
          <Field
            label="Probation End Date"
            placeholder="Select date"
            suffix="calendar"
          />
        </div>
        <TextareaField
          label="Job Description / Responsibilities"
          placeholder="Enter job description and key responsibilities..."
          className="mt-4"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <SelectField
            label="Reporting To"
            placeholder="Select manager or supervisor"
            options={["Jane Dela Cruz", "Robert Navarro"]}
          />
          <SelectField
            label="Position Level / Grade"
            placeholder="Select level or grade"
            options={["Staff", "Supervisor", "Manager"]}
          />
          <Field
            label="Employee ID (Auto-generated)"
            placeholder="Auto-generated after saving"
          />
          <Field label="Work Email" placeholder="Enter work email address" />
          <Field
            label="Work Phone / Extension"
            placeholder="Enter work phone or extension"
          />
          <SelectField
            label="Office / Branch"
            placeholder="Select office or branch"
            options={["Main Office", "Makati", "Cebu"]}
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {["Offer Letter", "Job Contract", "Resume / CV", "Others"].map(
            (item) => (
              <UploadBox
                key={item}
                label="Upload File"
                hint={`${item} - PDF, JPG, PNG`}
              />
            ),
          )}
        </div>
      </Section>
    </div>
  );
}

function CompensationStep() {
  return (
    <div className="grid gap-5">
      <div className="space-y-5">
        <Section title="Compensation Details">
          <div className="grid gap-4 md:grid-cols-4">
            <SelectField
              label="Pay Group"
              placeholder="Select pay group"
              required
              options={SELECT_OPTIONS.payGroup}
            />
            <SelectField
              label="Pay Type"
              placeholder="Select pay type"
              required
              options={SELECT_OPTIONS.payType}
            />
            <SelectField
              label="Salary Structure"
              placeholder="Select salary structure"
              required
              options={["Standard", "Executive"]}
            />
            <SelectField
              label="Currency"
              placeholder="Select currency"
              required
              options={SELECT_OPTIONS.currency}
            />
            <Field
              label="Basic Salary"
              placeholder="Enter basic salary"
              required
            />
            <Field
              label="Allowance (Fixed)"
              placeholder="Enter allowance amount"
            />
            <SelectField
              label="Allowance Type"
              placeholder="Select allowance type"
              options={["Rice Allowance", "Transport", "Communication"]}
            />
            <SelectField
              label="Commission Type"
              placeholder="Select commission type"
              options={["None", "Fixed", "Percentage"]}
            />
            <Field
              label="Commission Rate (%)"
              placeholder="Enter commission rate"
            />
            <SelectField
              label="Rate Per"
              placeholder="Select rate per"
              options={["Month", "Day", "Hour"]}
            />
            <Field
              label="Overtime Rate (%)"
              placeholder="Enter overtime rate"
            />
            <Field
              label="Effective Date"
              placeholder="Select date"
              required
              suffix="calendar"
            />
            <Field
              label="Salary Review Date"
              placeholder="Select date"
              suffix="calendar"
            />
            <SelectField
              label="Payroll Frequency"
              placeholder="Select frequency"
              required
              options={SELECT_OPTIONS.frequency}
            />
            <SelectField
              label="Payment Method"
              placeholder="Select payment method"
              required
              options={["Bank Transfer", "Cash", "Check"]}
            />
          </div>
        </Section>
        <Section title="Payroll Account">
          <SameAddressCheckbox label="Same as employee personal account" />
          <div className="grid gap-4 md:grid-cols-4">
            <SelectField
              label="Bank"
              placeholder="Select bank"
              required
              options={SELECT_OPTIONS.bank}
            />
            <Field
              label="Account Number"
              placeholder="Enter account number"
              required
            />
            <Field
              label="Account Name"
              placeholder="Enter account name"
              required
            />
            <SelectField
              label="Account Type"
              placeholder="Select account type"
              options={["Savings", "Checking"]}
            />
            <Field label="Branch" placeholder="Enter branch" />
          </div>
        </Section>
      </div>
    </div>
  );
}

function BiometricsStep() {
  return (
    <div className="grid gap-5">
      <Section title="Biometrics Registration">
        <div className="rounded-md bg-accent p-4 text-xs">
          Register employee biometrics for secure attendance tracking.
          <span className="float-right font-semibold">
            Employee ID: EMP-2026-0051
          </span>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SelectField
              label="Select Finger"
              placeholder="Right Thumb"
              options={["Right Thumb", "Right Index", "Left Thumb"]}
            />
            <div className="mt-4 flex min-h-45 flex-col items-center justify-center rounded-md border bg-accent text-center">
              <Fingerprint className="size-20 text-blue-700" />
              <p className="mt-4 font-bold text-slate-900">Ready to capture</p>
              <p className="text-xs text-slate-500">Place finger on scanner</p>
            </div>
            <div className="mt-4 rounded-md bg-green-50 p-4 text-xs text-green-700">
              Tips: clean finger, apply normal pressure, keep finger still.
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg h-fit border-slate-200 p-4">
              <h4 className="font-bold">Capture Progress</h4>
              <div className="space-y-3">
                {[
                  "Scan 1 - Captured",
                  "Scan 2 - Captured",
                  "Scan 3 - Pending",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-md border p-3"
                  >
                    <span
                      className={cn(
                        "flex size-5 text-xs items-center justify-center rounded-full",
                        index < 2
                          ? "bg-blue-600 text-white"
                          : "border border-blue-600 text-blue-600",
                      )}
                    >
                      {index < 2 ? <Check className="size-3" /> : index + 1}
                    </span>
                    <span className="text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="rounded-lg h-fit border-slate-200 p-4">
              <h4 className="font-bold">Fingerprint Quality Guide</h4>
              <div className="space-y-4">
                {["Good Quality", "Poor Quality", "Unacceptable"].map(
                  (item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <Fingerprint
                        className={cn(
                          "size-7",
                          index === 0 && "text-emerald-500",
                          index === 1 && "text-orange-500",
                          index === 2 && "text-red-500",
                        )}
                      />
                      <span className="text-xs">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ReviewSubmitStep() {
  const cards = [
    ["Personal Information", ADD_EMPLOYEE_SUMMARY_DATA.personal],
    ["Job Information", ADD_EMPLOYEE_SUMMARY_DATA.job],
    ["Compensation", ADD_EMPLOYEE_SUMMARY_DATA.compensation],
    [
      "Additional Information",
      [
        ["Emergency Contact", "Juan Santos"],
        ["Civil Status", "Single"],
        ["Citizenship", "Filipino"],
      ] as const,
    ],
  ] as const;

  return (
    <div className="grid gap-5">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold">Review & Submit</h2>
            <p className="mt-1 text-xs text-slate-500">
              Please review all information below before adding employee.
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {cards.map(([title, rows]) => (
            <Card
              key={title}
              className="rounded-xl bg-white shadow-xs border-zinc-200 px-5 py-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">{title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-semibold"
                >
                  <Edit className="size-3.5" /> Edit
                </Button>
              </div>
              <div className="space-y-3">
                {rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 text-xs"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Card className="rounded-lg border-slate-200 px-5 py-4">
          <h3 className="font-bold">Biometrics Registration</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Fingerprint: 2 fingers captured",
              "Face Recognition: Enrolled",
              "Quality Status: Good",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs rounded-xl border p-4"
              >
                <IconCircleCheckFilled className="size-6 text-white fill-green-600" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
