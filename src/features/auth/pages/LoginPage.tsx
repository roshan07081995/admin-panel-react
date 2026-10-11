import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";
export function LoginPage() {
  return (
    <AuthLayout>
      <div className="mb-9">
        <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          WELCOME BACK
        </div>
        <h1 className="text-[36px] font-semibold tracking-[-.05em] text-slate-900 sm:text-[42px]">
          Sign in to your account
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-slate-500">
          Good to have you back. Let's pick up where you left off.
        </p>
      </div>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-slate-500">
        New to RS?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#285ce6] hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
