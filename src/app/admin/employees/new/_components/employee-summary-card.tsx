import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ADD_EMPLOYEE_SUMMARY_DATA } from "@/constants/admin-dashboard"

type SummarySectionProps = {
  title: string
  rows: readonly (readonly [string, string])[]
}

export function EmployeeSummaryCard({
  showNextSteps = true,
}: {
  showNextSteps?: boolean
}) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-950">Employee Summary</h3>
      <div className="mt-6 flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback className="bg-pink-100 text-pink-700">
            MS
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-slate-950">
            {ADD_EMPLOYEE_SUMMARY_DATA.name}
          </p>
          <p className="text-sm text-slate-500">
            {ADD_EMPLOYEE_SUMMARY_DATA.role}
          </p>
        </div>
      </div>
      <SummarySection
        title="Personal Information"
        rows={ADD_EMPLOYEE_SUMMARY_DATA.personal}
      />
      <SummarySection title="Job Information" rows={ADD_EMPLOYEE_SUMMARY_DATA.job} />
      <SummarySection
        title="Compensation Information"
        rows={ADD_EMPLOYEE_SUMMARY_DATA.compensation}
      />
      {showNextSteps ? (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-bold text-slate-900">Next Steps</h4>
          {["Complete next section", "Register biometrics", "Review and submit"].map(
            (item, index) => (
              <div key={item} className="mt-3 flex items-center gap-3 text-xs">
                <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                  {index + 1}
                </span>
                <span className="text-slate-600">{item}</span>
              </div>
            )
          )}
        </div>
      ) : null}
    </aside>
  )
}

function SummarySection({ title, rows }: SummarySectionProps) {
  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="mb-3 text-sm font-bold text-slate-900">{title}</h4>
      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-xs">
            <span className="text-slate-500">{label}</span>
            <span className="font-semibold text-slate-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
