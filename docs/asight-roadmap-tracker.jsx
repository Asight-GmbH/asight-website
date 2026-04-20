import { useState, useEffect, useCallback } from "react";

const PHASES = [
  {
    id: "phase1",
    title: "Phase 1: Texte schaerfen",
    timeline: "1-2 Wochen",
    color: "#10b981",
    items: [
      {
        id: "5.1a",
        label: "Hero-Claim ersetzen",
        detail: 'Statt "Insight Meets Innovation" konkreten Claim formulieren',
        effort: "2h",
      },
      {
        id: "5.1b",
        label: "Subline mit klarem ICP schreiben",
        detail: "Industrieunternehmen und Automotive-Zulieferer als Zielgruppe benennen",
        effort: "1h",
      },
      {
        id: "5.1c",
        label: '"Grosse und kleine Unternehmen" ersetzen',
        detail: "Durch spezifische Zielgruppe ersetzen",
        effort: "30min",
      },
      {
        id: "5.2a",
        label: "Impact-Zahlen als eigene Karten",
        detail: "2.06x Zykluszeit, OEE-Dashboard, Batteriefabrik-PMO in Hero-Bereich ziehen",
        effort: "2h",
      },
      {
        id: "5.2b",
        label: '"50+ Projekte" durch echte Impact-Zahlen ersetzen',
        detail: "Konkrete Metriken statt generische Zahlen",
        effort: "1h",
      },
      {
        id: "5.3a",
        label: "Partner-Logos groesser machen",
        detail: "CIT Solutions, RE Automation prominenter platzieren",
        effort: "30min",
      },
      {
        id: "5.3b",
        label: "Client-Logos anfragen",
        detail: "Freigaben bei Mercedes, Daimler Truck, Yanfeng etc. einholen",
        effort: "extern",
      },
    ],
  },
  {
    id: "phase2",
    title: "Phase 2: Struktur erweitern",
    timeline: "2-4 Wochen",
    color: "#3b82f6",
    items: [
      {
        id: "5.4a",
        label: "Case Study: Batteriefabrik USA",
        detail: "Ausgangslage > Vorgehen > Ergebnis (Greenfield PMO)",
        effort: "4h",
      },
      {
        id: "5.4b",
        label: "Case Study: Zykluszeit-Reduktion",
        detail: "Ausgangslage > Vorgehen > Ergebnis (Faktor 2.06)",
        effort: "4h",
      },
      {
        id: "5.4c",
        label: "Case Study: OEE-Dashboard",
        detail: "Ausgangslage > Vorgehen > Ergebnis (Ishikawa-Analyse)",
        effort: "4h",
      },
      {
        id: "5.5a",
        label: "Services-Seite erstellen",
        detail: "Eigene Seite statt One-Pager-Sektion",
        effort: "3h",
      },
      {
        id: "5.5b",
        label: "Case-Studies-Seite erstellen",
        detail: "Uebersicht mit Links zu den einzelnen Case Studies",
        effort: "2h",
      },
      {
        id: "5.5c",
        label: "Ueber-Uns-Seite erstellen",
        detail: "Gruendergeschichte als eigene Seite",
        effort: "2h",
      },
      {
        id: "5.5d",
        label: "Kontakt-Seite erstellen",
        detail: "Formular + TidyCal + Map als eigene Seite",
        effort: "2h",
      },
      {
        id: "5.6a",
        label: "Blog-Infrastruktur aufsetzen",
        detail: "Blog-Seite, Kategorien, Listing",
        effort: "3h",
      },
      {
        id: "5.6b",
        label: "Erster Blogartikel schreiben",
        detail: "Thema aus dem Tagesgeschaeft waehlen",
        effort: "4h",
      },
    ],
  },
  {
    id: "phase3",
    title: "Phase 3: Design & Technik",
    timeline: "4-8 Wochen",
    color: "#8b5cf6",
    items: [
      {
        id: "5.7a",
        label: "Design-Konzept erstellen",
        detail: "Eigenstaendiger Look, weg vom Standard-WP-Theme",
        effort: "8h",
      },
      {
        id: "5.7b",
        label: "Scroll-Animationen einbauen",
        detail: "Service-Sektionen, Karten-Einblendungen",
        effort: "4h",
      },
      {
        id: "5.7c",
        label: "Professionelle Fotos organisieren",
        detail: "Founders in Aktion, Shopfloor, Workshops",
        effort: "extern",
      },
      {
        id: "5.8a",
        label: "Bilder auf WebP umstellen",
        detail: "Alle Bilder konvertieren und einbinden",
        effort: "2h",
      },
      {
        id: "5.8b",
        label: "Caching einrichten",
        detail: "Plugin oder serverseitig",
        effort: "2h",
      },
      {
        id: "5.8c",
        label: "Lighthouse Score pruefen",
        detail: "Ziel: ueber 90",
        effort: "1h",
      },
      {
        id: "5.9a",
        label: "Landing Page /automotive",
        detail: "BEV, SDV, Zulieferer",
        effort: "4h",
      },
      {
        id: "5.9b",
        label: "Landing Page /manufacturing",
        detail: "Prozessoptimierung, OEE",
        effort: "4h",
      },
      {
        id: "5.9c",
        label: "Landing Page /digitalisierung",
        detail: "Dashboards, Automatisierung",
        effort: "4h",
      },
    ],
  },
  {
    id: "phase4",
    title: "Phase 4: Laufend",
    timeline: "Ab sofort parallel",
    color: "#f59e0b",
    items: [
      {
        id: "5.10a",
        label: "LinkedIn-Posting-Rhythmus festlegen",
        detail: "Welche Themen, wie oft, wer postet",
        effort: "1h",
      },
      {
        id: "5.10b",
        label: "Ersten LinkedIn-Post veroeffentlichen",
        detail: "Zu einem aktuellen Projektthema",
        effort: "1h",
      },
      {
        id: "5.10c",
        label: "Content-Recycling-Workflow definieren",
        detail: "LinkedIn-Post wird Blogartikel wird Case Study",
        effort: "1h",
      },
    ],
  },
];

