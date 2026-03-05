import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-stone-300 bg-stone-900">
            <span className="font-serif text-sm font-bold text-stone-50">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[15px] font-semibold leading-tight text-stone-900">
              CodeComply
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-400">
              Est. 2025
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/check"
            className="text-[13px] tracking-wide text-stone-500 transition-colors hover:text-stone-900"
          >
            Compliance Check
          </Link>
          <Link
            href="/docs"
            className="text-[13px] tracking-wide text-stone-500 transition-colors hover:text-stone-900"
          >
            API Docs
          </Link>
          <Link
            href="/check"
            className="border border-stone-900 bg-stone-900 px-4 py-2 text-[12px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
