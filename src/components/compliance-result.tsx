"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ComplianceResult as ComplianceResultType, CheckItem } from "@/lib/compliance/types";

function CheckRow({ check }: { check: CheckItem }) {
  return (
    <div className="flex items-start gap-4 border-b border-stone-100 py-4 last:border-0">
      <div
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
          check.compliant ? "bg-green-700" : "bg-red-800"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium text-stone-900">{check.ruleName}</p>
          <span
            className={`shrink-0 text-[11px] font-medium uppercase tracking-wider ${
              check.compliant ? "text-green-700" : "text-red-800"
            }`}
          >
            {check.compliant ? "Pass" : "Fail"}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-stone-400">{check.codeReference}</p>
        <div className="mt-2 flex gap-6 text-[12px]">
          <span className="text-stone-400">
            Required:{" "}
            <span className="text-stone-600">{check.required}</span>
          </span>
          <span className="text-stone-400">
            Proposed:{" "}
            <span className="text-stone-600">{check.proposed}</span>
          </span>
        </div>
        {!check.compliant && (
          <p className="mt-2 text-[12px] leading-relaxed text-red-800/80">
            {check.explanation}
          </p>
        )}
      </div>
    </div>
  );
}

export function ComplianceResultDisplay({
  result,
}: {
  result: ComplianceResultType;
}) {
  const violations = result.checks.filter((c) => !c.compliant);
  const passes = result.checks.filter((c) => c.compliant);

  return (
    <div className="space-y-8">
      {/* Verdict */}
      <div className="border border-stone-200 bg-white">
        <div
          className={`border-b-2 px-8 py-6 ${
            result.overallCompliant ? "border-b-green-700" : "border-b-red-800"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-400">
                Determination
              </p>
              <h2
                className={`mt-2 font-serif text-2xl font-medium ${
                  result.overallCompliant ? "text-green-800" : "text-red-900"
                }`}
              >
                {result.overallCompliant ? "Compliant" : "Non-Compliant"}
              </h2>
              <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">
                {result.summary}
              </p>
            </div>
            <div className="shrink-0 border border-stone-200 px-3 py-1.5">
              <p className="text-[10px] uppercase tracking-wider text-stone-400">
                Confidence
              </p>
              <p className="text-[13px] font-medium capitalize text-stone-700">
                {result.confidence}
              </p>
            </div>
          </div>

          <div className="rule-line mt-5" />

          <div className="mt-4 flex gap-6">
            <p className="flex items-center gap-2 text-[12px] text-stone-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
              {passes.length} passed
            </p>
            {violations.length > 0 && (
              <p className="flex items-center gap-2 text-[12px] text-stone-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-800" />
                {violations.length} failed
              </p>
            )}
            <p className="text-[12px] text-stone-400">
              {result.checks.length} total
            </p>
          </div>
        </div>
      </div>

      {/* Violations */}
      {violations.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-800">
              Violations
            </span>
            <div className="h-px flex-1 bg-red-200" />
          </div>
          <div className="border border-stone-200 bg-white px-6">
            {violations.map((check, i) => (
              <CheckRow key={i} check={check} />
            ))}
          </div>
        </div>
      )}

      {/* All Checks */}
      <Accordion type="single" collapsible>
        <AccordionItem value="all-checks" className="border-stone-200">
          <AccordionTrigger className="text-[12px] uppercase tracking-wider text-stone-500 hover:text-stone-900">
            All Checks ({result.checks.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="border border-stone-200 bg-white px-6">
              {result.checks.map((check, i) => (
                <CheckRow key={i} check={check} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="border-l-2 border-l-amber-600 bg-amber-50/50 py-4 pl-5 pr-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-800">
            Advisories
          </p>
          <ul className="mt-2 space-y-1.5">
            {result.warnings.map((w, i) => (
              <li key={i} className="text-[12px] leading-relaxed text-amber-900/70">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="border border-stone-200 bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
            Recommendations
          </p>
          <ul className="mt-3 space-y-1.5">
            {result.recommendations.map((r, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-stone-600">
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verify with City */}
      {result.jurisdiction && (
        <div className="border border-stone-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-stone-200">
              <svg className="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">
                Verify Before Filing
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-stone-500">
                {result.jurisdiction.contactNote}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${result.jurisdiction.contactPhone}`}
                  className="border border-stone-200 px-3 py-1.5 text-[12px] font-medium text-stone-700 transition-colors hover:bg-stone-50"
                >
                  {result.jurisdiction.contactPhone}
                </a>
                <span className="text-[11px] text-stone-400">
                  {result.jurisdiction.contactDepartment}
                </span>
              </div>
              {result.jurisdiction.stale && (
                <div className="mt-3 flex items-center gap-2 border-l-2 border-l-amber-500 pl-3">
                  <p className="text-[11px] text-amber-800">
                    Data last verified {result.jurisdiction.lastVerified} — may be outdated
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="py-4">
        <div className="rule-line mb-4" />
        <p className="text-center text-[10px] leading-relaxed tracking-wide text-stone-400">
          This analysis is provided for informational purposes and does not constitute a legal
          determination or building permit approval. Zoning ordinances may include amendments,
          planned development overlays, or conditions not reflected herein. Always confirm
          requirements with your local building department before filing applications.
          {result.jurisdiction && (
            <>
              {" "}If you have found a discrepancy,{" "}
              <button className="underline underline-offset-2 hover:text-stone-600">
                please report it
              </button>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
