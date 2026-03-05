import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 sm:pt-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
              Automated Zoning & Code Analysis
            </p>

            <div className="rule-line mx-auto mt-5 w-16" />

            <h1 className="mt-6 font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl sm:leading-tight">
              Building Code Compliance,{" "}
              <em className="italic">Resolved.</em>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-stone-500">
              Submit a townhome development proposal and receive a thorough
              compliance determination against municipal zoning ordinances
              — in seconds, not weeks.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/check"
                className="inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-8 py-3 text-[12px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800"
              >
                Begin Analysis
              </Link>
              <Link
                href="/check"
                className="inline-flex items-center border border-stone-300 bg-white px-8 py-3 text-[12px] font-medium uppercase tracking-wider text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900"
              >
                Upload Permit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="rule-line-heavy mx-auto w-full max-w-4xl" />

      {/* Process */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          The Process
        </p>
        <div className="rule-line mx-auto mt-4 w-12" />

        <div className="mt-14 grid gap-16 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-serif text-3xl text-stone-300">I.</p>
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900">
              Describe
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-500">
              Provide your lot dimensions, building specifications, setbacks,
              and parking — or upload a PDF for automated extraction.
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-stone-300">II.</p>
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900">
              Analyze
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-500">
              Each regulation is checked against your proposal — dimensional
              standards computed instantly, special conditions evaluated by AI
              against the code text.
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-stone-300">III.</p>
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900">
              Determine
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-500">
              Receive a detailed compliance report with pass or fail for every
              rule, specific code references, and recommendations for
              resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="rule-line mx-auto w-full max-w-4xl" />

      {/* Jurisdiction */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center justify-between border border-stone-200 bg-white px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-green-700" />
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Dallas, Texas
              </p>
              <p className="text-xs text-stone-400">
                Chapter 51A Development Code — TH-1(A), TH-2(A), TH-3(A)
                Townhouse Districts
              </p>
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-stone-400">
            Active
          </p>
        </div>
        <p className="mt-3 text-center text-xs text-stone-400">
          Additional jurisdictions forthcoming.
        </p>
      </section>
    </div>
  );
}
