import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ReactivateAccountPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#06110f] text-white">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 pb-7">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Card className="mt-10 w-full max-w-lg rounded-2xl p-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Reactivate your account
            </h1>
            <p className="mt-2 max-w-md text-base font-medium leading-6 text-zinc-600">
              Your account has been inactive for more than 3 months. Enter the
              code we sent to kylemastercoder14@gmail.com to reactivate your
              account.
            </p>

            <form className="mt-7 space-y-4">
              <Input
                aria-label="Reactivation code"
                defaultValue="33332-46084"
                inputMode="numeric"
              />
              <a
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
                href="#"
              >
                Resend code
              </a>
              <Button size="lg" className="w-full">
                Log in
              </Button>
            </form>

            <a
              className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
              href="#"
            >
              Lost access to email?
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
