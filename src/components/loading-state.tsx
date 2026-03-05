"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Reviewing proposal",
  "Checking setback requirements",
  "Evaluating density limits",
  "Assessing parking compliance",
  "Verifying height restrictions",
  "Preparing determination",
];

export function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-sm border border-stone-200 bg-white px-8 py-12 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
        Analysis in Progress
      </p>
      <div className="rule-line mx-auto mt-4 w-12" />

      <p className="mt-6 font-serif text-lg text-stone-700">{STEPS[step]}</p>

      <div className="mx-auto mt-6 flex justify-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-5 transition-colors duration-500 ${
              i <= step ? "bg-stone-900" : "bg-stone-200"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-[11px] text-stone-400">
        Step {step + 1} of {STEPS.length}
      </p>
    </div>
  );
}
