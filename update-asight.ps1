# ASIGHT Website Update: Light Theme + Full Content
# Run from asight-website folder

Write-Host "Updating ASIGHT Website to Light Theme..." -ForegroundColor Cyan

# ===== GLOBAL STYLES (LIGHT THEME) =====
[System.IO.File]::WriteAllText("$PWD\src\styles\global.css", ':root {
  --c-bg: #ffffff;
  --c-surface: #f8fafc;
  --c-surface-elevated: #ffffff;
  --c-border: #e2e8f0;
  --c-border-light: #cbd5e1;
  --c-text: #0f172a;
  --c-text-secondary: #475569;
  --c-text-muted: #94a3b8;
  --c-accent: #0284c7;
  --c-accent-dim: #0369a1;
  --c-accent-light: #e0f2fe;
  --c-accent-glow: rgba(2, 132, 199, 0.08);
  --c-warm: #f59e0b;
  --c-dark: #0f172a;
  --c-hero-bg: #0f172a;
  --c-hero-text: #f1f5f9;
  --f-display: "Inter", system-ui, sans-serif;
  --f-body: "Inter", system-ui, sans-serif;
  --f-mono: "JetBrains Mono", "Fira Code", monospace;
  --s-page: clamp(1.25rem, 4vw, 3rem);
  --s-section: clamp(4rem, 10vw, 7rem);
  --max-w: 1200px;
  --t-fast: 0.15s ease;
  --t-med: 0.3s ease;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); line-height: 1.7; font-size: 16px; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--c-accent); text-decoration: none; transition: color var(--t-fast); }
