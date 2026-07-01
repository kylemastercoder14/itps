"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  ListFilter,
  Search,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";

const SEARCH_CATEGORIES = [
  "Employees",
  "Attendance",
  "Payroll",
  "Leaves",
  "Reports",
  "Settings",
] as const;

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-17 items-center justify-between gap-5 bg-[#0A0A0A] px-6 text-white">
      <Link
        href="/admin/dashboard"
        className="flex shrink-0 items-center gap-2"
      >
        <Image src="/logo.png" alt="ITPS" width={25} height={25} priority />
        <span className="text-xl font-bold italic">ITPS</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90">
          BETA
        </span>
      </Link>

      <SearchDialog />

      <div className="flex shrink-0 items-center gap-3">
        <NotificationDropdown />
        <Button
          variant="ghost"
          className="h-11 gap-2 px-2 text-white hover:bg-white/10 hover:text-white"
        >
          <Avatar className="size-9">
            <AvatarImage
              src="https://testingbot.com/free-online-tools/random-avatar/300"
              alt="Avatar"
            />
            <AvatarFallback className="bg-blue-700 text-xs font-bold text-black">
              MS6
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="hidden text-sm font-semibold sm:inline">Admin</p>
            <p className="hidden text-xs sm:inline">admin@itps.com</p>
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full text-white hover:bg-white/10 hover:text-white sm:hidden"
        >
          <UserRound className="size-5" />
        </Button>
      </div>
    </header>
  );
}

function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 relative rounded-full text-white hover:bg-white/10 hover:text-white"
        >
          <Bell className="size-5" />
          <div className="bg-destructive absolute top-1.75 right-1.75 size-1.5 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-3 w-lg rounded-xl bg-white p-4 text-zinc-900"
        sideOffset={8}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Alerts</h2>
          <div className="flex items-center gap-3 text-zinc-400">
            <button
              aria-label="Filter alerts"
              className="rounded-md hover:bg-zinc-100 hover:text-zinc-700"
              type="button"
            >
              <ListFilter className="size-4" />
            </button>
            <button
              aria-label="Mark all alerts as read"
              className="rounded-md hover:bg-zinc-100 hover:text-zinc-700"
              type="button"
            >
              <CheckCircle2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-5 rounded-sm bg-zinc-100 px-5 py-5 text-center text-sm font-medium text-zinc-600">
          Attendance, payroll, leave, and security alerts will show here.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="relative cursor-pointer mx-auto hidden h-10 w-full max-w-xl items-center rounded-xl border-2 border-white/10 bg-[#282828] pl-10 pr-24 text-left text-sm font-semibold text-zinc-200 shadow-inner outline-none transition hover:border-white/20 focus-visible:border-white/30 focus-visible:ring-1 focus-visible:ring-white/20 lg:flex"
          type="button"
        >
          <Search className="absolute left-4 size-4 text-zinc-300" />
          <span>Search</span>
          <Kbd className="absolute right-9.5 top-1/2 -translate-y-1/2 bg-[#2F2F2F] px-2 py-1 text-[10px] font-semibold text-zinc-300">
            CTRL
          </Kbd>
          <Kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2F2F2F] px-2 py-1 text-[10px] font-semibold text-zinc-300">
            K
          </Kbd>
        </button>
      </DialogTrigger>
      <DialogContent
        className="top-2 max-w-2xl! translate-y-0 gap-0 rounded-xl bg-white p-4"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search ITPS</DialogTitle>
        <DialogDescription className="sr-only">
          Search employees, attendance records, payroll, leaves, reports, and settings.
        </DialogDescription>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            autoFocus
            className="h-9 w-full rounded-lg border border-zinc-500 bg-zinc-100 pl-10 pr-10 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 focus:ring-1 focus:ring-black"
            placeholder="Search employees, payroll, attendance..."
            type="search"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {SEARCH_CATEGORIES.map((category) => (
            <button
              key={category}
              className="rounded-full bg-zinc-200 px-2.5 py-1 text-xs text-zinc-800 hover:bg-zinc-300"
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-7 mx-auto flex flex-col items-center justify-center gap-2 pb-4 pt-2 text-zinc-500">
          <Search strokeWidth={1.5} className="size-10" />
          <span className="text-sm">Find anything in ITPS</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
