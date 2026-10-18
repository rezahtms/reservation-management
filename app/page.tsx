import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import LoginForm from "@/components/pages/login/LoginForm";

export const metadata: Metadata = {
  title: "ورود | سامانه مدیریت رزرو",
  description: "صفحه ورود به پنل مدیریت رزرو",
  robots: { index: true, follow: true },
};

export const instant = false;

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50/70 px-4 py-10">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-violet-500/10 blur-3xl" />

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground shadow-md shadow-primary/25">
            <CalendarDays className="size-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            سامانه مدیریت رزرو
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            مدیریت هوشمند نوبت‌های مشتریان در یک نگاه
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