a:hover { color: var(--c-accent-dim); }
h1, h2, h3, h4 { font-family: var(--f-display); font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: var(--c-text); }
h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); }
.container { width: 100%; max-width: var(--max-w); margin: 0 auto; padding: 0 var(--s-page); }
.section { padding: var(--s-section) 0; }
.section-label { font-family: var(--f-mono); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; color: var(--c-accent); margin-bottom: 1rem; }
.section-title { margin-bottom: 1.5rem; }
.section-subtitle { font-size: 1.125rem; color: var(--c-text-secondary); max-width: 640px; line-height: 1.8; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; font-family: var(--f-body); cursor: pointer; transition: all var(--t-med); border: none; text-decoration: none; }
.btn-primary { background: var(--c-accent); color: #fff; }
.btn-primary:hover { background: var(--c-accent-dim); color: #fff; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(2,132,199,0.3); }
.btn-outline { background: transparent; color: var(--c-text); border: 1.5px solid var(--c-border-light); }
.btn-outline:hover { border-color: var(--c-accent); color: var(--c-accent); }
.btn-white { background: #fff; color: var(--c-dark); }
.btn-white:hover { background: #f1f5f9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.btn-ghost { background: rgba(255,255,255,0.1); color: #fff; border: 1.5px solid rgba(255,255,255,0.25); }
.btn-ghost:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); }
.card { background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 2rem; transition: all var(--t-med); }
.card:hover { border-color: var(--c-accent); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
.tag { display: inline-block; padding: 0.25rem 0.75rem; background: var(--c-accent-light); color: var(--c-accent); border-radius: 6px; font-size: 0.75rem; font-weight: 600; font-family: var(--f-mono); letter-spacing: 0.04em; }
.prose { max-width: 720px; line-height: 1.85; color: var(--c-text-secondary); }
.prose h2 { font-size: 1.5rem; color: var(--c-text); margin-top: 2.5rem; margin-bottom: 1rem; }
.prose p { margin-bottom: 1.25rem; }
.prose strong { color: var(--c-text); font-weight: 600; }
@media (max-width: 768px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }
')

Write-Host "  Light theme CSS done" -ForegroundColor Green

# ===== LAYOUT =====
[System.IO.File]::WriteAllText("$PWD\src\layouts\BaseLayout.astro", '---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = "ASIGHT Consulting",
  description = "Projektmanagement, Prozessoptimierung & digitale Loesungen fuer die Industrie.",
} = Astro.props;
---

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  @import "../styles/global.css";
</style>
')

Write-Host "  Layout done" -ForegroundColor Green

# ===== HEADER (light) =====
[System.IO.File]::WriteAllText("$PWD\src\components\Header.astro", '---
const navItems = [
  { label: "Ihre Vorteile", href: "/#vorteile" },
  { label: "Services", href: "/#services" },
  { label: "Ueber ASIGHT", href: "/#about" },
  { label: "Referenzen", href: "/#referenzen" },
  { label: "Kontakt", href: "/#kontakt" },
];
---

<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-a">A</span><span class="logo-text">SIGHT</span>
      <span class="logo-divider"></span>
      <span class="logo-sub">Consulting</span>
    </a>
    <nav class="nav">
      {navItems.map((item) => (
        <a href={item.href} class="nav-link">{item.label}</a>
      ))}
    </nav>
    <a href="/#kontakt" class="btn btn-primary btn-sm">Termin buchen</a>
  </div>
</header>

<style>
  .header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--c-border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
  .logo { display: flex; align-items: center; gap: 0.15rem; text-decoration: none; }
  .logo-a { font-size: 1.4rem; font-weight: 800; color: var(--c-accent); }
  .logo-text { font-size: 1.3rem; font-weight: 800; letter-spacing: 0.1em; color: var(--c-text); }
  .logo-divider { width: 1px; height: 20px; background: var(--c-border-light); margin: 0 0.6rem; }
  .logo-sub { font-size: 0.85rem; font-weight: 500; color: var(--c-text-muted); letter-spacing: 0.04em; }
  .nav { display: flex; gap: 2rem; }
  .nav-link { font-size: 0.875rem; font-weight: 500; color: var(--c-text-secondary); text-decoration: none; transition: color var(--t-fast); }
  .nav-link:hover { color: var(--c-accent); }
  .btn-sm { padding: 0.55rem 1.25rem; font-size: 0.825rem; }
  @media (max-width: 768px) { .nav { display: none; } }
</style>
')

# ===== HERO (dark section) =====
[System.IO.File]::WriteAllText("$PWD\src\components\Hero.astro", '---
---
<section class="hero">
  <div class="hero-bg">
    <div class="hero-gradient"></div>
    <div class="hero-grid-pattern"></div>
  </div>
  <div class="container hero-content">
    <div class="hero-badge">Gemeinsam zum Projekterfolg</div>
    <h1 class="hero-title">
      Insight Meets<br />
      <span class="hero-accent">Innovation</span>
    </h1>
    <p class="hero-subtitle">
      <strong>ASIGHT</strong> unterstuetzt Unternehmen aus der Industrie dabei,
      Projekte erfolgreich umzusetzen, Prozesse zu optimieren und digitale
      Loesungen schnell und wirksam einzufuehren.
    </p>
    <div class="hero-actions">
      <a href="/#kontakt" class="btn btn-white">Kontaktieren Sie uns <span>&rarr;</span></a>
      <a href="/#services" class="btn btn-ghost">Unsere Services</a>
    </div>
    <div class="hero-proof">
      <div class="proof-item">
        <span class="proof-number">15+</span>
        <span class="proof-label">Jahre Erfahrung</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-number">2</span>
        <span class="proof-label">Kontinente</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-number">IPMA</span>
        <span class="proof-label">Zertifiziert</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-number">2.06x</span>
        <span class="proof-label">Cycle Time Reduction</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding-top: 72px; overflow: hidden; background: var(--c-hero-bg); color: var(--c-hero-text); }
  .hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 70% 50%, rgba(2,132,199,0.12) 0%, transparent 60%); }
  .hero-grid-pattern { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
  .hero-content { position: relative; padding: 6rem 0 4rem; max-width: 720px; }
  .hero-badge { display: inline-block; padding: 0.4rem 1rem; background: rgba(2,132,199,0.15); border: 1px solid rgba(2,132,199,0.25); border-radius: 100px; font-size: 0.8rem; font-weight: 600; color: #38bdf8; margin-bottom: 2rem; letter-spacing: 0.02em; }
  .hero-title { font-size: clamp(3rem, 6vw, 5rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 1.5rem; color: #fff; }
  .hero-accent { background: linear-gradient(135deg, #38bdf8, #0ea5e9, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-subtitle { font-size: 1.15rem; line-height: 1.8; color: #94a3b8; max-width: 540px; margin-bottom: 2.5rem; }
  .hero-subtitle strong { color: #e2e8f0; }
  .hero-actions { display: flex; gap: 1rem; margin-bottom: 4rem; }
  .hero-proof { display: flex; align-items: center; gap: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
  .proof-item { display: flex; flex-direction: column; gap: 0.25rem; }
  .proof-number { font-size: 1.4rem; font-weight: 800; color: #fff; }
  .proof-label { font-size: 0.75rem; color: #64748b; font-weight: 500; }
  .proof-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
  @media (max-width: 768px) { .hero-actions { flex-direction: column; } .hero-proof { flex-wrap: wrap; gap: 1.5rem; } .proof-divider { display: none; } }
</style>
')

# ===== VORTEILE (NEW) =====
[System.IO.File]::WriteAllText("$PWD\src\components\Vorteile.astro", '---
const vorteile = [
  { icon: "globe", title: "Globale Projekt Erfahrung", desc: "Ob Grossprojekte wie den Bau einer Batteriefabrik in den USA, Zukunftsthemen wie Software Defined Vehicle oder globale Prozessharmonisierungen. Wir bringen unsere Erfahrung ein." },
  { icon: "zap", title: "Schnelles Eingreifen", desc: "Seien es Engpaesse in den USA oder Qualitaetsprobleme in Europa, wir greifen ein, wenn Projekte ins Stocken geraten. Wir bringen Ihr Projekt zurueck in die Erfolgsspur." },
  { icon: "shield", title: "Bewaehrte Methoden", desc: "Sowohl im Projektmanagement (IPMA) als auch bei Prozessoptimierungen (Lean, Six Sigma) wenden wir unsere bewaehrten Standards gezielt auf Ihr Unternehmen an." },
  { icon: "bar-chart", title: "Innovative Loesungen", desc: "Mit modernen Tools analysieren wir Ihre Daten, modellieren Prozesse und entwickeln Dashboards, die Transparenz schaffen. Entscheidungen datenbasiert und effektiv." },
];
const iconSvg = {
  globe: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  zap: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  shield: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "bar-chart": `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
};
---

<section id="vorteile" class="section vorteile-section">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Warum ASIGHT?</div>
      <h2 class="section-title">Ihre Vorteile auf einen Blick</h2>
    </div>
    <div class="vorteile-grid">
      {vorteile.map((v) => (
        <div class="vorteil-card">
          <div class="vorteil-icon" set:html={iconSvg[v.icon]} />
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .vorteile-section { background: var(--c-surface); border-bottom: 1px solid var(--c-border); }
  .section-header { text-align: center; margin-bottom: 3.5rem; }
  .section-header .section-subtitle { margin: 0 auto; }
  .vorteile-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .vorteil-card { background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 2rem; transition: all var(--t-med); }
  .vorteil-card:hover { border-color: var(--c-accent); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
  .vorteil-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: var(--c-accent-light); border-radius: 14px; color: var(--c-accent); margin-bottom: 1.25rem; }
  .vorteil-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
  .vorteil-card p { font-size: 0.9rem; color: var(--c-text-secondary); line-height: 1.7; }
  @media (max-width: 1024px) { .vorteile-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) { .vorteile-grid { grid-template-columns: 1fr; } }
</style>
')

# ===== SERVICES =====
[System.IO.File]::WriteAllText("$PWD\src\components\Services.astro", '---
const services = [
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
    title: "Projektmanagement",
    desc: "Wir begleiten Projekte von der Planung bis zur Umsetzung, mit klarem Fokus auf Zeit, Qualitaet und Budget.",
    tags: ["Interim PM (IPMA)", "Task Force Management", "Projektcontrolling", "Agile Coaching (SAFe)"],
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    title: "Prozessoptimierung",
    desc: "Wir analysieren Prozesse datenbasiert und praxisnah und etablieren nachhaltige Prozessverbesserungen.",
    tags: ["Prozess Audits", "BPMN 2.0", "Lean & Six Sigma", "OEE Monitoring"],
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    title: "Digitale Loesungen",
    desc: "Wir konfigurieren Ihre bestehenden Tools und automatisieren Back-End Prozesse die Ihre Arbeit vereinfachen.",
    tags: ["PMO Tools (Jira, M365)", "Dashboards & Berichte", "No/Low-Code", "Systemintegration"],
  },
];
---

<section id="services" class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Unsere Services</div>
      <h2 class="section-title">Unser Angebot an Sie</h2>
    </div>
    <div class="services-grid">
      {services.map((s) => (
        <div class="service-card">
          <div class="service-icon" set:html={s.icon} />
          <h3>{s.title}</h3>
          <p class="service-desc">{s.desc}</p>
          <div class="service-tags">
            {s.tags.map((t) => <span class="service-tag">{t}</span>)}
          </div>
        </div>
      ))}
    </div>
    <div class="services-cta">
      <p>Haben wir Ihr Interesse geweckt? Gerne besprechen wir Ihren individuellen Bedarf.</p>
      <a href="https://tidycal.com/asight/beratungstermin-30min" class="btn btn-primary" target="_blank">Jetzt Termin buchen &rarr;</a>
    </div>
  </div>
</section>

<style>
  .section-header { text-align: center; margin-bottom: 3.5rem; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .service-card { background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 2.5rem 2rem; transition: all var(--t-med); display: flex; flex-direction: column; }
  .service-card:hover { border-color: var(--c-accent); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.06); }
  .service-icon { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: var(--c-accent-light); border-radius: 14px; color: var(--c-accent); margin-bottom: 1.5rem; }
  .service-card h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; }
  .service-desc { font-size: 0.95rem; color: var(--c-text-secondary); line-height: 1.75; margin-bottom: 1.5rem; flex: 1; }
  .service-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; padding-top: 1.25rem; border-top: 1px solid var(--c-border); }
  .service-tag { padding: 0.35rem 0.85rem; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 8px; font-size: 0.8rem; font-weight: 500; color: var(--c-text-secondary); }
  .services-cta { text-align: center; margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid var(--c-border); }
  .services-cta p { font-size: 1.05rem; color: var(--c-text-secondary); margin-bottom: 1.5rem; }
  @media (max-width: 768px) { .services-grid { grid-template-columns: 1fr; } }
</style>
')

# ===== ABOUT =====
[System.IO.File]::WriteAllText("$PWD\src\components\About.astro", '---
---
<section id="about" class="section about-section">
  <div class="container">
    <div class="about-layout">
      <div class="about-content">
        <div class="section-label">Ueber uns</div>
        <h2 class="section-title">Das ist unsere Geschichte</h2>
        <p class="about-text">
          Die Idee zu <strong>ASIGHT</strong> entstand aus einer gemeinsamen Leidenschaft: Beratung mit Naehe zum Kunden und unsere Erfahrung aus der Praxis so einzubringen, dass sie echten Mehrwert bringt.
        </p>
        <p class="about-text">
          Wir &ndash; <strong>Alexander Eyb</strong> und <strong>Florian Bartsch</strong> &ndash; haben uns 2013 als Berater kennengelernt. Unsere Wege waren gepraegt von internationaler Projekterfahrung, operativer Exzellenz und dem staendigen Anspruch, echten Mehrwert zu schaffen.
        </p>
        <p class="about-text">
          2024 war der richtige Zeitpunkt, gemeinsam <strong>ASIGHT</strong> zu gruenden &ndash; eine neue Plattform fuer Consulting, Solutions und Innovation mit Leidenschaft.
        </p>
      </div>
      <div class="about-team">
        <div class="team-member">
          <div class="member-avatar">AE</div>
          <div class="member-info">
            <div class="member-name">Alexander Eyb</div>
            <div class="member-role">Founder &amp; Managing Director</div>
            <div class="member-location">Detroit, Michigan, USA</div>
          </div>
        </div>
        <div class="team-member">
          <div class="member-avatar">FB</div>
          <div class="member-info">
            <div class="member-name">Florian Bartsch</div>
            <div class="member-role">Founder &amp; Managing Director</div>
            <div class="member-location">Stuttgart, Deutschland</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section { background: var(--c-surface); border-top: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); }
  .about-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5rem; align-items: start; }
  .about-text { font-size: 1.05rem; color: var(--c-text-secondary); line-height: 1.85; margin-bottom: 1.25rem; }
  .about-text strong { color: var(--c-text); }
  .about-team { display: flex; flex-direction: column; gap: 1.25rem; }
  .team-member { display: flex; align-items: center; gap: 1.25rem; background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 1.5rem; transition: all var(--t-med); }
  .team-member:hover { border-color: var(--c-accent); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
  .member-avatar { width: 64px; height: 64px; border-radius: 14px; background: linear-gradient(135deg, var(--c-accent), var(--c-accent-dim)); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; flex-shrink: 0; }
  .member-name { font-weight: 700; font-size: 1.05rem; color: var(--c-text); }
  .member-role { font-size: 0.875rem; color: var(--c-accent); font-weight: 600; margin-top: 0.15rem; }
  .member-location { font-size: 0.8rem; color: var(--c-text-muted); margin-top: 0.25rem; }
  @media (max-width: 768px) { .about-layout { grid-template-columns: 1fr; gap: 2.5rem; } }
</style>
')

# ===== TESTIMONIALS =====
[System.IO.File]::WriteAllText("$PWD\src\components\Testimonials.astro", '---
import { getCollection } from "astro:content";
const testimonials = (await getCollection("testimonials")).sort((a, b) => a.data.order - b.data.order);
---

<section id="referenzen" class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Referenzen</div>
      <h2 class="section-title">Was unsere Kunden sagen</h2>
    </div>
    <div class="testimonials-grid">
      {testimonials.map(async (t) => {
        const { Content } = await t.render();
        return (
          <div class="testimonial-card">
            <div class="quote-mark">&ldquo;</div>
            <div class="quote-body"><Content /></div>
            <div class="quote-author">
              <div class="author-avatar">{t.data.name.charAt(0)}</div>
              <div>
                <div class="author-name">{t.data.name}</div>
                <div class="author-position">{t.data.position}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

<style>
  .section-header { text-align: center; margin-bottom: 3.5rem; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
  .testimonial-card { background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 2.5rem; position: relative; transition: all var(--t-med); }
  .testimonial-card:hover { border-color: var(--c-accent); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
  .quote-mark { font-size: 4rem; font-weight: 800; color: var(--c-accent); line-height: 1; opacity: 0.2; position: absolute; top: 1.25rem; right: 2rem; }
  .quote-body { font-size: 1.05rem; line-height: 1.75; color: var(--c-text-secondary); margin-bottom: 2rem; font-style: italic; }
  .quote-body :global(p) { margin: 0; }
  .quote-author { display: flex; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--c-border); }
  .author-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--c-accent-light); color: var(--c-accent); display: flex; align-items: center; justify-content: center; font-weight: 700; }
  .author-name { font-weight: 700; font-size: 0.95rem; color: var(--c-text); }
  .author-position { font-size: 0.825rem; color: var(--c-text-muted); }
  @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr; } }
</style>
')

# ===== RESULTS =====
[System.IO.File]::WriteAllText("$PWD\src\components\Results.astro", '---
---
<section class="section results-section">
  <div class="results-bg"></div>
  <div class="container results-content">
    <div class="section-label" style="color: #38bdf8;">Ergebnisse</div>
    <h2 class="section-title" style="color: #fff;">Messbare Resultate aus echten Projekten</h2>
    <div class="results-grid">
      <div class="result-card">
        <div class="result-number">2.06x</div>
        <div class="result-label">Cycle Time Reduction</div>
        <div class="result-desc">Dokumentierte Verbesserung in der Serienfertigung eines Tier-1-Zulieferers.</div>
      </div>
      <div class="result-card">
        <div class="result-number">Echtzeit</div>
        <div class="result-label">OEE-Dashboard</div>
        <div class="result-desc">Power BI Dashboard mit SPS-Anbindung fuer Live-Produktionsdaten und Ishikawa-Analyse.</div>
      </div>
      <div class="result-card">
        <div class="result-number">PMO</div>
        <div class="result-label">Batteriefabrik USA</div>
        <div class="result-desc">Kompletter PMO-Aufbau und Steuerung fuer ein Multi-Milliarden-Euro BEV Greenfield-Projekt.</div>
      </div>
    </div>
  </div>
</section>

<style>
  .results-section { position: relative; overflow: hidden; background: var(--c-dark); }
  .results-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(2,132,199,0.1) 0%, transparent 60%); }
  .results-content { position: relative; }
  .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .result-card { padding: 2.5rem 2rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; transition: all var(--t-med); }
  .result-card:hover { border-color: rgba(56,189,248,0.3); background: rgba(255,255,255,0.06); transform: translateY(-2px); }
  .result-number { font-size: 2.75rem; font-weight: 800; background: linear-gradient(135deg, #38bdf8, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.75rem; }
  .result-label { font-size: 1.05rem; font-weight: 700; color: #e2e8f0; margin-bottom: 0.75rem; }
  .result-desc { font-size: 0.9rem; color: #64748b; line-height: 1.65; }
  @media (max-width: 768px) { .results-grid { grid-template-columns: 1fr; } }
</style>
')

# ===== CONTACT =====
[System.IO.File]::WriteAllText("$PWD\src\components\Contact.astro", '---
---
<section id="kontakt" class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <div class="section-label">Kontakt</div>
        <h2 class="section-title">Lassen Sie uns sprechen.</h2>
        <p class="contact-desc">Egal ob konkretes Projekt oder erste Orientierung &ndash; wir nehmen uns Zeit fuer Ihr Anliegen.</p>
        <div class="contact-details">
          <div class="contact-item">
            <div class="contact-item-label">E-Mail</div>
            <a href="mailto:info@asightconsulting.com" class="contact-item-value">info@asightconsulting.com</a>
          </div>
          <div class="contact-item">
            <div class="contact-item-label">Telefon</div>
            <a href="tel:+491736754423" class="contact-item-value">+49 173 675 4423</a>
          </div>
          <div class="contact-item">
            <div class="contact-item-label">Standort DE</div>
            <div class="contact-item-value">Stuttgart, Deutschland</div>
          </div>
          <div class="contact-item">
            <div class="contact-item-label">Standort US</div>
            <div class="contact-item-value">Detroit, Michigan, USA</div>
          </div>
        </div>
      </div>
      <div class="contact-cta">
        <div class="cta-card">
          <h3 class="cta-title">Erstgespraech buchen</h3>
          <p class="cta-desc">30 Minuten, kostenlos, unverbindlich. Wir besprechen Ihren Bedarf und zeigen Ihnen, wie wir helfen koennen.</p>
          <a href="https://tidycal.com/asight/beratungstermin-30min" class="btn btn-primary" target="_blank" style="width:100%;justify-content:center;">Termin waehlen &rarr;</a>
          <div class="cta-channels">
            <a href="https://wa.me/491736754423" class="channel-link" target="_blank">WhatsApp</a>
            <a href="mailto:a.eyb@asightconsulting.com" class="channel-link">E-Mail</a>
            <a href="tel:+491736754423" class="channel-link">Anrufen</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .contact-desc { font-size: 1.05rem; color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 2.5rem; max-width: 440px; }
  .contact-details { display: flex; flex-direction: column; gap: 1.5rem; }
  .contact-item-label { font-family: var(--f-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--c-text-muted); margin-bottom: 0.3rem; }
  .contact-item-value { font-size: 1rem; color: var(--c-text); font-weight: 500; }
  a.contact-item-value:hover { color: var(--c-accent); }
  .cta-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 20px; padding: 2.5rem; }
  .cta-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
  .cta-desc { color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 2rem; font-size: 0.95rem; }
  .cta-channels { display: flex; gap: 1rem; margin-top: 1.25rem; justify-content: center; }
  .channel-link { font-size: 0.85rem; font-weight: 600; color: var(--c-text-muted); padding: 0.5rem 1rem; border: 1px solid var(--c-border); border-radius: 8px; transition: all var(--t-fast); }
  .channel-link:hover { color: var(--c-accent); border-color: var(--c-accent); }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; } }
</style>
')

# ===== FOOTER =====
[System.IO.File]::WriteAllText("$PWD\src\components\Footer.astro", '---
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <span class="footer-logo-a">A</span><span class="footer-logo">SIGHT</span>
      <span class="footer-tagline">Consulting</span>
    </div>
    <div class="footer-links">
      <a href="/#vorteile">Vorteile</a>
      <a href="/#services">Services</a>
      <a href="/#about">Ueber uns</a>
      <a href="/#kontakt">Kontakt</a>
    </div>
    <div class="footer-copy">&copy; {year} ASIGHT GmbH &middot; Stuttgart</div>
  </div>
</footer>

<style>
  .footer { padding: 3rem 0; border-top: 1px solid var(--c-border); background: var(--c-surface); }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .footer-logo-a { font-weight: 800; font-size: 1rem; color: var(--c-accent); }
  .footer-logo { font-weight: 800; font-size: 1rem; letter-spacing: 0.06em; color: var(--c-text); }
  .footer-tagline { font-size: 0.8rem; color: var(--c-text-muted); margin-left: 0.4rem; }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a { font-size: 0.85rem; color: var(--c-text-muted); }
  .footer-links a:hover { color: var(--c-accent); }
  .footer-copy { font-size: 0.8rem; color: var(--c-text-muted); }
  @media (max-width: 768px) { .footer-inner { flex-direction: column; gap: 1.5rem; text-align: center; } }
</style>
')

Write-Host "  Components done" -ForegroundColor Green

# ===== INDEX PAGE =====
[System.IO.File]::WriteAllText("$PWD\src\pages\index.astro", '---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import Vorteile from "../components/Vorteile.astro";
import Services from "../components/Services.astro";
import Results from "../components/Results.astro";
import About from "../components/About.astro";
import Testimonials from "../components/Testimonials.astro";
import Contact from "../components/Contact.astro";
import Footer from "../components/Footer.astro";
---

<BaseLayout title="ASIGHT Consulting | Projektmanagement, Prozessoptimierung & Digitale Loesungen">
  <Header />
  <Hero />
  <Vorteile />
  <Services />
  <Results />
  <About />
  <Testimonials />
  <Contact />
  <Footer />
</BaseLayout>
')

Write-Host "  Pages done" -ForegroundColor Green

# Remove old Team component reference if blog pages use it
# Blog pages stay as they are

Write-Host ""
Write-Host "=== Update complete ===" -ForegroundColor Green
Write-Host "Refresh browser at http://localhost:4321" -ForegroundColor Yellow