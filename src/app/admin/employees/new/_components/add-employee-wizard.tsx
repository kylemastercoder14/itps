"use client";

import { useState } from "react";

import { ADD_EMPLOYEE_STEPS } from "@/constants/admin-dashboard";

import { StepPanel } from "./step-panels";
import { WizardActions } from "./wizard-actions";
import { WizardStepper } from "./wizard-stepper";
import { IconChevronRight, IconUserFilled } from "@tabler/icons-react";
import Link from "next/link";

const TOTAL_STEPS = ADD_EMPLOYEE_STEPS.length;

export function AddEmployeeWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/admin/employees">
            <IconUserFilled className="size-4 text-zinc-900" />
          </Link>
          <div className="flex items-center gap-1.5">
            <IconChevronRight className="size-3.5" />
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Add Employee
            </h1>
          </div>
        </div>
        <WizardActions
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={() => setCurrentStep((step) => Math.max(1, step - 1))}
          onNext={() =>
            setCurrentStep((step) => Math.min(TOTAL_STEPS, step + 1))
          }
        />
      </div>
      <WizardStepper activeStep={currentStep} onStepChange={setCurrentStep} />
      <StepPanel step={currentStep} />
    </div>
  );
}
