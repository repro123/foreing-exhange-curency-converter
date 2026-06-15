"use client";

import Link from "next/link";
import { useEffect } from "react";
import LogoSVG from "@/app/components/SVGs/LogoSVG";

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-480 flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <LogoSVG />
          <p className="preset-6 text-nav md:preset-4">SYSTEM ALERT</p>
        </header>

        <section className="grid flex-1 place-items-center py-12">
          <div className="w-full max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-error/35 bg-error/10 px-4 py-2 text-error">
              <span className="size-2 rounded-full bg-error shadow-[0_0_20px_rgba(255,65,65,0.85)]" />
              <span className="preset-5-medium uppercase">
                Conversion desk offline
              </span>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-white/4 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

              <p className="preset-5-medium mb-4 uppercase text-primary">
                Error boundary
              </p>
              <h1 className="preset-1-tablet mb-5 max-w-2xl md:preset-1">
                Something interrupted the exchange feed.
              </h1>
              <p className="preset-4 max-w-2xl text-nav">
                The app hit an unexpected problem while preparing the currency
                dashboard. You can retry the current view, or return to the
                homepage and start from a clean state.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => unstable_retry()}
                  className="preset-5-medium inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-background transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Try again
                </button>
                <Link
                  href="/"
                  className="preset-5-medium inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Back to dashboard
                </Link>
              </div>

              <div className="mt-10 grid gap-3 border-t border-white/10 pt-6 text-nav sm:grid-cols-3">
                <div>
                  <p className="preset-6 mb-2 uppercase text-foreground/80">
                    Status
                  </p>
                  <p className="preset-5">Failed request</p>
                </div>
                <div>
                  <p className="preset-6 mb-2 uppercase text-foreground/80">
                    Action
                  </p>
                  <p className="preset-5">Retry available</p>
                </div>
                <div>
                  <p className="preset-6 mb-2 uppercase text-foreground/80">
                    Data
                  </p>
                  <p className="preset-5">Protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
