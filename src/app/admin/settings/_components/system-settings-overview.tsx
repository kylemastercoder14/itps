"use client";

import {
  SYSTEM_SETTINGS_COMPANY_INFO,
  SYSTEM_SETTINGS_NAV,
  SYSTEM_SETTINGS_SHORTCUTS,
} from "@/constants/admin-dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { IconSettingsFilled } from "@tabler/icons-react";

export function SystemSettingsOverview() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader />
      <div className="grid gap-5 xl:grid-cols-[1fr_19rem]">
        <main className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-[14rem_1fr]">
            <SettingsNav />
            <GeneralSettingsPanel />
          </div>
        </main>
        <aside className="space-y-5">
          <CompanyInfoCard />
          <QuickShortcutsCard />
          <HelpCard />
        </aside>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <IconSettingsFilled className="size-4 text-zinc-900" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-950">
            Settings
          </h1>
        </div>
      </div>
      <Button className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800">
        Save Changes
      </Button>
    </div>
  );
}

function SettingsNav() {
  return (
    <Card className="rounded-xl border-zinc-200 p-2 shadow-xs">
      <nav className="space-y-1">
        {SYSTEM_SETTINGS_NAV.map((item, index) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-left text-xs font-semibold",
              index === 0
                ? "border bg-zinc-100 text-zinc-950"
                : "text-slate-700 hover:bg-slate-50",
            )}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </Card>
  );
}

function GeneralSettingsPanel() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-950">General Settings</h2>
          <p className="mt-1 text-xs text-slate-500">
            Configure general information and preferences for system.
          </p>
        </div>
      </div>

      <SettingsSection title="Company Information">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Company Name" required>
            <Input defaultValue="NAD IT Solutions Inc." className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
          <Field label="Company ID">
            <Input defaultValue="10001" className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
          <Field label="Address" required>
            <Input
              defaultValue="123 Business Park, City of Manila, Metro Manila, Philippines"
              className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200"
            />
          </Field>
          <Field label="Timezone" required>
            <SelectField
              value="asia-manila"
              options={["(GMT+08:00) Asia/Manila", "(GMT+00:00) UTC"]}
            />
          </Field>
          <Field label="Contact Number" required>
            <Input defaultValue="(+63) 912 345 6789" className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
          <Field label="Email Address" required>
            <Input defaultValue="info@nadit.com" className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection title="System Preferences">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Date Format">
            <SelectField
              value="date-format"
              options={[
                "May 24, 2025 (MMM DD, YYYY)",
                "2025-05-24",
                "24/05/2025",
              ]}
            />
          </Field>
          <Field label="Time Format">
            <SelectField
              value="time-format"
              options={["10:30 AM (12-hour)", "22:30 (24-hour)"]}
            />
          </Field>
          <Field label="Currency">
            <SelectField
              value="currency"
              options={["Philippine Peso (PHP)", "US Dollar (USD)"]}
            />
          </Field>
          <Field label="Default Language">
            <SelectField value="language" options={["English", "Filipino"]} />
          </Field>
          <ToggleSetting
            title="Allow Weekend Payroll Processing"
            note="Enable payroll processing on weekends"
            defaultChecked
          />
          <ToggleSetting
            title="Enable Audit Trail"
            note="Log all system activities and changes"
            defaultChecked
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Theme">
            <SelectField value="theme" options={["Light", "Dark", "System"]} />
          </Field>
          <Field label="Sidebar Behavior">
            <SelectField
              value="sidebar"
              options={["Expanded", "Collapsed", "Hover to expand"]}
            />
          </Field>
          <Field label="Primary Color">
            <div className="flex h-9 items-center gap-3 rounded-md border border-slate-200 px-3">
              <span className="size-5 rounded bg-zinc-900" />
              <span className="text-xs font-semibold text-slate-700">
                #18181B
              </span>
            </div>
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection title="Session Settings">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Session Timeout (minutes)"
            help="Automatically log out inactive users."
          >
            <Input defaultValue="30" className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
          <Field
            label="Password Expiry (days)"
            help="Require users to change password periodically."
          >
            <Input defaultValue="90" className="text-xs! h-9! rounded-sm bg-transparent! border-zinc-200" />
          </Field>
        </div>
      </SettingsSection>
    </div>
  );
}

function CompanyInfoCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-zinc-200 shadow-xs px-5 py-4">
      <div>
        <h3 className="font-bold">Company Information</h3>
        <div className="mt-5">
          <p className="font-bold text-sm">NAD IT Solutions Inc.</p>
          <p className="text-xs text-zinc-600">Company ID: 10001</p>
        </div>
      </div>
      <div className="divide-y border-t">
        {SYSTEM_SETTINGS_COMPANY_INFO.map((item) => (
          <div key={item.label} className="py-3">
            <p className="text-xs font-semibold text-slate-500">{item.label}</p>
            <p className="mt-1 whitespace-pre-line text-xs font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuickShortcutsCard() {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 gap-4! shadow-xs">
      <h3 className="font-bold text-slate-950">Quick Shortcuts</h3>
      <div className="space-y-3">
        {SYSTEM_SETTINGS_SHORTCUTS.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-zinc-200 p-3"
          >
            <p className="text-xs font-bold text-slate-900">{item.title}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HelpCard() {
  return (
    <Card className="rounded-xl gap-3! border-zinc-200 bg-zinc-50 px-5 py-4 shadow-xs">
      <h3 className="font-bold text-zinc-950">Need Help?</h3>
      <p className="text-xs text-zinc-600">
        Learn more about system settings and configuration options.
      </p>
      <Button
        variant="outline"
        className="text-xs border-zinc-300 bg-white text-zinc-900"
      >
        View Help Center
      </Button>
    </Card>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-xl border-zinc-200 px-5 py-4 shadow-xs">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <div>{children}</div>
    </Card>
  );
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-slate-700">
        {label}
      </span>
      {children}
      {help ? <span className="text-[10px] text-slate-500">{help}</span> : null}
    </label>
  );
}

function ToggleSetting({
  title,
  note,
  defaultChecked,
}: {
  title: string;
  note: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        <p className="text-[11px] text-slate-500">{note}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-9 text-xs! w-full">
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
  );
}
