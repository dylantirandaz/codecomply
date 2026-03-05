"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ComplianceResultDisplay } from "@/components/compliance-result";
import { LoadingState } from "@/components/loading-state";
import type { ComplianceResult } from "@/lib/compliance/types";
import Link from "next/link";

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/check/${id}`);
        if (!res.ok) {
          throw new Error("Result not found");
        }
        const data = await res.json();
        setResult(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load result");
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24">
        <LoadingState />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="border border-stone-200 bg-white px-8 py-10">
          <p className="font-serif text-xl text-stone-900">Not Found</p>
          <p className="mt-2 text-[13px] text-stone-500">
            {error || "This compliance report could not be located."}
          </p>
          <Link
            href="/check"
            className="mt-6 inline-block border border-stone-900 bg-stone-900 px-6 py-2 text-[11px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800"
          >
            New Analysis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-baseline justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
            Compliance Report
          </p>
          <div className="rule-line mt-3 w-12" />
        </div>
        <Link
          href="/check"
          className="text-[11px] uppercase tracking-wider text-stone-400 transition-colors hover:text-stone-700"
        >
          New Analysis
        </Link>
      </div>
      <ComplianceResultDisplay result={result} />
      <p className="mt-6 text-center text-[10px] tracking-wider text-stone-300">
        Ref. {id}
      </p>
    </div>
  );
}
