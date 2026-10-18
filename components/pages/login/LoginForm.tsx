"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { FormInput } from "@/components/shared/form/FormInput";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth.validation";
import { useAuthStore } from "@/lib/stores/auth.store";
import { DEMO_CREDENTIALS } from "@/lib/constants/auth.const";
import { toPersianDigits } from "@/lib/utils/persian.util";

function LoginForm() {
  const router = useRouter();
  const authenticateUser = useAuthStore((state) => state.login);
  const isHydrated = useAuthStore((state) => state.hydrated);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [authenticationError, setAuthenticationError] = React.useState<
    string | null
  >(null);

  const handleLoginSubmit = form.handleSubmit((formValues) => {
    setAuthenticationError(null);
    const loginResult = authenticateUser(formValues);
    if (!loginResult.ok) {
      const errorMessage = loginResult.error ?? "ورود ناموفق بود";
      setAuthenticationError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    toast.success("با موفقیت وارد پنل مدیریت شدید");
    router.push("/dashboard");
  });

  const handleFillDemoCredentials = () => {
    form.setValue("email", DEMO_CREDENTIALS.email, { shouldValidate: true });
    form.setValue("password", DEMO_CREDENTIALS.password, {
      shouldValidate: true,
    });
  };

  if (!isHydrated) {
    return (
      <Card className="w-full border-slate-200/80 shadow-lg shadow-slate-200/40">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-2xl border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl font-bold text-slate-900">
          ورود به پنل مدیریت
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          برای دسترسی به سامانه مدیریت رزرو، ایمیل و رمز عبور خود را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <FormInput<LoginFormValues>
              name="email"
              type="email"
              label="آدرس ایمیل"
              placeholder="modir@example.com"
              autoComplete="email"
              dir="ltr"
            />
            <FormInput<LoginFormValues>
              name="password"
              label="رمز عبور"
              type="password"
              placeholder="رمز عبور را وارد کنید"
              autoComplete="current-password"
              dir="ltr"
            />
            {authenticationError ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {authenticationError}
              </p>
            ) : null}
            <Button
              type="submit"
              size="lg"
              className="mt-1 h-11 w-full rounded-xl font-semibold shadow-sm shadow-primary/25"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "در حال ورود..." : "ورود به پنل"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 text-xs leading-6 text-slate-600">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold text-indigo-950">
              <Sparkles className="size-3.5 text-primary" />
              اطلاعات حساب دمو
            </span>
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-primary shadow-2xs transition hover:bg-primary hover:text-white"
            >
              پر کردن خودکار
            </button>
          </div>
          <p className="flex items-center gap-2">
            <Mail className="size-3.5 text-primary/80" />
            <span>ایمیل:</span>
            <span
              className="font-mono font-medium text-slate-900"
              dir="ltr"
            >
              {DEMO_CREDENTIALS.email}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <LockKeyhole className="size-3.5 text-primary/80" />
            <span>رمز عبور:</span>
            <span
              className="font-mono font-medium text-slate-900"
              dir="ltr"
            >
              {toPersianDigits(DEMO_CREDENTIALS.password)}
            </span>
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          با ورود به سامانه، با{" "}
          <Link
            href="#"
            className="font-medium text-primary underline underline-offset-2"
          >
            قوانین و مقررات استفاده
          </Link>{" "}
          موافقت می‌کنید.
        </p>
      </CardContent>
    </Card>
  );
}

export { LoginForm };
export default LoginForm;
