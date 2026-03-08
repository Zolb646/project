import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PERSONAL } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
        suppressHydrationWarning
      >
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
