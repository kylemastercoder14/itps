import { GOVERNMENT_CONTRIBUTIONS_DATA } from "@/constants/admin-dashboard"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function GovernmentContributionsCard() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Government Contributions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {GOVERNMENT_CONTRIBUTIONS_DATA.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 rounded-md px-3 py-3 text-xs odd:bg-white even:bg-zinc-100"
            >
              <span className="truncate font-medium text-blue-700">
                {item.label}
              </span>
              <span className="font-bold tabular-nums text-zinc-800">
                {formatCurrency(item.value)}
              </span>
              <span className="font-semibold text-zinc-500">—</span>
            </div>
          ))}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 rounded-md bg-zinc-100 px-3 py-3 text-xs">
            <span className="truncate font-medium text-blue-700">
              Total contributions
            </span>
            <span className="font-bold tabular-nums text-zinc-800">
              ₱{formatCurrency("298,000.00")}
            </span>
            <span className="font-semibold text-zinc-500">—</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatCurrency(value: string) {
  return value.replace("â‚±", "PHP ")
}
