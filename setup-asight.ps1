# ASIGHT Website Setup Script
# Run from empty asight-website folder

Write-Host "Setting up ASIGHT Website..." -ForegroundColor Cyan

# package.json
@'
{
  "name": "asight-website",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "cms": "npx decap-server",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.10",
    "@astrojs/mdx": "^4.2.6"
  }
}
'@ | Set-Content -Path "package.json" -Encoding UTF8

# astro.config.mjs
@'
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://asightconsulting.com',
});
'@ | Set-Content -Path "astro.config.mjs" -Encoding UTF8

# tsconfig.json
@'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
'@ | Set-Content -Path "tsconfig.json" -Encoding UTF8

# .gitignore
@'
node_modules/
dist/
.astro/
.env
'@ | Set-Content -Path ".gitignore" -Encoding UTF8

# Create directories
$dirs = @(
  "src/components",
  "src/content/services",
  "src/content/blog",
  "src/content/testimonials",
  "src/content/team",
  "src/layouts",
  "src/pages/blog",
  "src/styles",
  "public/admin",
  "public/images/team"
)
foreach ($d in $dirs) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
}
Write-Host "  Directories created" -ForegroundColor Green

# ===== CONTENT =====

# src/content.config.ts
@'
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
    image: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    position: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string(),
    linkedin: z.string().optional(),
    image: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { services, blog, testimonials, team };
'@ | Set-Content -Path "src/content.config.ts" -Encoding UTF8

# Services
@'
---
title: "Project Management"
icon: "clipboard"
order: 1
highlights:
  - "PMO-Aufbau & Steuerung"
  - "SAFe-Integration"
  - "Taskforce-Management"
  - "Battery Factory Planning"
---

Effizientes Projektmanagement fuer komplexe Vorhaben in der Automobilindustrie. Von der Planung bis zur Umsetzung begleiten wir Ihr Projekt mit bewaehrten Methoden und agilen Ansaetzen.

Wir uebernehmen PMO-Verantwortung in Grossprojekten, steuern cross-funktionale Teams und schaffen Transparenz durch klare Strukturen und KPI-basiertes Reporting.
'@ | Set-Content -Path "src/content/services/project-management.md" -Encoding UTF8

@'
---
title: "Process Optimization"
icon: "settings"
order: 2
highlights:
  - "Cycle Time Reduction (Faktor 2.06)"
  - "OEE-Dashboards"
  - "Lean Manufacturing"
  - "Wertstromanalyse"
---

Analyse und Optimierung Ihrer Produktionsprozesse. Wir identifizieren Engpaesse, implementieren Lean-Methoden und steigern Ihre OEE messbar.

Unsere Ergebnisse sprechen fuer sich: In einem aktuellen Projekt konnten wir die Cycle Time um den Faktor 2.06 reduzieren.
'@ | Set-Content -Path "src/content/services/process-optimization.md" -Encoding UTF8

@'
---
title: "Digital Solutions"
icon: "monitor"
order: 3
highlights:
  - "Power BI Dashboards"
  - "SDV-Dokumentation"
  - "Digitalisierungsstrategie"
  - "KPI-Systeme"
---

Massgeschneiderte digitale Loesungen fuer Ihre Geschaeftsprozesse. Von KPI-Dashboards ueber Dokumentenmanagementsysteme bis hin zu vollintegrierten Digitalisierungsstrategien.
'@ | Set-Content -Path "src/content/services/digital-solutions.md" -Encoding UTF8

# Blog
@'
---
title: "Warum OEE-Dashboards Ihre Produktion veraendern"
date: 2026-02-15
author: "Alexander"
excerpt: "Erfahren Sie, wie ein echtzeitfaehiges OEE-Dashboard die Produktivitaet in der Fertigung messbar steigern kann."
tags: ["Manufacturing", "OEE", "Digitalisierung"]
published: true
---

Die Overall Equipment Effectiveness (OEE) ist die wichtigste Kennzahl in der modernen Fertigung.

## Das Problem: Blindflug in der Produktion

Viele Fertigungsbetriebe kennen ihre tatsaechliche OEE nicht. Sie schaetzen, mitteln und hoffen.

## Die Loesung: Echtzeit-Transparenz

