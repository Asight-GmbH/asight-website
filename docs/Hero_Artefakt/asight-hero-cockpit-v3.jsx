import { useState, useEffect } from "react";

const KPICard = ({ title, value, unit, previous, previousUnit, trend, badge, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const trendColor = "#22c55e";
  const trendArrow = trend === "up" ? "↑" : "↓";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: "#94a3b8", letterSpacing: "0.02em" }}>
          {title}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: badge.color || "#22c55e",
              background: badge.bg || "rgba(34,197,94,0.1)",
              border: `1px solid ${badge.border || "rgba(34,197,94,0.15)"}`,
              padding: "2px 9px",
              borderRadius: 20,
              letterSpacing: "0.03em",
            }}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#64748b" }}>{unit}</span>
      </div>

      {previous && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: trendColor }}>{trendArrow}</span>
          <span style={{ fontSize: 11.5, color: "#64748b" }}>
            Vorher: {previous}{previousUnit || unit}
          </span>
        </div>
      )}
    </div>
  );
};

const MiniSparkline = ({ data, color, width = 280, height = 48 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 6) - 3}`)
    .join(" ");

  const areaPoints = points + ` ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} style={{ display: "block", width: "100%" }} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sparkFill)" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function ManagementCockpit() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      background: "#0c0f1a",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 1rem",
      fontFamily: "'Inter', system-ui, sans-serif",
      perspective: "1200px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{
        maxWidth: 820,
        width: "100%",
        transform: mounted
          ? "rotateX(2deg) rotateY(-22deg) scale(1)"
          : "rotateX(4deg) rotateY(-28deg) scale(0.95) translateY(30px)",
        transformStyle: "preserve-3d",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        opacity: mounted ? 1 : 0,
      }}>

        {/* Glass Display Frame */}
        <div style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 22,
          padding: "26px 26px 22px",
          position: "relative",
          overflow: "hidden",
          boxShadow: [
            "0 25px 60px rgba(0,0,0,0.5)",
            "0 10px 30px rgba(0,0,0,0.3)",
            "0 0 1px rgba(255,255,255,0.1)",
            "inset 0 1px 0 rgba(255,255,255,0.07)",
          ].join(", "),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>

          {/* Glass reflection - top edge */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            pointerEvents: "none",
          }} />

          {/* Glass reflection - diagonal sweep */}
          <div style={{
            position: "absolute",
            top: -50,
            left: -50,
            width: "60%",
            height: "120%",
            background: "linear-gradient(125deg, rgba(255,255,255,0.03) 0%, transparent 40%)",
            pointerEvents: "none",
            transform: "skewX(-15deg)",
          }} />

          {/* Ambient glow - top right */}
          <div style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Ambient glow - bottom left */}
          <div style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Header bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            paddingBottom: 13,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.5)",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#e2e8f0", letterSpacing: "0.05em" }}>
                MANAGEMENT COCKPIT
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                Live · KW 16/2026
              </span>
              <div style={{
                fontSize: 10,
                color: "#22c55e",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.15)",
                padding: "3px 10px",
                borderRadius: 20,
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}>
                Audit-ready
              </div>
            </div>
          </div>

          {/* KPI Grid - 4 cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 14,
          }}>
            <KPICard
              title="OEE"
              value="82.4"
              unit="%"
              previous="47.2"
              trend="up"
              delay={500}
            />
            <KPICard
              title="Zykluszeit"
              value="19.3"
              unit="s"
              previous="39.8"
              trend="down"
              badge={{ label: "2.06x", color: "#38bdf8", bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" }}
              delay={650}
            />
            <KPICard
              title="Ausschussrate"
              value="2.1"
              unit="%"
              previous="8.3"
              trend="down"
              delay={800}
            />
            <KPICard
              title="Reporting"
              value="2"
              unit="h/Wo"
              previous="8"
              previousUnit="h/Wo"
              trend="down"
              badge={{ label: "−75%", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.15)" }}
              delay={950}
            />
          </div>

          {/* Trend chart - full width */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "18px 20px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 1.1s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: "#94a3b8" }}>OEE-Entwicklung (12 Wochen)</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  Start: 47%
                </span>
                <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 600 }}>
                  →
                </span>
                <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                  Jetzt: 82%
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  padding: "2px 8px",
                  borderRadius: 20,
                }}>
                  +35 PP
                </span>
              </div>
            </div>
            <MiniSparkline
              data={[47, 49, 48, 52, 55, 59, 63, 68, 72, 76, 80, 82.4]}
              color="#38bdf8"
              width={760}
              height={56}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 10,
              color: "#334155",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span>KW 05</span>
              <span>KW 08</span>
              <span>KW 11</span>
              <span>KW 14</span>
              <span>KW 16</span>
            </div>
          </div>
        </div>

        {/* Floating shadow beneath the glass */}
        <div style={{
          width: "85%",
          height: 20,
          margin: "0 auto",
          marginTop: -8,
          background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)",
          filter: "blur(12px)",
          transform: "translateZ(-10px)",
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 4px rgba(34,197,94,0.3); }
        }
      `}</style>
    </div>
  );
}
