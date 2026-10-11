import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
export function Input({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`block h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
            error ? "border-red-400" : "border-slate-200"
          } ${isPassword ? "pr-12" : ""} ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600">
            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
