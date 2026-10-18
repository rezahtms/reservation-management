"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { useAuthStore } from "@/lib/stores/auth.store";
import { formatJalali } from "@/lib/utils/date.util";

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/dashboard", label: "داشبورد مدیریت", icon: LayoutDashboard },
];

interface PanelShellProps {
  children: React.ReactNode;
}

function PanelShell({ children }: PanelShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const todayFormatted = React.useMemo(() => formatJalali(new Date()), []);

  const handleLogout = () => {
    logout();
    toast.success("با موفقیت از حساب کاربری خارج شدید");
    router.replace("/");
  };

  const activeNavItem =
    NAVIGATION_ITEMS.find(
      (item) =>
        pathname === item.href || pathname?.startsWith(`${item.href}/`),
    ) ?? NAVIGATION_ITEMS[0];

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-slate-50/80">
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex h-dvh w-64 shrink-0 flex-col border-l border-slate-200/80 bg-white shadow-sm transition-transform duration-200 md:static md:translate-x-0",
          isMobileSidebarOpen
            ? "translate-x-0"
            : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground shadow-sm shadow-primary/25">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <span className="block text-sm font-bold tracking-tight text-slate-900">
                سامانه رزرویار
              </span>
              <span className="block text-[11px] text-muted-foreground">
                پنل مدیریت هوشمند
              </span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="بستن منو"
          >
            <X className="size-4" />
          </Button>
        </div>

        <Separator />

        <div className="px-4 pt-4 pb-2">
          <p className="px-2 text-[11px] font-semibold text-muted-foreground">
            منوی اصلی
          </p>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-1" aria-label="منوی اصلی">
          {NAVIGATION_ITEMS.map((navigationItem) => {
            const isActive =
              pathname === navigationItem.href ||
              pathname?.startsWith(`${navigationItem.href}/`);
            const NavigationIcon = navigationItem.icon;

            return (
              <Link
                key={navigationItem.href}
                href={navigationItem.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <NavigationIcon className="size-4" />
                <span>{navigationItem.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mb-3 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-violet-50/50 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
            <Sparkles className="size-3.5 text-primary" />
            <span>وضعیت سامانه</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-indigo-700/80">
            تمامی نوبت‌ها و فیلترها به‌صورت آنی همگام‌سازی می‌شوند.
          </p>
        </div>

        <Separator />

        <div className="shrink-0 p-3.5">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 p-2.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">
                {currentUser?.name}
              </p>
              <p
                className="truncate text-[11px] text-muted-foreground"
                dir="ltr"
              >
                {currentUser?.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-full justify-center gap-2 rounded-xl border-rose-200/70 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            خروج از حساب کاربری
          </Button>
        </div>
      </aside>

      {isMobileSidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden
        />
      ) : null}

      <div className="flex h-dvh min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="باز کردن منو"
            >
              <Menu className="size-5" />
            </Button>
            <div>
              <h2 className="text-sm font-bold text-slate-900 md:text-base">
                {activeNavItem?.label ?? "پنل مدیریت"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>امروز: {todayFormatted}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export { PanelShell };
export default PanelShell;
