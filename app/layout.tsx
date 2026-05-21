import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MERIDIAN — customer lifecycle, instrumented",
    template: "%s · MERIDIAN",
  },
  description:
    "An operating system for customer-lifecycle intelligence. Signals, not dashboards. Instruments, not reports.",
  metadataBase: new URL("https://meridian.example.com"),
  openGraph: {
    title: "MERIDIAN",
    description:
      "An operating system for customer-lifecycle intelligence. Signals, not dashboards.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161922" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fraunces.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
