import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-50 px-4">
      <div className="max-w-sm text-center">
        <p className="text-sm font-medium text-primary">۴۰۴</p>
        <h1 className="mt-2 text-2xl font-bold">صفحه پیدا نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          نشانی مورد نظر شما وجود ندارد یا به صفحه دیگری منتقل شده است.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
    </main>
  );
}
