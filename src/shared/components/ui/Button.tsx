import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "outline";
  children: ReactNode;
};
export function Button({
  loading = false,
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 ${
        variant === "primary"
          ? "bg-[#285ce6] text-white shadow-[0_5px_15px_rgba(37,99,235,.18)] hover:bg-[#1e4ed3]"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      } ${className}`}>
      {loading && (
        <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
