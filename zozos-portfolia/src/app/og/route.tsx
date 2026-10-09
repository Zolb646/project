import { ImageResponse } from "next/og";
import { CONTENT } from "@/lib/content";
import { PERSON_NAME } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 70, background: "#f6f2e8", color: "#162234", border: "12px solid #162234" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
        <span>zolbayrr.com</span>
        <span>Ulaanbaatar, Mongolia</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 68, fontWeight: 700 }}>{PERSON_NAME}</span>
        <span style={{ fontSize: 48 }}>{CONTENT.en.personal.role}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 28 }}>
        <span style={{ display: "flex", background: "#f4a261", padding: "14px 24px", border: "3px solid #162234" }}>React · Next.js · TypeScript</span>
        <span>Selected projects & portfolio</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
