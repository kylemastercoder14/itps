"use client"

import { Check } from "lucide-react"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperTrigger,
} from "@/components/reui/stepper"
import { ADD_EMPLOYEE_STEPS } from "@/constants/admin-dashboard"

type WizardStepperProps = {
  activeStep: number
  onStepChange: (step: number) => void
}

export function WizardStepper({
  activeStep,
  onStepChange,
}: WizardStepperProps) {
  return (
    <Stepper
      value={activeStep}
      onValueChange={onStepChange}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
      indicators={{ completed: <Check className="size-3.5" /> }}
    >
      <StepperNav>
        {ADD_EMPLOYEE_STEPS.map((item) => (
          <StepperItem key={item.step} step={item.step}>
            <StepperTrigger className="gap-2">
              <StepperIndicator className="size-6 text-[10px]">
                {item.step}
              </StepperIndicator>
              <span className="hidden min-w-0 text-left xl:block">
                <StepperTitle className="text-xs font-bold text-zinc-900">
                  {item.title}
                </StepperTitle>
                <StepperDescription className="text-[10px]">
                  {item.description}
                </StepperDescription>
              </span>
            </StepperTrigger>
            {item.step < ADD_EMPLOYEE_STEPS.length ? (
              <StepperSeparator className="mx-3 group-data-[state=completed]/step:bg-zinc-900" />
            ) : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  )
}
