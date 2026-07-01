"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconActivity,
  IconBuildingBroadcastTowerFilled,
  IconCalendarFilled,
  IconChartPieFilled,
  IconChevronRight,
  IconClockHour3Filled,
  IconCreditCardFilled,
  IconHomeFilled,
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconReceiptFilled,
  IconSettingsFilled,
  IconShieldCheckFilled,
  IconUserFilled,
} from "@tabler/icons-react";

import { ADMIN_NAVIGATION_DATA } from "@/constants/admin-dashboard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS = {
  House: IconHomeFilled,
  LayoutDashboard: IconLayoutDashboardFilled,
  Users: IconUserFilled,
  Clock3: IconClockHour3Filled,
  CalendarClock: IconCalendarFilled,
  CreditCard: IconCreditCardFilled,
  Landmark: IconBuildingBroadcastTowerFilled,
  ReceiptText: IconReceiptFilled,
  BarChart3: IconChartPieFilled,
  ShieldCheck: IconShieldCheckFilled,
  Activity: IconActivity,
  Settings: IconSettingsFilled,
} as const;

const PRIMARY_ITEMS = ADMIN_NAVIGATION_DATA.filter(
  (item) => item.label !== "Settings",
);
const SETTINGS_ITEM = ADMIN_NAVIGATION_DATA.find(
  (item) => item.label === "Settings",
);

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-60 shrink-0 flex-col overflow-hidden bg-[#EBEBEB] px-3 py-3 lg:flex">
      <nav className="no-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="space-y-1">
          {PRIMARY_ITEMS.slice(0, 5).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>

        <SidebarSection title="Operations">
          {PRIMARY_ITEMS.slice(5, 8).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </SidebarSection>

        <SidebarSection title="Apps">
          {PRIMARY_ITEMS.slice(8).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
          {SETTINGS_ITEM ? (
            <NavItem item={SETTINGS_ITEM} pathname={pathname} />
          ) : null}
        </SidebarSection>
      </nav>
      <div className="shrink-0 space-y-3 pt-3">
        <TrialCard />
      </div>
    </aside>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center gap-1 px-3 text-xs font-semibold text-[#303030]">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({
  item,
  pathname,
}: {
  item: (typeof ADMIN_NAVIGATION_DATA)[number];
  pathname: string;
}) {
  const Icon = ICONS[item.icon as keyof typeof ICONS] ?? IconLayoutDashboard;
  const children = "children" in item ? item.children : undefined;
  const activeChildHref = children
    ?.filter(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  const isActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    Boolean(activeChildHref);

  if (children?.length) {
    return (
      <Collapsible defaultOpen={isActive}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "group flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-xs font-semibold text-[#303030] hover:bg-[#f7f7f7]",
              isActive && "bg-white shadow-sm",
            )}
            type="button"
          >
            <Icon className="size-4 text-[#4a4a4a]" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <IconChevronRight className="size-4 text-[#616161] transition-transform duration-200 ease-out group-data-[state=open]:rotate-90" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 mt-1 space-y-1 pl-2">
          {children.map((child) => {
            const childActive = activeChildHref === child.href;

            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7]",
                  childActive &&
                    "font-semibold text-[#1f1f1f]",
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-9 items-center gap-3 rounded-lg px-3 text-xs font-semibold text-[#303030] hover:bg-[#f7f7f7]",
        isActive && "bg-white",
      )}
    >
      <Icon className="size-4 text-[#4a4a4a]" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function TrialCard() {
  return (
    <div className="rounded-xl bg-[#071716] p-4 text-white">
      <p className="text-[11px] tracking-tight text-white/70">
        Company ID: 26-56-00249
      </p>
      <p className="mt-1 text-sm font-semibold">NAD IT Solutions Inc.</p>
      <Button className="mt-4 h-9 w-full rounded-lg bg-white text-sm font-bold text-[#303030] hover:bg-zinc-100">
        Logout
      </Button>
    </div>
  );
}