Ein modernes OEE-Dashboard erfasst Verfuegbarkeit, Leistung und Qualitaet in Echtzeit.
'@ | Set-Content -Path "src/content/blog/oee-dashboards.md" -Encoding UTF8

@'
---
title: "Battery Factory Planning: Lessons Learned"
date: 2026-01-20
author: "Florian"
excerpt: "Drei Jahre Erfahrung im PMO-Aufbau fuer Batteriefabriken."
tags: ["BEV", "Automotive", "Project Management"]
published: true
---

Der Aufbau einer Batteriefabrik ist eines der komplexesten Projekte der modernen Industrie.

## 1. Struktur vor Agilitaet

Bevor agile Methoden greifen koennen, braucht ein Projekt dieser Groesse ein solides Fundament.

## 2. Kulturelle Integration

Internationale Teams bringen unterschiedliche Arbeitsweisen mit. Wer das ignoriert, verliert Monate.
'@ | Set-Content -Path "src/content/blog/battery-factory-planning.md" -Encoding UTF8

# Testimonials
@'
---
name: "Marcus Weber"
position: "Head of Production, Weber Group"
order: 1
---

ASIGHT hat unsere Produktionsprozesse grundlegend transformiert. Die Cycle Time Reduction um Faktor 2.06 hat unsere Erwartungen uebertroffen.
'@ | Set-Content -Path "src/content/testimonials/marcus-weber.md" -Encoding UTF8

@'
---
name: "Sarah Chen"
position: "VP Operations, Yanfeng"
order: 2
---

Das OEE-Dashboard von ASIGHT gibt uns erstmals echte Transparenz ueber unsere Fertigungslinien.
'@ | Set-Content -Path "src/content/testimonials/sarah-chen.md" -Encoding UTF8

# Team
@'
---
name: "Alexander"
role: "Co-Founder & Managing Director"
location: "Detroit, Michigan"
linkedin: "https://linkedin.com/in/alexander"
order: 1
---

Alexander bringt umfangreiche Erfahrung in der Automobilindustrie mit. Sein Fokus liegt auf Projektmanagement und strategischer Beratung.
'@ | Set-Content -Path "src/content/team/alexander.md" -Encoding UTF8

@'
---
name: "Florian"
role: "Co-Founder & Head of Digital"
location: "Stuttgart, Deutschland"
linkedin: "https://linkedin.com/in/florian"
order: 2
---

Florian ist Experte fuer Digitalisierung und Prozessoptimierung. Er entwickelt massgeschneiderte digitale Loesungen und KPI-Systeme.
'@ | Set-Content -Path "src/content/team/florian.md" -Encoding UTF8

Write-Host "  Content files created" -ForegroundColor Green

# ===== STYLES =====

@'
:root {
  --c-bg: #0a0f1a;
  --c-surface: #111827;
  --c-surface-elevated: #1a2234;
  --c-border: #1e293b;
  --c-border-light: #2a3548;
  --c-text: #f1f5f9;
  --c-text-secondary: #94a3b8;
  --c-text-muted: #64748b;
  --c-accent: #22d3ee;
  --c-accent-dim: #0891b2;
  --c-accent-glow: rgba(34, 211, 238, 0.12);
  --c-warm: #f59e0b;
  --f-display: 'Inter', system-ui, sans-serif;
  --f-body: 'Inter', system-ui, sans-serif;
  --f-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --s-page: clamp(1.25rem, 4vw, 3rem);
  --s-section: clamp(4rem, 10vw, 8rem);
  --max-w: 1200px;
  --t-fast: 0.15s ease;
  --t-med: 0.3s ease;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); line-height: 1.7; font-size: 16px; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--c-accent); text-decoration: none; transition: color var(--t-fast); }
