import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button";
import { Input } from "../../../shared/components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginValues } from "../schemas/auth.schema";
export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  async function onSubmit(values: LoginValues) {
    setServerError("");
    try {
      await login(values);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        id="email"
        label="Email address"
        type="email"
        autoComplete="username"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#285ce6] hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          label=""
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}
      <Button type="submit" loading={isSubmitting}>
        Sign in <ArrowRight size={17} />
      </Button>
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#f7f9fc] px-4 text-xs text-slate-400">
            DEMO MODE
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-blue-100 bg-[#eef4ff] p-4">
        <div className="flex items-start gap-2.5">
          <Info size={17} className="mt-0.5 shrink-0 text-blue-600" />
          <div className="min-w-0 text-xs leading-6 text-slate-600">
            <p className="font-semibold text-slate-800">Try the demo account</p>
            <p>
              Email: <span className="font-medium">demo@northstar.dev</span>
            </p>
            <p>
              Password: <span className="font-medium">Password123!</span>
            </p>
            <button
              type="button"
              className="mt-1 font-semibold text-blue-700 hover:underline"
              onClick={() => {
                setValue("email", "demo@northstar.dev", {
                  shouldValidate: true,
                });
                setValue("password", "Password123!", { shouldValidate: true });
                setServerError("");
              }}>
              Fill demo credentials →
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
