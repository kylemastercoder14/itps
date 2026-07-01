import { PENDING_APPROVALS_DATA } from "@/constants/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PendingApprovalsCard() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Pending Approvals
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <div className="space-y-1">
          {PENDING_APPROVALS_DATA.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-3 py-2.5 text-xs odd:bg-white even:bg-zinc-100"
            >
              <div className="flex min-w-0 items-center gap-2 font-medium text-zinc-700">
                <span className="truncate">{item.label}</span>
              </div>
              <span className="font-semibold tabular-nums text-zinc-800">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
