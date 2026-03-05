"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalForm } from "@/components/proposal-form";
import { PdfUploader } from "@/components/pdf-uploader";
import { ComplianceResultDisplay } from "@/components/compliance-result";
import { LoadingState } from "@/components/loading-state";
import type { ProposalInput } from "@/lib/schemas/proposal";
import type { ComplianceResult } from "@/lib/compliance/types";

export default function CheckPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfDefaults, setPdfDefaults] = useState<Partial<ProposalInput> | null>(
    null
  );

  async function handleSubmit(data: ProposalInput) {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || json.message || "Check failed");
      }

      setResult(json.result);
      setResultId(json.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handlePdfExtracted(data: Record<string, unknown>) {
    const defaults: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        defaults[key] = value;
      }
    }
    setPdfDefaults(defaults as Partial<ProposalInput>);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24">
        <LoadingState />
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
              Compliance Report
            </p>
            <div className="rule-line mt-3 w-12" />
          </div>
          <button
            onClick={() => {
              setResult(null);
              setResultId(null);
            }}
            className="text-[11px] uppercase tracking-wider text-stone-400 transition-colors hover:text-stone-700"
          >
            New Analysis
          </button>
        </div>
        <ComplianceResultDisplay result={result} />
        {resultId && (
          <p className="mt-6 text-center text-[10px] tracking-wider text-stone-300">
            Ref. {resultId}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Compliance Analysis
        </p>
        <div className="rule-line mt-3 w-12" />
        <h1 className="mt-4 font-serif text-2xl font-medium text-stone-900">
          Submit a Proposal
        </h1>
        <p className="mt-2 text-[13px] text-stone-500">
          Provide your development details below, or upload a building permit
          for automated extraction.
        </p>
      </div>

      {error && (
        <div className="mb-6 border-l-2 border-l-red-800 bg-red-50/50 py-3 pl-4 pr-5 text-[13px] text-red-900">
          {error}
        </div>
      )}

      <Tabs defaultValue="form">
        <TabsList className="mb-8 border border-stone-200 bg-stone-50">
          <TabsTrigger
            value="form"
            className="text-[11px] uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-stone-900 text-stone-400"
          >
            Form Entry
          </TabsTrigger>
          <TabsTrigger
            value="pdf"
            className="text-[11px] uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-stone-900 text-stone-400"
          >
            PDF Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <ProposalForm
            onSubmit={handleSubmit}
            loading={loading}
            defaultValues={pdfDefaults ?? undefined}
          />
        </TabsContent>

        <TabsContent value="pdf">
          <div className="space-y-4">
            <PdfUploader onExtracted={handlePdfExtracted} />
            {pdfDefaults && (
              <div className="border-l-2 border-l-green-700 bg-green-50/50 py-3 pl-4 pr-5 text-[13px] text-green-900">
                Data extracted successfully. Switch to Form Entry to review and submit.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
