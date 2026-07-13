import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CONTENT } from "@/lib/content";
import "./globals.css";

const PERSONAL = CONTENT.en.personal;

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zozo.dev"),
  title: `${PERSONAL.name} | ${PERSONAL.role}`,
  description: PERSONAL.summary,
  openGraph: {
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
      className={`scroll-smooth ${jetbrainsMono.variable}`}
      suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PERSONAL.name,
              jobTitle: PERSONAL.role,
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