function ProgressRing({ pct, size = 56, stroke = 5, color }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

export default function ASIGHTRoadmapTracker() {
  const [checked, setChecked] = useState({});
  const [expandedPhase, setExpandedPhase] = useState("phase1");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get("asight-roadmap-state");
        if (result && result.value) {
          setChecked(JSON.parse(result.value));
        }
      } catch (e) {
        // Key doesn't exist yet, start fresh
      }
      setLoaded(true);
    }
    load();
  }, []);

  const save = useCallback(
    async (newState) => {
      try {
        await window.storage.set("asight-roadmap-state", JSON.stringify(newState));
      } catch (e) {
        console.error("Storage error:", e);
      }
    },
    []
  );

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    save(next);
  };

  const resetAll = async () => {
    setChecked({});
    try {
      await window.storage.delete("asight-roadmap-state");
    } catch (e) {}
  };

  const totalItems = PHASES.reduce((s, p) => s + p.items.length, 0);
  const totalDone = Object.values(checked).filter(Boolean).length;
  const totalPct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

  if (!loaded)
    return (
      <div style={{ background: "#0c0f1a", color: "#94a3b8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace" }}>
        Lade...
      </div>
    );

  return (
    <div style={{ background: "#0c0f1a", color: "#e2e8f0", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "2rem 1rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <ProgressRing pct={totalPct} size={72} stroke={6} color="#3b82f6" />
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, color: "#fff" }}>ASIGHT Website Roadmap</h1>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              {totalDone}/{totalItems} erledigt &middot; {totalPct}%
            </div>
          </div>
          <button
            onClick={resetAll}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "1px solid #1e293b",
              color: "#475569",
              padding: "0.4rem 0.8rem",
              borderRadius: 6,
              fontSize: "0.75rem",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Reset
          </button>
        </div>

        {/* Phases */}
        {PHASES.map((phase) => {
          const done = phase.items.filter((i) => checked[i.id]).length;
          const pct = Math.round((done / phase.items.length) * 100);
          const isOpen = expandedPhase === phase.id;

          return (
            <div key={phase.id} style={{ marginBottom: "1rem" }}>
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(isOpen ? null : phase.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: isOpen ? "#111827" : "#0f172a",
                  border: `1px solid ${isOpen ? phase.color + "40" : "#1e293b"}`,
                  borderRadius: isOpen ? "12px 12px 0 0" : 12,
                  cursor: "pointer",
                  color: "#e2e8f0",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <ProgressRing pct={pct} size={40} stroke={4} color={phase.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{phase.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                    {phase.timeline} &middot; {done}/{phase.items.length}
                  </div>
                </div>
                <div style={{ fontSize: "0.8rem", color: phase.color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</div>
                <span style={{ color: "#475569", fontSize: "1.2rem", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>&#9662;</span>
              </button>

              {/* Items */}
              {isOpen && (
                <div
                  style={{
                    background: "#111827",
                    border: `1px solid ${phase.color}40`,
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    padding: "0.5rem 0",
                  }}
                >
                  {phase.items.map((item) => {
                    const isDone = checked[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.85rem",
                          padding: "0.75rem 1.25rem",
                          cursor: "pointer",
                          transition: "background 0.15s",
                          borderBottom: "1px solid #1e293b20",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b40")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {/* Checkbox */}
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            border: isDone ? `2px solid ${phase.color}` : "2px solid #334155",
                            background: isDone ? phase.color : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 2,
                            transition: "all 0.2s ease",
                          }}
                        >
                          {isDone && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              color: isDone ? "#475569" : "#e2e8f0",
                              textDecoration: isDone ? "line-through" : "none",
                              transition: "all 0.2s",
                            }}
                          >
                            {item.label}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#475569", marginTop: 2, lineHeight: 1.5 }}>{item.detail}</div>
                        </div>

                        {/* Effort badge */}
                        <div
                          style={{
                            padding: "0.2rem 0.5rem",
                            background: "#1e293b",
                            borderRadius: 5,
                            fontSize: "0.7rem",
                            color: "#64748b",
                            fontFamily: "'JetBrains Mono', monospace",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {item.effort}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.75rem", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
          ASIGHT Website Roadmap Tracker &middot; Stand wird automatisch gespeichert
        </div>
      </div>
    </div>
  );
}
