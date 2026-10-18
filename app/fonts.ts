import localFont from "next/font/local";

export const vazirmatnFont = localFont({
  src: [
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const sansFontFamily = [
  "var(--font-vazirmatn)",
  "Vazirmatn",
  "IRANSans",
  "Tahoma",
  "Arial",
  "ui-sans-serif",
  "system-ui",
  "sans-serif",
].join(", ");

export const monoFontFamily = [
  "ui-monospace",
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  "monospace",
].join(", ");
