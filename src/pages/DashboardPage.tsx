import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "../features/auth/components/AuthLayout";
import { useAuth } from "../features/auth/context/AuthContext";
export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Logo />
          <button
            disabled={busy}
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60">
            <LogOut size={16} />
            {busy ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          <CheckCircle2 size={14} /> Demo session active
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Welcome back, {user?.name.split(" ")[0]}{" "}
          <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-3 text-slate-500">
          Here's your personal workspace. You're signed in using the mock auth
          service.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Your workspace",
              text: "Everything is ready for your next great idea.",
            },
            {
              icon: CalendarDays,
              title: "Stay on track",
              text: "Keep your priorities and plans in one place.",
            },
            {
              icon: ShieldCheck,
              title: "Account details",
              text: user?.email ?? "",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="mb-6 grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={22} />
              </span>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                {text}
              </p>
              <ArrowRight size={18} className="mt-6 text-blue-600" />
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-400">
          Demo note: refreshing the page ends this in-memory session. Real
          sessions will be added when the backend is connected.
        </p>
      </main>
    </div>
  );
}
