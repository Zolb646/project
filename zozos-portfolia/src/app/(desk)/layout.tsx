import { JetBrains_Mono, Manrope } from "next/font/google";
import styles from "@/components/release-desk/desk.module.css";

const sans = Manrope({ subsets: ["latin"], variable: "--desk-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--desk-mono", display: "swap" });

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}>
    <body className={styles.body}>{children}</body>
  </html>;
}
