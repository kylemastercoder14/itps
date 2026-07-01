"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function OtpPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#06110f] text-white">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 pb-7">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Card className="mt-10 w-full max-w-lg rounded-2xl p-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Verify your email to continue
            </h1>
            <p className="mt-2 max-w-md text-base font-medium leading-6 text-zinc-600">
              For added security, enter the 6 digit code sent to
              kylemastercoder14@gmail.com
            </p>

            <form className="mt-8 space-y-5">
              <InputOTP
                maxLength={6}
                containerClassName="w-full"
                className="w-full"
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup className="grid w-full grid-cols-6 gap-2 rounded-none">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-15 rounded-lg border border-zinc-300 bg-zinc-100 text-xl shadow-none first:rounded-lg first:border-l last:rounded-lg data-[active=true]:border-blue-700 data-[active=true]:ring-0.5 data-[active=true]:ring-blue-700"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <a
                className="-mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
                href="#"
              >
                Resend code
              </a>

              <div className="space-y-3 pt-3">
                <Button size="lg" className="w-full">
                  Verify
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full font-normal"
                >
                  Use passkey instead
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <footer className="px-4 pb-10 text-center text-sm text-white">
        <a className="font-semibold tracking-tight hover:underline" href="#">
          Need Help?
        </a>
        <p className="mt-2">
          By continuing, you agree to the{" "}
          <a className="font-semibold hover:underline" href="#">
            Terms
          </a>{" "}
          and{" "}
          <a className="font-semibold hover:underline" href="#">
            Privacy Policy
          </a>
          , and to receive marketing emails from ITPS. Unsubscribe anytime.
        </p>
      </footer>
    </main>
  );
}
