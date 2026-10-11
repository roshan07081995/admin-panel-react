import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { resetSchema, type ResetValues } from "../schemas/auth.schema";
import { mockAuthService } from "../services/mockAuthService";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });
  async function submit({ email }: ResetValues) {
    await mockAuthService.resetPassword(email);
    setSent(true);
  }
  return (
    <AuthLayout>
      <div className="mb-8 grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Mail size={25} />
      </div>
      <h1 className="text-[36px] font-semibold tracking-[-.05em] text-slate-900">
        Reset your password
      </h1>
      <p className="mt-3 mb-8 text-[15px] leading-7 text-slate-500">
        {sent
          ? "In a real app, you would receive a reset link if this email has an account. No email was sent in demo mode."
          : "Enter your email and we’ll help you get back to your account."}
      </p>
      {sent ? (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Demo reset request completed.
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Button type="submit" loading={isSubmitting}>
            Continue
          </Button>
        </form>
      )}
      <Link
        to="/login"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#285ce6] hover:underline">
        <ArrowLeft size={16} /> Back to sign in
      </Link>
    </AuthLayout>
  );
}
