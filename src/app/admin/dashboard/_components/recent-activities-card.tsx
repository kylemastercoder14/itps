import { RECENT_ACTIVITIES_DATA } from "@/constants/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivitiesCard() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="w-fit border-b border-dotted border-zinc-400 text-sm text-zinc-800">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {RECENT_ACTIVITIES_DATA.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-md px-3 py-2 odd:bg-white even:bg-zinc-100"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-800">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
