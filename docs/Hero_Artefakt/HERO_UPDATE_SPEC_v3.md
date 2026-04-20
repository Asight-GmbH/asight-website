# ASIGHT Website – Hero Section Update (v3 FINAL)

## Aufgabe
Hero-Bereich komplett neu aufbauen: Schlanker Text links, schwebendes Management-Cockpit rechts, Impact-Karten in eigene Sektion darunter.

---

## 1. HERO-BEREICH

### Layout
- Split-Layout: Text links (~45%), Cockpit-Visual rechts (~55%)
- Linksbuendig
- Vertikale Zentrierung beider Haelften
- Auf Mobile: Text oben, Cockpit darunter (gestackt)

### Linke Seite: Text

**Headline:**
```
Ihr Kunde will die Zahlen wieder mal bis Freitag?
Sie haben sie am Mittwoch.
```

Styling:
- Zeile 1 in Weiss
- Zeile 2 im Gradient-Blau (bestehende hero-accent Klasse)
- Zeilenumbruch zwischen Frage und Antwort

**Subline:**
```
ASIGHT macht den fertigenden Mittelstand entscheidungs- und auditfaehig.
```

Styling:
- Schriftgroesse 18-20px
- Moeglichst einzeilig
- Falls Umbruch: "entscheidungs- und auditfaehig" zusammenhalten

**CTAs:**
- Primaer: "Jetzt Zeit gewinnen" – filled Button, auffaellige Farbe (Blau/Cyan Gradient)
  - Link: https://tidycal.com/asight/beratungstermin-30min (target _blank)
  - Pfeil-Icon rechts (→)
- Sekundaer: "Unsere Services" – reiner Textlink mit Pfeil, KEIN Button-Rahmen
  - Link: /#services

### Rechte Seite: Management Cockpit Visual

Ein schwebendes, glasartiges Dashboard-Panel mit perspektivischem Tilt.

**3D-Perspektive:**
- Container braucht: perspective: 1200px
- Panel-Transform: rotateX(2deg) rotateY(-22deg)
- Linke Seite kippt in den Raum (weg vom Betrachter), rechte Seite naeher
- Fade-In Animation beim Laden: startet bei rotateY(-28deg) und opacity 0, endet bei rotateY(-22deg) und opacity 1
- Transition: all 1s cubic-bezier(0.16, 1, 0.3, 1)

**Glaseffekt:**
- Background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 22px
- Box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)
- Backdrop-filter: blur(20px)
- Glasreflexion: schmaler heller Streifen am oberen Rand (linear-gradient horizontal, rgba weiss 0.15 in der Mitte, transparent an den Seiten)
- Diagonaler Lichtstreifen: linear-gradient 125deg, rgba(255,255,255,0.03), von oben-links nach Mitte, dann transparent

**Schwebender Schatten unter dem Panel:**
- Eigenes div unter dem Panel
- Breite 85%, zentriert
- Radial-gradient ellipse mit rgba(56,189,248,0.08), blur(12px)
- Erzeugt den Eindruck dass das Panel ueber dem Hintergrund schwebt

**Panel-Inhalt:**

Header-Leiste:
- Links: Gruener Dot (8px, pulsierend, box-shadow glow) + "MANAGEMENT COCKPIT" (12.5px, font-weight 600, letter-spacing 0.05em)
- Rechts: "Live · KW 16/2026" (11px, mono-font) + "Audit-ready" Badge (gruen)
- Unterstrich: 1px solid rgba(255,255,255,0.06)

4 KPI-Kacheln (Grid, 4 Spalten):

| Kachel | Titel | Wert | Einheit | Vorher | Badge |
|--------|-------|------|---------|--------|-------|
| 1 | OEE | 82.4 | % | 47.2% | – |
| 2 | Zykluszeit | 19.3 | s | 39.8s | 2.06x (blau) |
| 3 | Ausschussrate | 2.1 | % | 8.3% | – |
| 4 | Reporting | 2 | h/Wo | 8h/Wo | -75% (gruen) |

Jede Kachel:
- Background: rgba(255,255,255,0.04)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 14px
- Titel oben (12.5px, #94a3b8), Wert gross (36px, font-weight 700, #f1f5f9), Vorher-Zeile unten (11.5px, #64748b) mit gruenem Trend-Pfeil
- Gestaffelte Einblendung: Kachel 1 nach 500ms, Kachel 2 nach 650ms, Kachel 3 nach 800ms, Kachel 4 nach 950ms
- Animation: opacity 0 + translateY(12px) -> opacity 1 + translateY(0), 0.6s ease

Trend-Chart (volle Breite, unter den Kacheln):
- Titel: "OEE-Entwicklung (12 Wochen)"
- Rechts: "Start: 47%" -> "Jetzt: 82%" + "+35 PP" Badge
- SVG Sparkline mit Datenpunkten: [47, 49, 48, 52, 55, 59, 63, 68, 72, 76, 80, 82.4]
- Linienfarbe: #38bdf8
- Darunter gefuellter Bereich mit Gradient (15% opacity oben, 0% unten)
- X-Achse: KW 05, KW 08, KW 11, KW 14, KW 16
- Einblendung nach 1100ms

**Mobile-Verhalten Cockpit:**
- Kein Tilt auf Mobile (transform: none)
- KPI-Grid auf 2x2
- Sparkline skaliert mit viewBox

### Was aus dem Hero RAUS soll
- hero-badge ("Gemeinsam zum Projekterfolg")
- hero-proof Leiste (15+ Jahre, 2 Kontinente, IPMA, 2.06x)
- Alter Claim und Subtext komplett

---

## 2. NEUE SEKTION: Impact-Ueberleitung

### Position
Direkt unter Hero, vor der Vorteile/Services-Sektion.

### Hintergrund
Visuell abgesetzt – leicht hellerer Hintergrund (#111827) oder subtiler Gradient-Uebergang vom Hero-Dunkel.

### Inhalt: 4 Karten nebeneinander

| Karte | Titel | Text |
|-------|-------|------|
| 1 | Belastbare Zahlen | Echtzeit-Dashboards statt Excel-Listen |
| 2 | Saubere Prozesse | Auditfaehig bevor es jemand verlangt |
| 3 | Kein Handover | Ein Team von Analyse bis Go-Live |
| 4 | 8-12 Wochen | Time-to-Value, nicht Time-to-Powerpoint |

### Styling
- 4-Spalten-Grid Desktop, 2x2 Tablet, Stack Mobile
- Bestehender Karten-Style (Cyan Top-Border)
- Karten-Texte max 2 Zeilen

### Neue Komponente
Datei: src/components/ImpactStrip.astro
Einbindung in src/pages/index.astro nach Hero, vor naechster Sektion.

---

## 3. REFERENZ-CODE

Das folgende JSX zeigt das Cockpit als React-Komponente. Fuer die Astro-Implementierung:
- Animationen ueber CSS @keyframes und animation-delay statt React useState
- Klassen statt Inline-Styles
- Kein JavaScript noetig ausser fuer den gruenen Dot-Pulse (reines CSS)

Referenz-Datei: asight-hero-cockpit-v3.jsx (im selben Verzeichnis wie diese Spec)

---

## Nicht aendern
- Header-Komponente
- Alle anderen Sektionen
- Globale CSS-Variablen
- Layout-Struktur
- Decap CMS Integration
