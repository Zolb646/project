import { JetBrains_Mono, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";
import StructuredData from "@/components/StructuredData";
import { getSiteStructuredData } from "@/lib/structured-data";
import "@/app/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export default function SiteLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html
      lang={locale}
      className={`scroll-smooth ${jetbrainsMono.variable} ${manrope.variable}`}
      suppressHydrationWarning>
      <body
        className="min-h-screen bg-cream text-navy antialiased"
        suppressHydrationWarning>
        <StructuredData data={getSiteStructuredData(locale)} />
        <LanguageProvider locale={locale}>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
