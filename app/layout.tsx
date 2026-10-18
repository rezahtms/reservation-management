import type { Metadata, Viewport } from "next";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "cn";
import "@/app/globals.css";
import { vazirmatnFont } from "@/app/fonts";
import { Sonner } from "@/components/ui/Sonner";

export const metadata: Metadata = {
  title: "سامانه مدیریت رزرو",
  description: "پنل مدیریت رزرو نوبت‌های خدمات",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "سامانه مدیریت رزرو",
    description: "پنل مدیریت رزرو نوبت‌های خدمات",
    locale: "fa_IR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("h-full", vazirmatnFont.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-full bg-background font-sans antialiased",
          vazirmatnFont.className,
        )}
      >
        <DirectionProvider direction="rtl">
          {children}
          <Sonner />
        </DirectionProvider>
      </body>
    </html>
  );
}
