import type { Metadata } from "next";
import type { ReactNode } from "react";
import AuthGuard from "@/components/shared/layout/AuthGuard";
import PanelShell from "@/components/shared/layout/PanelShell";

export const metadata: Metadata = {
  title: "داشبورد | سامانه مدیریت رزرو",
  description: "پنل داخلی مدیریت رزروها و نوبت‌ها",
  robots: { index: false, follow: false },
};

interface PanelLayoutProps {
  children: ReactNode;
}

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <AuthGuard>
      <PanelShell>{children}</PanelShell>
    </AuthGuard>
  );
}
