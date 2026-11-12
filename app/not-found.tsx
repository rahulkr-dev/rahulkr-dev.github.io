import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal lost",
  robots: { index: false },
};

const linkClass =
  "rounded-full border px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/** Off-air card, in the same broadcast style as the start screen. */
export default function NotFound() {
  return (
    <main
      className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 44%, #17181d 0%, #08080a 62%, #040405 100%)",
      }}
    >
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-white/55">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
        OFF AIR
      </p>
      <h1 className="mt-6 text-7xl font-semibold tabular-nums sm:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-white/70">
        Signal lost. This page does not exist, or it moved.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={`${linkClass} border-[#ff3b30]/70 bg-[#ff3b30]/10 hover:bg-[#ff3b30]`}
        >
          Back to the desk
        </Link>
        <Link
          href="/classic"
          className={`${linkClass} border-white/25 hover:bg-white/10`}
        >
          Classic site
        </Link>
      </div>
    </main>
  );
}
