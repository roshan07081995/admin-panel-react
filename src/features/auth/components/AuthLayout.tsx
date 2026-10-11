import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react";
export function Logo() {
  return (
    <Link
      to="/login"
      className="inline-flex items-center gap-2.5 font-bold tracking-tight text-slate-900"
      aria-label="Northstar home">
      <span className="grid size-9 place-items-center rounded-xl bg-[#285ce6] text-white shadow-md shadow-blue-200">
        <Sparkles size={20} strokeWidth={2.3} />
      </span>
      <span className="text-[21px]">
        Bhavuk<span className="text-[#285ce6]">.</span>
      </span>
    </Link>
  );
}
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#1745ba] px-12 py-10 text-white lg:flex lg:flex-col xl:px-20">
        <div className="absolute -right-32 -top-28 size-[480px] rounded-full border border-white/15" />
        <div className="absolute -right-16 top-10 size-[350px] rounded-full border border-white/10" />
        <div className="absolute -bottom-48 -left-40 size-[570px] rounded-full bg-[#3668e6]/70 blur-3xl" />
        <div className="relative z-10 flex items-center gap-2.5 text-xl font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-white/15">
            <Sparkles size={20} />
          </span>
          Bhavuk.
        </div>
        <div className="relative z-10 my-auto max-w-xl py-16">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-blue-50">
            <span className="size-1.5 rounded-full bg-[#9de7ff]" /> Your space
            to do great things
          </div>
          <h1 className="text-5xl font-semibold leading-[1.13] tracking-[-.055em] xl:text-[64px]">
            One place for
            <br />
            your <span className="text-[#a9c9ff]">best work.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-blue-100/90">
            A simpler, more thoughtful way to organize your day, stay focused,
            and make progress on what matters.
          </p>
          <div className="mt-12 space-y-5">
            {[
              "Everything you need, beautifully connected",
              "Your workspace, always in sync",
              "Built with privacy at its core",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-blue-50">
                <span className="grid size-6 place-items-center rounded-full bg-white/15">
                  <Check size={14} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-7 text-xs text-blue-100/80">
          <span>© 2026 Bhavuk, Inc.</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} /> Made for peace of mind
          </span>
        </div>
      </aside>
      <main className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-14 lg:py-10 xl:px-24">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="hidden text-xs text-slate-400 sm:block">
            A better way to work <ArrowUpRight size={13} className="inline" />
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-14">
          {children}
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span>© 2026 Bhavuk</span>
          <span>Demo experience · No real account required</span>
        </footer>
      </main>
    </div>
  );
}
