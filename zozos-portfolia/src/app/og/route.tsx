import { ImageResponse } from "next/og";
import { CONTENT } from "@/lib/content";
import { PERSON_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 80, background: "#ffffff", color: "#20252b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#626c78" }}>
        <span>{new URL(SITE_URL).hostname}</span>
        <span>Ulaanbaatar, Mongolia</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 76, fontWeight: 500, letterSpacing: -4 }}>{PERSON_NAME}</span>
        <span style={{ fontSize: 36, marginTop: 20, color: "#626c78" }}>{CONTENT.en.personal.role}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, paddingTop: 28, borderTop: "1px solid #e4e7ec", color: "#626c78" }}>
        <span style={{ display: "flex" }}>React · Next.js · TypeScript</span>
        <span>Selected projects & portfolio</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