a:hover { color: var(--c-text); }
h1, h2, h3, h4 { font-family: var(--f-display); font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); }
.container { width: 100%; max-width: var(--max-w); margin: 0 auto; padding: 0 var(--s-page); }
.section { padding: var(--s-section) 0; }
.section-label { font-family: var(--f-mono); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; color: var(--c-accent); margin-bottom: 1rem; }
.section-title { margin-bottom: 1.5rem; }
.section-subtitle { font-size: 1.125rem; color: var(--c-text-secondary); max-width: 640px; line-height: 1.8; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; font-family: var(--f-body); cursor: pointer; transition: all var(--t-fast); border: none; text-decoration: none; }
.btn-primary { background: var(--c-accent); color: var(--c-bg); }
.btn-primary:hover { background: #06b6d4; color: var(--c-bg); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(34,211,238,0.25); }
.btn-outline { background: transparent; color: var(--c-text); border: 1.5px solid var(--c-border-light); }
.btn-outline:hover { border-color: var(--c-accent); color: var(--c-accent); }
.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 12px; padding: 2rem; transition: all var(--t-med); }
.card:hover { border-color: var(--c-border-light); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
.tag { display: inline-block; padding: 0.25rem 0.75rem; background: var(--c-accent-glow); color: var(--c-accent); border-radius: 6px; font-size: 0.75rem; font-weight: 600; font-family: var(--f-mono); letter-spacing: 0.04em; }
.prose { max-width: 720px; line-height: 1.85; color: var(--c-text-secondary); }
.prose h2 { font-size: 1.5rem; color: var(--c-text); margin-top: 2.5rem; margin-bottom: 1rem; }
.prose p { margin-bottom: 1.25rem; }
.prose strong { color: var(--c-text); font-weight: 600; }
@media (max-width: 768px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }
'@ | Set-Content -Path "src/styles/global.css" -Encoding UTF8

Write-Host "  Styles created" -ForegroundColor Green

# ===== LAYOUT =====

@'
---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'ASIGHT Consulting',
  description = 'Automotive Consulting & Digital Solutions',
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
  @import '../styles/global.css';
</style>
'@ | Set-Content -Path "src/layouts/BaseLayout.astro" -Encoding UTF8

Write-Host "  Layout created" -ForegroundColor Green

# ===== COMPONENTS =====

# Header
@'
---
const navItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Ergebnisse', href: '/#ergebnisse' },
  { label: 'Insights', href: '/blog' },
  { label: 'Team', href: '/#team' },
  { label: 'Kontakt', href: '/#kontakt' },
];
---

<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-text">ASIGHT</span>
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
  .header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(10,15,26,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--c-border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
  .logo { display: flex; align-items: baseline; gap: 0.4rem; text-decoration: none; }
  .logo-text { font-size: 1.25rem; font-weight: 800; letter-spacing: 0.08em; color: var(--c-text); }
  .logo-sub { font-size: 0.8rem; font-weight: 500; color: var(--c-text-muted); }
  .nav { display: flex; gap: 2rem; }
  .nav-link { font-size: 0.875rem; font-weight: 500; color: var(--c-text-secondary); text-decoration: none; transition: color var(--t-fast); }
  .nav-link:hover { color: var(--c-text); }
  .btn-sm { padding: 0.55rem 1.25rem; font-size: 0.825rem; }
  @media (max-width: 768px) { .nav { display: none; } }
</style>
'@ | Set-Content -Path "src/components/Header.astro" -Encoding UTF8

# Hero
@'
---
---
<section class="hero">
  <div class="hero-bg"></div>
  <div class="container hero-content">
    <div class="hero-label">Automotive · Manufacturing · Digital</div>
    <h1 class="hero-title">
      Wenn Ihr Projekt steht,<br />
      <span class="hero-accent">bringen wir es zurueck auf Kurs.</span>
    </h1>
    <p class="hero-subtitle">
      ASIGHT Consulting: Projektmanagement, Prozessoptimierung und digitale Loesungen
      fuer die Automobil- und Fertigungsindustrie. Detroit &amp; Stuttgart.
    </p>
    <div class="hero-actions">
      <a href="/#kontakt" class="btn btn-primary">Erstgespraech vereinbaren <span>&rarr;</span></a>
      <a href="/#ergebnisse" class="btn btn-outline">Ergebnisse ansehen</a>
    </div>
    <div class="hero-proof">
      <div class="proof-item">
        <span class="proof-number">15+</span>
        <span class="proof-label">Jahre Erfahrung</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-number">2.06x</span>
        <span class="proof-label">Cycle Time Reduction</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-number">2</span>
        <span class="proof-label">Kontinente</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding-top: 72px; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 60%); pointer-events: none; }
  .hero-content { position: relative; padding: 6rem 0 4rem; }
  .hero-label { font-family: var(--f-mono); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: var(--c-accent); margin-bottom: 1.5rem; }
  .hero-title { font-size: clamp(2.75rem, 5.5vw, 4.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.5rem; max-width: 800px; }
  .hero-accent { color: var(--c-accent); }
  .hero-subtitle { font-size: 1.15rem; line-height: 1.8; color: var(--c-text-secondary); max-width: 580px; margin-bottom: 2.5rem; }
  .hero-actions { display: flex; gap: 1rem; margin-bottom: 4rem; }
  .hero-proof { display: flex; align-items: center; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--c-border); max-width: 540px; }
  .proof-item { display: flex; flex-direction: column; gap: 0.25rem; }
  .proof-number { font-size: 1.5rem; font-weight: 800; color: var(--c-text); }
  .proof-label { font-size: 0.8rem; color: var(--c-text-muted); }
  .proof-divider { width: 1px; height: 40px; background: var(--c-border); }
  @media (max-width: 768px) { .hero-actions { flex-direction: column; } .hero-proof { flex-direction: column; align-items: flex-start; gap: 1rem; } .proof-divider { width: 40px; height: 1px; } }
