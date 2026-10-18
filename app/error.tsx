"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-50 px-4">
      <div className="max-w-sm text-center">
        <p className="text-sm font-medium text-destructive">خطایی رخ داد</p>
        <h1 className="mt-2 text-2xl font-bold">بارگذاری صفحه ممکن نیست</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          لطفاً چند لحظه بعد دوباره تلاش کنید. در صورت تکرار با پشتیبانی تماس
          بگیرید.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={() => reset()}>تلاش مجدد</Button>
        </div>
      </div>
    </main>
  );
}
