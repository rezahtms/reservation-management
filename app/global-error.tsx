"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body className="flex min-h-dvh items-center justify-center bg-slate-50 px-4">
        <div className="max-w-sm text-center">
          <p className="text-sm font-medium text-destructive">خطای بحرانی</p>
          <h1 className="mt-2 text-2xl font-bold">سامانه در دسترس نیست</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            مشکلی در اجرای برنامه به وجود آمده است.
          </p>
          <Button className="mt-6" onClick={() => reset()}>
            تلاش مجدد
          </Button>
        </div>
      </body>
    </html>
  );
}