</style>
'@ | Set-Content -Path "src/components/Hero.astro" -Encoding UTF8

# Services
@'
---
import { getCollection } from 'astro:content';
const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
const icons = {
  clipboard: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  monitor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
};
---

<section id="services" class="section">
  <div class="container">
    <div class="section-label">Was wir tun</div>
    <h2 class="section-title">Services</h2>
    <p class="section-subtitle">Drei Kompetenzfelder, ein Ziel: Ihre Projekte erfolgreich machen.</p>
    <div class="services-grid">
      {services.map(async (service) => {
        const { Content } = await service.render();
        return (
          <div class="service-card card">
            <div class="service-icon" set:html={icons[service.data.icon] || ''} />
            <h3>{service.data.title}</h3>
            <div class="service-body"><Content /></div>
            <div class="service-highlights">
              {service.data.highlights.map((h) => <span class="tag">{h}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

<style>
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .service-card { display: flex; flex-direction: column; gap: 1.25rem; }
  .service-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--c-accent-glow); border-radius: 10px; color: var(--c-accent); }
  .service-body { color: var(--c-text-secondary); font-size: 0.95rem; line-height: 1.75; flex: 1; }
  .service-body :global(p) { margin-bottom: 0.75rem; }
  .service-highlights { display: flex; flex-wrap: wrap; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--c-border); }
</style>
'@ | Set-Content -Path "src/components/Services.astro" -Encoding UTF8

# Results
@'
---
---
<section id="ergebnisse" class="section results-section">
  <div class="container">
    <div class="section-label">Ergebnisse</div>
    <h2 class="section-title">Messbare Resultate, nicht Powerpoint-Folien.</h2>
    <div class="results-grid">
      <div class="result-card">
        <div class="result-number">2.06x</div>
        <div class="result-label">Cycle Time Reduction</div>
        <div class="result-desc">Dokumentierte Verbesserung in der Serienfertigung eines Tier-1-Zulieferers.</div>
      </div>
      <div class="result-card">
        <div class="result-number">Echtzeit</div>
        <div class="result-label">OEE-Dashboard</div>
        <div class="result-desc">Power BI-basiertes Dashboard mit direkter SPS-Anbindung fuer Live-Produktionsdaten.</div>
      </div>
      <div class="result-card">
        <div class="result-number">PMO</div>
        <div class="result-label">Batteriefabrik</div>
        <div class="result-desc">PMO-Aufbau und Steuerung fuer ein Multi-Milliarden-Euro BEV-Projekt.</div>
      </div>
    </div>
  </div>
</section>

<style>
  .results-section { background: var(--c-surface); border-top: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); }
  .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .result-card { padding: 2.5rem 2rem; background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 12px; }
  .result-card:hover { border-color: var(--c-accent-dim); box-shadow: 0 0 40px rgba(34,211,238,0.06); }
  .result-number { font-size: 2.5rem; font-weight: 800; color: var(--c-accent); letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.75rem; }
  .result-label { font-size: 1rem; font-weight: 700; color: var(--c-text); margin-bottom: 0.75rem; }
  .result-desc { font-size: 0.9rem; color: var(--c-text-muted); line-height: 1.6; }
</style>
'@ | Set-Content -Path "src/components/Results.astro" -Encoding UTF8

# Testimonials
@'
---
import { getCollection } from 'astro:content';
const testimonials = (await getCollection('testimonials')).sort((a, b) => a.data.order - b.data.order);
---

<section class="section">
  <div class="container">
    <div class="section-label">Kundenstimmen</div>
    <h2 class="section-title">Was unsere Kunden sagen</h2>
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
  .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .testimonial-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 12px; padding: 2.5rem; position: relative; }
  .quote-mark { font-size: 4rem; font-weight: 800; color: var(--c-accent); line-height: 1; opacity: 0.3; position: absolute; top: 1.25rem; right: 2rem; }
  .quote-body { font-size: 1.05rem; line-height: 1.75; color: var(--c-text-secondary); margin-bottom: 2rem; font-style: italic; }
  .quote-body :global(p) { margin: 0; }
  .quote-author { display: flex; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--c-border); }
  .author-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--c-accent-glow); color: var(--c-accent); display: flex; align-items: center; justify-content: center; font-weight: 700; }
  .author-name { font-weight: 700; font-size: 0.95rem; color: var(--c-text); }
  .author-position { font-size: 0.825rem; color: var(--c-text-muted); }
  @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr; } }
