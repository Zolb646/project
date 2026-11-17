import { Manrope, JetBrains_Mono } from "next/font/google";
import styles from "@/components/motion-studio/studio.module.css";

const sans = Manrope({ subsets: ["latin"], variable: "--studio-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--studio-mono", display: "swap" });

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body className={styles.body}>{children}</body></html>;
}
