"use client"

import {
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  Clock,
  DatabaseBackup,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Plane,
  ReceiptText,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
} from "lucide-react"

import {
  SYSTEM_SETTINGS_COMPANY_INFO,
  SYSTEM_SETTINGS_NAV,
  SYSTEM_SETTINGS_SHORTCUTS,
} from "@/constants/admin-dashboard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const NAV_ICON = {
  Settings,
  Banknote,
  CalendarDays,
  Clock,
  Timer,
  Plane,
  ReceiptText,
  Mail,
  Bell,
  ShieldCheck,
  DatabaseBackup,
  SlidersHorizontal,
} as const

const CONTACT_ICON = {
  Mail,
  Phone,
  MapPin,
} as const

export function SystemSettingsOverview() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_19rem]">
      <main className="space-y-5">
        <HeaderCard />
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
  )
}

function HeaderCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
          <Settings className="size-7" />
        </span>
        <div>
          <h1 className="text-lg font-bold text-slate-950">System Settings</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Manage and configure system preferences, payroll settings, and other application configurations.
          </p>
        </div>
      </div>
    </Card>
  )
}

function SettingsNav() {
  return (
    <Card className="rounded-lg border-slate-200 p-2 shadow-sm">
      <nav className="space-y-1">
        {SYSTEM_SETTINGS_NAV.map((item, index) => {
          const Icon = NAV_ICON[item.icon]

          return (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold",
                index === 0
                  ? "border border-blue-300 bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50"
              )}
              type="button"
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </Card>
  )
}

function GeneralSettingsPanel() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">General Settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure general information and preferences for system.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>

      <SettingsSection title="Company Information" icon={Building2}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Company Name" required>
            <Input defaultValue="NAD IT Solutions Inc." className="h-11" />
          </Field>
          <Field label="Company ID">
            <Input defaultValue="10001" className="h-11" />
          </Field>
          <Field label="Address" required>
            <Input defaultValue="123 Business Park, City of Manila, Metro Manila, Philippines" className="h-11" />
          </Field>
          <Field label="Timezone" required>
            <SelectField value="asia-manila" options={["(GMT+08:00) Asia/Manila", "(GMT+00:00) UTC"]} />
          </Field>
          <Field label="Contact Number" required>
            <Input defaultValue="(+63) 912 345 6789" className="h-11" />
          </Field>
          <Field label="Email Address" required>
            <Input defaultValue="info@nadit.com" className="h-11" />
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection title="System Preferences" icon={SlidersHorizontal}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Date Format">
            <SelectField value="date-format" options={["May 24, 2025 (MMM DD, YYYY)", "2025-05-24", "24/05/2025"]} />
          </Field>
          <Field label="Time Format">
            <SelectField value="time-format" options={["10:30 AM (12-hour)", "22:30 (24-hour)"]} />
          </Field>
          <Field label="Currency">
            <SelectField value="currency" options={["Philippine Peso (PHP)", "US Dollar (USD)"]} />
          </Field>
          <Field label="Default Language">
            <SelectField value="language" options={["English", "Filipino"]} />
          </Field>
          <ToggleSetting title="Allow Weekend Payroll Processing" note="Enable payroll processing on weekends" defaultChecked />
          <ToggleSetting title="Enable Audit Trail" note="Log all system activities and changes" defaultChecked />
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance" icon={Settings}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Theme">
            <SelectField value="theme" options={["Light", "Dark", "System"]} />
          </Field>
          <Field label="Sidebar Behavior">
            <SelectField value="sidebar" options={["Expanded", "Collapsed", "Hover to expand"]} />
          </Field>
          <Field label="Primary Color">
            <div className="flex h-11 items-center gap-3 rounded-md border border-slate-200 px-3">
              <span className="size-5 rounded bg-blue-600" />
              <span className="text-sm font-semibold text-slate-700">#2563EB</span>
            </div>
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection title="Session Settings" icon={Clock}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Session Timeout (minutes)" help="Automatically log out inactive users.">
            <Input defaultValue="30" className="h-11" />
          </Field>
          <Field label="Password Expiry (days)" help="Require users to change password periodically.">
            <Input defaultValue="90" className="h-11" />
          </Field>
        </div>
      </SettingsSection>
    </div>
  )
}

function CompanyInfoCard() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 shadow-sm">
      <div className="p-5">
        <h3 className="font-bold">Company Information</h3>
        <div className="mt-5 flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Building2 className="size-8" />
          </span>
          <div>
            <p className="font-bold">NAD IT Solutions Inc.</p>
            <p className="text-sm text-blue-700">Company ID: 10001</p>
          </div>
        </div>
      </div>
      <div className="divide-y border-t">
        {SYSTEM_SETTINGS_COMPANY_INFO.map((item) => {
          const Icon = CONTACT_ICON[item.icon]

          return (
            <div key={item.label} className="flex gap-3 p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                <p className="mt-1 whitespace-pre-line text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function QuickShortcutsCard() {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="font-bold">Quick Shortcuts</h3>
      <div className="mt-4 space-y-4">
        {SYSTEM_SETTINGS_SHORTCUTS.map((item) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <CalendarDays className="size-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HelpCard() {
  return (
    <Card className="rounded-lg border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex gap-3">
        <HelpCircle className="size-5 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Need Help?</h3>
          <p className="mt-2 text-sm text-blue-700">
            Learn more about system settings and configuration options.
          </p>
          <Button variant="outline" className="mt-4 bg-white text-blue-600">
            View Help Center
          </Button>
        </div>
      </div>
    </Card>
  )
}

function SettingsSection({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Card className="rounded-lg border-slate-200 p-5 shadow-sm">
      <h3 className="flex items-center gap-2 font-bold text-slate-950">
        <span className="flex size-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <Icon className="size-4" />
        </span>
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </Card>
  )
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string
  required?: boolean
  help?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
      {help ? <span className="text-xs text-slate-500">{help}</span> : null}
    </label>
  )
}

function ToggleSetting({
  title,
  note,
  defaultChecked,
}: {
  title: string
  note: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{note}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-full">
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
  )
}
