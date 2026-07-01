"use client";

import { ArrowRightIcon, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col bg-[#06110f] text-white">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 pb-7">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Card className="mt-10 w-full max-w-lg p-10 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
            <p className="mt-2 text-base font-medium text-zinc-600">
              Continue to ITPS account
            </p>

            <form className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label className="font-medium text-zinc-900" htmlFor="email">
                  Email
                </Label>
                <Input id="email" type="email" />
              </div>
              <Button
                size="lg"
                onClick={() => router.push("/admin/dashboard")}
                className="w-full group"
                type="button"
              >
                Continue with email
                <ArrowRightIcon className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
            </form>

            <div className="my-5 flex items-center gap-4 text-zinc-500">
              <span className="h-px flex-1 bg-zinc-200" />
              <span className="text-lg">or</span>
              <span className="h-px flex-1 bg-zinc-200" />
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full font-normal"
            >
              <KeyRound className="size-5" />
              Sign in with passkey
            </Button>

            <div className="mt-3 grid grid-cols-4 gap-3">
              <SocialButton provider="google" label="Google" lastUsed />
              <SocialButton provider="apple" label="Apple" />
              <SocialButton provider="facebook" label="Facebook" />
              <SocialButton provider="whatsapp" label="WhatsApp" />
            </div>
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

function SocialButton({
  provider,
  label,
  lastUsed = false,
}: {
  provider: "google" | "apple" | "facebook" | "whatsapp";
  label: string;
  lastUsed?: boolean;
}) {
  return (
    <Button
      aria-label={`Continue with ${label}`}
      variant="secondary"
      className="relative"
      size="lg"
    >
      <BrandMark provider={provider} />
      {lastUsed ? (
        <Badge className="absolute -bottom-3.5 text-xs left-1/2 -translate-x-1/2 bg-blue-100 text-zinc-600">
          Last used
        </Badge>
      ) : null}
    </Button>
  );
}

function BrandMark({
  provider,
}: {
  provider: "google" | "apple" | "facebook" | "whatsapp";
}) {
  if (provider === "google") {
    return (
      <Image src="/icons/google.svg" alt="Google" width={23} height={23} />
    );
  }

  if (provider === "apple") {
    return <Image src="/icons/apple.svg" alt="Apple" width={25} height={25} />;
  }

  if (provider === "facebook") {
    return (
      <Image src="/icons/facebook.svg" alt="Facebook" width={23} height={23} />
    );
  }

  return (
    <Image src="/icons/whatsapp.svg" alt="Whatsapp" width={22} height={22} />
  );
}
