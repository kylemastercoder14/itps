"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "./form-controls";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type WizardActionsProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
};

export function WizardActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: WizardActionsProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      {currentStep > 1 ? (
        <Button
          variant="secondary"
          className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
          onClick={onBack}
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Button>
      ) : null}
      <Button
        className="rounded-lg bg-zinc-200 px-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-300"
        variant="secondary"
      >
        Cancel
      </Button>
      <Button
        className="rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
        onClick={() => {
          onNext();
          if (currentStep === totalSteps) {
            toast.success("Employee added successfully!");
            router.push("/admin/employees")
          }
        }}
      >
        {currentStep === totalSteps
          ? "Submit & Add Employee"
          : `Next: ${nextLabel(currentStep)}`}
        <ArrowRight className="size-3.5" />
      </Button>
    </div>
  );
}

function nextLabel(step: number) {
  return (
    [
      "Job Information",
      "Compensation",
      "Additional Information",
      "Biometrics Registration",
      "Review & Submit",
    ][step - 1] ?? "Next"
  );
}