</style>
'@ | Set-Content -Path "src/components/Testimonials.astro" -Encoding UTF8

# Team
@'
---
import { getCollection } from 'astro:content';
const team = (await getCollection('team')).sort((a, b) => a.data.order - b.data.order);
---

<section id="team" class="section">
  <div class="container">
    <div class="section-label">Team</div>
    <h2 class="section-title">Die Koepfe hinter ASIGHT</h2>
    <p class="section-subtitle">Zwei Standorte, ein Team. Amerikanische Innovationskraft trifft deutsche Ingenieurskunst.</p>
    <div class="team-grid">
      {team.map(async (member) => {
        const { Content } = await member.render();
        return (
          <div class="team-card card">
            <div class="member-photo"><span class="photo-placeholder">{member.data.name.charAt(0)}</span></div>
            <div class="member-info">
              <h3 class="member-name">{member.data.name}</h3>
              <div class="member-role">{member.data.role}</div>
              <div class="member-location">{member.data.location}</div>
              <div class="member-bio"><Content /></div>
              {member.data.linkedin && <a href={member.data.linkedin} class="member-linkedin" target="_blank">LinkedIn &rarr;</a>}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

<style>
  .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .team-card { display: flex; gap: 2rem; align-items: flex-start; }
  .member-photo { flex-shrink: 0; width: 96px; height: 96px; border-radius: 12px; background: var(--c-surface-elevated); border: 1px solid var(--c-border-light); display: flex; align-items: center; justify-content: center; }
  .photo-placeholder { font-size: 2rem; font-weight: 800; color: var(--c-text-muted); }
  .member-name { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.25rem; }
  .member-role { font-size: 0.9rem; color: var(--c-accent); font-weight: 600; margin-bottom: 0.5rem; }
  .member-location { font-size: 0.825rem; color: var(--c-text-muted); margin-bottom: 1rem; }
  .member-bio { font-size: 0.9rem; color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 1rem; }
  .member-bio :global(p) { margin: 0; }
  .member-linkedin { font-size: 0.85rem; font-weight: 600; color: var(--c-accent); }
  @media (max-width: 768px) { .team-grid { grid-template-columns: 1fr; } .team-card { flex-direction: column; } }
</style>
'@ | Set-Content -Path "src/components/Team.astro" -Encoding UTF8

# Contact
@'
---
---
<section id="kontakt" class="section contact-section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <div class="section-label">Kontakt</div>
        <h2 class="section-title">Lassen Sie uns sprechen.</h2>
        <p class="contact-desc">Egal ob konkretes Projekt oder erste Orientierung &ndash; wir nehmen uns Zeit.</p>
        <div class="contact-details">
          <div class="contact-item">
            <div class="contact-item-label">E-Mail</div>
            <a href="mailto:info@asightconsulting.com" class="contact-item-value">info@asightconsulting.com</a>
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
          <p class="cta-desc">30 Minuten, kostenlos, unverbindlich.</p>
          <a href="https://tidycal.com/asight" class="btn btn-primary" target="_blank">Termin waehlen &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-section { background: var(--c-surface); border-top: 1px solid var(--c-border); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .contact-desc { font-size: 1.05rem; color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 2.5rem; max-width: 440px; }
  .contact-details { display: flex; flex-direction: column; gap: 1.5rem; }
  .contact-item-label { font-family: var(--f-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--c-text-muted); margin-bottom: 0.3rem; }
  .contact-item-value { font-size: 1rem; color: var(--c-text); font-weight: 500; }
  .cta-card { background: var(--c-surface-elevated); border: 1px solid var(--c-border); border-radius: 16px; padding: 2.5rem; }
  .cta-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
  .cta-desc { color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 2rem; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; } }
</style>
'@ | Set-Content -Path "src/components/Contact.astro" -Encoding UTF8

# Footer
@'
---
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <span class="footer-logo">ASIGHT</span>
      <span class="footer-tagline">Consulting</span>
    </div>
    <div class="footer-links">
      <a href="/#services">Services</a>
      <a href="/blog">Insights</a>
      <a href="/#team">Team</a>
      <a href="/#kontakt">Kontakt</a>
    </div>
    <div class="footer-copy">&copy; {year} ASIGHT Consulting</div>
  </div>
</footer>

<style>
  .footer { padding: 3rem 0; border-top: 1px solid var(--c-border); }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .footer-logo { font-weight: 800; font-size: 1rem; letter-spacing: 0.06em; color: var(--c-text); }
  .footer-tagline { font-size: 0.8rem; color: var(--c-text-muted); margin-left: 0.4rem; }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a { font-size: 0.85rem; color: var(--c-text-muted); }
  .footer-links a:hover { color: var(--c-text); }
  .footer-copy { font-size: 0.8rem; color: var(--c-text-muted); }
  @media (max-width: 768px) { .footer-inner { flex-direction: column; gap: 1.5rem; text-align: center; } }
</style>
'@ | Set-Content -Path "src/components/Footer.astro" -Encoding UTF8

Write-Host "  Components created" -ForegroundColor Green

# ===== PAGES =====

# Index
@'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Results from '../components/Results.astro';
import Testimonials from '../components/Testimonials.astro';
import Team from '../components/Team.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="ASIGHT Consulting" description="Projektmanagement, Prozessoptimierung und digitale Loesungen.">
  <Header />
  <Hero />
  <Services />
  <Results />
  <Testimonials />
  <Team />
  <Contact />
  <Footer />
</BaseLayout>
'@ | Set-Content -Path "src/pages/index.astro" -Encoding UTF8

# Blog index
@'
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter((p) => p.data.published)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="Insights" description="Artikel und Einblicke.">
  <Header />
  <main class="blog-page">
    <div class="container">
      <div class="blog-header">
        <div class="section-label">Insights</div>
        <h1>Blog</h1>
        <p class="section-subtitle">Praxiswissen aus unseren Projekten.</p>
      </div>
      <div class="posts-list">
        {posts.map((post) => (
          <a href={`/blog/${post.id.replace(/\.md$/, '')}`} class="post-card card">
            <div class="post-meta">
              <time>{post.data.date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>von {post.data.author}</span>
            </div>
            <h2 class="post-title">{post.data.title}</h2>
            <p class="post-excerpt">{post.data.excerpt}</p>
            <div class="post-tags">
              {post.data.tags.map((tag) => <span class="tag">{tag}</span>)}
            </div>
          </a>
        ))}
      </div>
    </div>
  </main>
  <Footer />
</BaseLayout>

<style>
  .blog-page { padding-top: calc(72px + 4rem); padding-bottom: 4rem; }
  .blog-header { margin-bottom: 3rem; }
  .blog-header h1 { margin-bottom: 1rem; }
  .posts-list { display: flex; flex-direction: column; gap: 1.25rem; max-width: 780px; }
  .post-card { text-decoration: none; color: inherit; display: block; }
  .post-meta { display: flex; gap: 1rem; font-size: 0.825rem; color: var(--c-text-muted); margin-bottom: 0.75rem; }
  .post-title { font-size: 1.35rem; font-weight: 700; color: var(--c-text); margin-bottom: 0.5rem; transition: color var(--t-fast); }
  .post-card:hover .post-title { color: var(--c-accent); }
  .post-excerpt { font-size: 0.95rem; color: var(--c-text-secondary); line-height: 1.7; margin-bottom: 1rem; }
  .post-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
</style>
'@ | Set-Content -Path "src/pages/blog/index.astro" -Encoding UTF8

# Blog post detail
@'
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.excerpt}>
  <Header />
  <main class="article-page">
    <div class="container">
      <a href="/blog" class="back-link">&larr; Zurueck zu Insights</a>
      <article class="article">
        <header class="article-header">
          <div class="post-meta">
            <time>{post.data.date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>von {post.data.author}</span>
          </div>
          <h1>{post.data.title}</h1>
          <p class="article-excerpt">{post.data.excerpt}</p>
          <div class="post-tags">
            {post.data.tags.map((tag) => <span class="tag">{tag}</span>)}
          </div>
        </header>
        <div class="prose"><Content /></div>
      </article>
    </div>
  </main>
  <Footer />
</BaseLayout>

<style>
  .article-page { padding-top: calc(72px + 3rem); padding-bottom: 4rem; }
  .back-link { display: inline-block; font-size: 0.875rem; color: var(--c-text-muted); margin-bottom: 2rem; }
  .back-link:hover { color: var(--c-accent); }
  .article { max-width: 780px; }
  .article-header { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--c-border); }
  .post-meta { display: flex; gap: 1rem; font-size: 0.85rem; color: var(--c-text-muted); margin-bottom: 1.25rem; }
  .article-header h1 { font-size: clamp(2rem, 4vw, 2.75rem); margin-bottom: 1rem; }
  .article-excerpt { font-size: 1.15rem; color: var(--c-text-secondary); line-height: 1.75; margin-bottom: 1.5rem; }
  .post-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
</style>
'@ | Set-Content -Path "src/pages/blog/[slug].astro" -Encoding UTF8

Write-Host "  Pages created" -ForegroundColor Green

# ===== DECAP CMS =====

@'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
'@ | Set-Content -Path "public/admin/index.html" -Encoding UTF8

@'
local_backend: true

backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"
locale: "de"

collections:
  - name: "services"
    label: "Services"
    folder: "src/content/services"
    create: true
    fields:
      - { label: "Titel", name: "title", widget: "string" }
      - { label: "Icon", name: "icon", widget: "select", options: ["clipboard", "settings", "monitor"] }
      - { label: "Reihenfolge", name: "order", widget: "number", value_type: "int" }
      - { label: "Highlights", name: "highlights", widget: "list", field: { label: "Highlight", name: "highlight", widget: "string" } }
      - { label: "Beschreibung", name: "body", widget: "markdown" }

  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    fields:
      - { label: "Titel", name: "title", widget: "string" }
      - { label: "Datum", name: "date", widget: "datetime", format: "YYYY-MM-DD" }
      - { label: "Autor", name: "author", widget: "string" }
      - { label: "Auszug", name: "excerpt", widget: "text" }
      - { label: "Tags", name: "tags", widget: "list", field: { label: "Tag", name: "tag", widget: "string" } }
      - { label: "Veroeffentlicht", name: "published", widget: "boolean", default: false }
      - { label: "Inhalt", name: "body", widget: "markdown" }

  - name: "testimonials"
    label: "Testimonials"
    folder: "src/content/testimonials"
    create: true
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Position", name: "position", widget: "string" }
      - { label: "Reihenfolge", name: "order", widget: "number", value_type: "int", default: 0 }
      - { label: "Zitat", name: "body", widget: "markdown" }

  - name: "team"
    label: "Team"
    folder: "src/content/team"
    create: true
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Rolle", name: "role", widget: "string" }
      - { label: "Standort", name: "location", widget: "string" }
      - { label: "LinkedIn", name: "linkedin", widget: "string", required: false }
      - { label: "Reihenfolge", name: "order", widget: "number", value_type: "int" }
      - { label: "Biografie", name: "body", widget: "markdown" }
'@ | Set-Content -Path "public/admin/config.yml" -Encoding UTF8

Write-Host "  Decap CMS configured" -ForegroundColor Green

Write-Host ""
Write-Host "=== Setup complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. npm install"
Write-Host "  2. git init && git add . && git commit -m 'init'"
Write-Host "  3. npm run dev          (Terminal 1 - Website)"
Write-Host "  4. npm run cms          (Terminal 2 - CMS Backend)"
Write-Host "  5. http://localhost:4321        (Website)"
Write-Host "  6. http://localhost:4321/admin/  (CMS)"