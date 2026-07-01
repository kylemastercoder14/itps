import { Calendar, CloudUpload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type FieldProps = {
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  type?: string
  suffix?: "calendar"
}

export function Field({
  label,
  placeholder,
  required,
  className,
  type = "text",
  suffix,
}: FieldProps) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="text-xs font-semibold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          className={cn("text-xs! h-9! rounded-sm bg-transparent! border-zinc-200", suffix && "pr-10")}
        />
        {suffix === "calendar" ? (
          <Calendar className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
        ) : null}
      </div>
    </label>
  )
}

export function SelectField({
  label,
  placeholder,
  required,
  options,
  className,
}: FieldProps & { options: readonly string[] }) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="text-xs font-semibold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <Select>
        <SelectTrigger className="h-9! text-xs! w-full rounded-sm! border-zinc-200">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}

export function TextareaField({
  label,
  placeholder,
  required,
  className,
}: FieldProps) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="text-xs font-semibold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <Textarea
        placeholder={placeholder}
        className="min-h-24 rounded-sm text-xs! border-slate-200"
      />
    </label>
  )
}

export function UploadBox({
  label,
  hint = "JPG, PNG, PDF (Max. 2MB)",
  className,
}: {
  label: string
  hint?: string
  className?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-18 w-full flex-col items-center justify-center rounded-md border border-slate-200 bg-white p-3 text-center text-xs font-semibold hover:bg-slate-50",
        className
      )}
    >
      <CloudUpload className="mb-1 size-4 text-foreground" />
      {label}
      <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">
        {hint}
      </span>
    </button>
  )
}

export function SameAddressCheckbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
      <Checkbox />
      {label}
    </label>
  )
}

export { Button }
