import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zozo | Software Engineer",
  description:
    "Portfolio of Zozo — a software engineer building digital experiences with clean code and creative thinking.",
  openGraph: {
    title: "Zozo | Software Engineer",
    description:
      "Portfolio of Zozo — a software engineer building digital experiences with clean code and creative thinking.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zozo | Software Engineer",
    description:
      "Portfolio of Zozo — a software engineer building digital experiences with clean code and creative thinking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zozo",
              jobTitle: "Software Engineer",
              url: "https://zozo.dev",
              sameAs: [
                "https://github.com/Zolb646",
                "https://linkedin.com/in/zozo",
                "https://twitter.com/zozo",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cream text-navy`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
