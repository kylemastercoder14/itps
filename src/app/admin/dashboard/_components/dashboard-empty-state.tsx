"use client";

import { motion, type Variants } from "framer-motion";
import { type LucideIcon } from "lucide-react";

type OnboardingVariant =
  | "people"
  | "attendance"
  | "org"
  | "payroll"
  | "contributions"
  | "checklist";

interface OnboardingCardProps {
  action: string;
  description: string;
  icon: LucideIcon;
  title: string;
  variant: OnboardingVariant;
}

const CARD_MOTION: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  },
  hover: {
    y: -10,
    boxShadow:
      "0 20px 35px -22px rgb(0 0 0 / 0.35), 0 12px 18px -18px rgb(0 0 0 / 0.25)",
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
  tap: {
    y: -4,
    scale: 0.985,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

const ILLUSTRATION_MOTION: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { staggerChildren: 0.035 },
  },
};

const spreadLayer = ({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
}): Variants => ({
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: {
    x,
    y,
    rotate,
    scale,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
});

/**
 * Shopify-style "torn paper / sticker" illustration scenes.
 * Each variant returns layered, slightly rotated cards with a flat icon
 * motif so every empty state gets a distinct, hand-placed feel — same
 * trick Shopify uses (overlapping photo + UI chip + sticker).
 */
export default function OnboardingIllustration({ variant }: { variant: OnboardingVariant }) {
  switch (variant) {
    case "people":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-44 w-full"
        >
          <motion.div
            variants={spreadLayer({ x: -18, y: 8, rotate: -8 })}
            className="absolute left-1/2 top-2 h-32 w-28 -translate-x-19.5 -rotate-6 rounded-2xl bg-violet-100 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ y: -8, scale: 1.05 })}
            className="absolute left-1/2 top-0 flex h-36 w-32 -translate-x-1/2 rotate-2 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 bg-white"
          >
            <div className="size-10 rounded-full bg-zinc-200" />
            <div className="h-2 w-14 rounded-full bg-zinc-200" />
            <div className="h-2 w-10 rounded-full bg-zinc-100" />
          </motion.div>
          <motion.div
            variants={spreadLayer({ x: 20, y: 7, rotate: 8 })}
            className="absolute left-1/2 top-6 flex h-28 w-24 translate-x-15 rotate-6 flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-100 shadow-sm"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-white text-emerald-700">
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <circle cx="17" cy="9" r="2.3" />
                <path d="M21 20c0-2.6-1.7-4.8-4-5.6" />
              </svg>
            </div>
            <div className="h-1.5 w-12 rounded-full bg-emerald-200" />
          </motion.div>
        </motion.div>
      );

    case "attendance":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-44 w-full"
        >
          <motion.div
            variants={spreadLayer({ x: -18, y: 8, rotate: -8 })}
            className="absolute left-1/2 top-3 h-32 w-32 -translate-x-1/2 -rotate-3 rounded-2xl bg-amber-100 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ x: 4, y: -8, rotate: 5, scale: 1.04 })}
            className="absolute left-1/2 top-0 flex h-36 w-36 -translate-x-1/2 translate-y-1 rotate-2 items-center justify-center rounded-full border-[6px] border-zinc-900 bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-16 text-zinc-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                d="M12 7v5l3 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-zinc-900" />
            <span className="absolute right-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-zinc-900" />
            <span className="absolute left-1/2 bottom-1.5 size-1.5 -translate-x-1/2 rounded-full bg-zinc-900" />
            <span className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-zinc-900" />
          </motion.div>
          <motion.div
            variants={spreadLayer({ x: 16, y: 9, rotate: -10 })}
            className="absolute -right-1 bottom-1 flex -rotate-6 items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-white shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[11px] font-semibold">Clocked in</span>
          </motion.div>
        </motion.div>
      );

    case "org":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-40 w-full"
        >
          <motion.div
            variants={spreadLayer({ y: -7, scale: 1.05 })}
            className="absolute left-1/2 top-0 h-9 w-24 -translate-x-1/2 rounded-lg border border-zinc-300 bg-white shadow-sm"
          />
          <svg
            className="absolute left-1/2 top-9 h-8 w-40 -translate-x-1/2"
            viewBox="0 0 160 32"
            fill="none"
          >
            <path
              d="M80 0v10M80 10H24v10M80 10h56v10"
              stroke="#D4D4D8"
              strokeWidth="2"
            />
          </svg>
          <motion.div
            variants={spreadLayer({ x: -14, y: 8, rotate: -6 })}
            className="absolute left-3 top-17 h-12 w-20 -rotate-3 rounded-lg bg-blue-100 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ y: 12, scale: 1.04 })}
            className="absolute left-1/2 top-18 h-12 w-20 -translate-x-1/2 rotate-1 rounded-lg bg-violet-100 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ x: 14, y: 8, rotate: 6 })}
            className="absolute right-3 top-17 h-12 w-20 rotate-3 rounded-lg bg-rose-100 shadow-sm"
          />
          <Building2Glyph className="absolute left-1/2 top-1.5 size-5 -translate-x-1/2 text-zinc-500" />
        </motion.div>
      );

    case "payroll":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-44 w-full"
        >
          <motion.div
            variants={spreadLayer({ x: -18, y: 10, rotate: -8 })}
            className="absolute left-1/2 top-4 h-32 w-24 -translate-x-14.5 -rotate-6 rounded-xl bg-zinc-100 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ y: -8, scale: 1.04 })}
            className="absolute left-1/2 top-0 flex h-36 w-28 -translate-x-1/2 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
          >
            <div className="h-2 w-3/4 rounded-full bg-zinc-200" />
            <div className="h-2 w-1/2 rounded-full bg-zinc-200" />
            <div className="mt-2 h-px w-full bg-zinc-100" />
            <div className="h-2 w-full rounded-full bg-zinc-100" />
            <div className="h-2 w-2/3 rounded-full bg-zinc-100" />
          </motion.div>
          <motion.div
            variants={spreadLayer({ x: 18, y: 6, rotate: 8 })}
            className="absolute right-1 top-9 flex h-16 w-20 translate-x-2 rotate-6 items-center justify-center rounded-xl bg-teal-100 shadow-sm"
          >
            <span className="text-xl font-bold text-teal-700">₱</span>
          </motion.div>
        </motion.div>
      );

    case "contributions":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-44 w-full"
        >
          <motion.div
            variants={spreadLayer({ x: -16, y: 8, rotate: -7 })}
            className="absolute left-1/2 top-3 h-32 w-32 -translate-x-1/2 rotate-2 rounded-2xl bg-indigo-50 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ y: -9, scale: 1.05 })}
            className="absolute left-1/2 top-1 -translate-x-1/2 -rotate-2"
          >
            <svg viewBox="0 0 64 56" className="h-28 w-32" fill="none">
              <path
                d="M4 22 32 6l28 16"
                stroke="#A1A1AA"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <rect
                x="8"
                y="22"
                width="48"
                height="26"
                rx="2"
                fill="white"
                stroke="#D4D4D8"
                strokeWidth="2"
              />
              <path
                d="M14 22v22M24 22v22M34 22v22M44 22v22M54 22v22"
                stroke="#E4E4E7"
                strokeWidth="2"
              />
              <rect
                x="4"
                y="48"
                width="56"
                height="4"
                rx="1.5"
                fill="#27272A"
              />
            </svg>
          </motion.div>
          <motion.div
            variants={spreadLayer({ x: 18, y: 10, rotate: -9 })}
            className="absolute bottom-0 right-0 flex -rotate-6 items-center justify-center rounded-full bg-violet-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm"
          >
            SSS · PhilHealth
          </motion.div>
        </motion.div>
      );

    case "checklist":
      return (
        <motion.div
          variants={ILLUSTRATION_MOTION}
          className="relative h-40 w-full"
        >
          <motion.div
            variants={spreadLayer({ x: 14, y: 10, rotate: 7 })}
            className="absolute left-1/2 top-2 h-32 w-44 -translate-x-1/2 rotate-1 rounded-xl bg-zinc-50 shadow-sm"
          />
          <motion.div
            variants={spreadLayer({ y: -8, rotate: -4, scale: 1.04 })}
            className="absolute left-1/2 top-0 flex h-32 w-44 -translate-x-1/2 -rotate-1 flex-col justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
          >
            {[true, true, false].map((done, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-emerald-500" : "border border-zinc-300"
                  }`}
                >
                  {done && (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`h-1.5 flex-1 rounded-full ${done ? "bg-zinc-200" : "bg-zinc-100"}`}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      );

    default:
      return null;
  }
}

function Building2Glyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M6 22V8l6-4 6 4v14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 22h12M9 22v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OnboardingCard({
  action,
  description,
  icon: Icon,
  title,
  variant,
}: OnboardingCardProps) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={CARD_MOTION}
      role="button"
      tabIndex={0}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
    >
      <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
        {description}
      </p>

      <div className="mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-zinc-50/60">
        <OnboardingIllustration variant={variant} />
      </div>

      <button
        type="button"
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
      >
        <Icon className="size-4 text-zinc-500" />
        {action}
      </button>
    </motion.div>
  );
}
