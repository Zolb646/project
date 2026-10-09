import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CONTENT } from "@/lib/content";
import { PERSON_NAME, PERSON_ALIASES, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n/types";
import { localizedPath } from "@/lib/i18n/paths";
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

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export default function SiteLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  const PERSONAL = CONTENT[locale].personal;

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${jetbrainsMono.variable} ${manrope.variable} ${bricolage.variable}`}
      suppressHydrationWarning>
      <body
        className="min-h-screen bg-cream text-navy antialiased"
        suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PERSON_NAME,
              alternateName: PERSON_ALIASES,
              url: `${SITE_URL}${localizedPath(locale, "/")}`,
              jobTitle: PERSONAL.role,
              worksFor: {
                "@type": "Organization",
                name: PERSONAL.employer,
              },
              description: PERSONAL.summary,
              email: PERSONAL.email,
              address: {
                "@type": "PostalAddress",
                addressCountry: "Mongolia",
              },
              sameAs: [PERSONAL.githubUrl],
            }),
          }}
        />
        <LanguageProvider locale={locale}>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
