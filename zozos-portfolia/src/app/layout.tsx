import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CONTENT } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const PERSONAL = CONTENT.en.personal;

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${PERSONAL.name} | ${PERSONAL.role}`,
  description: PERSONAL.summary,
  openGraph: {
    url: SITE_URL,
    title: `${PERSONAL.name} | ${PERSONAL.role}`,
    description: PERSONAL.summary,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${jetbrainsMono.variable} ${manrope.variable} ${bricolage.variable}`}
      suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PERSONAL.name,
              url: SITE_URL,
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
      </head>
      <body
        className="min-h-screen bg-cream text-navy antialiased"
        suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
