import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.03) 0%, transparent 50%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #fafafa 0%, #a3a3a3 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              S
            </div>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              ShipLoop
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#fafafa",
                textAlign: "center",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              The Indie Hacker
            </span>
            <span
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#fafafa",
                textAlign: "center",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Operating System
            </span>
          </div>

          {/* Subheadline */}
          <span
            style={{
              fontSize: "24px",
              color: "#a3a3a3",
              marginTop: "32px",
              textAlign: "center",
            }}
          >
            Track your Ship Score. Maintain streaks. Build in public.
          </span>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "48px",
              padding: "24px 48px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#fafafa" }}>2,800+</span>
              <span style={{ fontSize: "14px", color: "#737373" }}>Indie Hackers</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#fafafa" }}>$4.2M+</span>
              <span style={{ fontSize: "14px", color: "#737373" }}>MRR Tracked</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#fafafa" }}>127K+</span>
              <span style={{ fontSize: "14px", color: "#737373" }}>Commits</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
