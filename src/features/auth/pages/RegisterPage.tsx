import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { registerSchema, type RegisterValues } from "../schemas/auth.schema";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
export function RegisterPage() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });
  async function submit(values: RegisterValues) {
    setError("");
    try {
      await createAccount(values);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Could not create demo account. Please try again.");
    }
  }
  return (
    <AuthLayout>
      <div className="mb-9">
        <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          GET STARTED
        </div>
        <h1 className="text-[36px] font-semibold tracking-[-.05em] text-slate-900 sm:text-[42px]">
          Create your account
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-slate-500">
          A fresh start to your most productive days.
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
        <Input
          id="name"
          label="Full name"
          placeholder="Alex Morgan"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <Button type="submit" loading={isSubmitting}>
          Create account <ArrowRight size={17} />
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#285ce6] hover:underline">
          Sign in
        </Link>
      </p>
      <p className="mt-6 text-center text-xs leading-6 text-slate-400">
        Demo registration only. No account is saved to a server.
      </p>
    </AuthLayout>
  );
}
