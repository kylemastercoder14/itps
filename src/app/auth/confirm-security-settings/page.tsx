import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ConfirmSecuritySettingsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#06110f] text-white">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 pb-7">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Card className="mt-10 w-full max-w-lg rounded-2xl p-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Review your security settings
            </h1>
            <p className="mt-2 max-w-md text-base font-medium leading-6 text-zinc-600">
              Keep your account safe by making sure your security settings are
              up-to-date.
            </p>

            <div className="mt-8 space-y-5">
              <SecurityRow title="PASSKEYS" status="On" />

              <SecurityPanel title="TWO-STEP AUTHENTICATION">
                <p className="text-base leading-6 text-zinc-900">
                  You don&apos;t have two-step turned on. Add an extra layer of
                  security so only you can access your account, even if someone
                  else has your password.
                </p>
              </SecurityPanel>

              <SecurityPanel title="RECOVERY OPTIONS">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-zinc-900">
                    Secondary email
                  </span>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600"
                  >
                    Off
                  </Badge>
                </div>
              </SecurityPanel>
            </div>

            <div className="mt-6 space-y-3">
              <Button size="lg" className="w-full">
                Confirm
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full font-normal"
              >
                Go to security settings
              </Button>
            </div>

            <a
              className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
              href="#"
            >
              Remind me next time
            </a>
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

function SecurityRow({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4">
      <h2 className="text-sm font-medium tracking-tight text-zinc-950">
        {title}
      </h2>
      <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
        {status}
      </Badge>
    </div>
  );
}

function SecurityPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4">
        <h2 className="text-sm font-medium tracking-tight text-zinc-950">
          {title}
        </h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}
