# ASIGHT Consulting — Corporate Color System

> Alle Farben sind aus den 4 offiziellen Corporate Colors abgeleitet.

## Quellfarben (offizielle Corporate Colors)

| Rolle | Hex | Verwendung |
|-------|-----|-----------|
| Dunkel Dunkelblau | `#454F5E` | Wordmark-Text, Logo-Hauptformen |
| Dunkelblau | `#4B5F78` | Sekundäre dunkle Akzente |
| Türkis (Main Accent) | `#3AA6B9` | Primärer Akzent |
| Hellblau | `#AFDDE9` | Sekundärer Akzent, Highlights |

---

## 1. Primary Scale (aus `#3fa7b5`, H=187.1)

Hue konstant bei 187.1, Lightness/Saturation skaliert.

| Step | Hex | Ableitung |
|------|-----|-----------|
| 50 | `#f0f8f9` | S=45%, L=96% |
| 100 | `#d9eff2` | S=48%, L=90% |
| 200 | `#b3dfe6` | S=50%, L=80% |
| 300 | `#85cdd6` | S=50%, L=68% |
| 400 | `#55b6c3` | S=48%, L=55% |
| **500** | **`#3fa7b5`** | **Logo-Originalfarbe** |
| 600 | `#318e9b` | S=52%, L=40% |
| 700 | `#25747e` | S=55%, L=32% |
| 800 | `#1c575f` | S=55%, L=24% |
| 900 | `#154147` | S=55%, L=18% |

---

## 2. Neutral Scale (aus `#454f5e`, H=216)

Hue konstant bei 216, Saturation steigt leicht bei dunkleren Werten.

| Step | Hex | Ableitung |
|------|-----|-----------|
| 50 | `#f6f7f8` | S=15%, L=97% |
| 100 | `#eaedf0` | S=15%, L=93% |
| 200 | `#d6dae0` | S=14%, L=86% |
| 300 | `#b7bec8` | S=13%, L=75% |
| 400 | `#8791a1` | S=12%, L=58% |
| 500 | `#647082` | S=13%, L=45% |
| **600** | **`#454f5e`** | **Logo-Originalfarbe** |
| 700 | `#3b4554` | S=17%, L=28% |
| 800 | `#29313d` | S=20%, L=20% |
| 900 | `#1b222c` | S=24%, L=14% |
| 950 | `#11161d` | S=28%, L=9% |

---

## 3. Accent/Light Scale (aus `#a7d3dd`, H=191.1)

| Name | Hex | Ableitung |
|------|-----|-----------|
| tint-50 | `#f4f9fa` | S=40%, L=97% |
| tint-100 | `#e6f2f5` | S=42%, L=93% |
| tint-200 | `#cde4ea` | S=40%, L=86% |
| **base** | **`#a7d3dd`** | **Logo-Originalfarbe** |
| shade-400 | `#87b9c5` | S=35%, L=65% |

Verwendung: Highlight-Hintergründe, Badges, Hover-States auf hellen Flächen.

---

## 4. Semantische Farben (Hue-Shifts aus Primary H=187.1)

### Success (H=187.1 → H=150, Richtung Grün)

| Step | Hex |
|------|-----|
| 100 | `#e4f6ed` |
| 500 | `#39ac73` |
| 700 | `#26734d` |

### Warning (H=187.1 → H=38, Split-Komplementär warm)

| Step | Hex |
|------|-----|
| 100 | `#faf0e1` |
| 500 | `#d99726` |
| 700 | `#986a1b` |

### Error (H=187.1 → H=8, Komplementär rot)

| Step | Hex |
|------|-----|
| 100 | `#f9e5e2` |
| 500 | `#ca402b` |
| 700 | `#8b2c1d` |

### Info (= Primary Teal, unverändert)

| Step | Hex |
|------|-----|
| 100 | `#d9eff2` |
| 500 | `#3fa7b5` |
| 700 | `#2a7079` |

---

## 5. Oberflächen

### Dunkel (aus Neutral H=216, vertieft)

| Name | Hex | Ableitung |
|------|-----|-----------|
| surface-dark | `#11161d` | neutral-950 |
| surface-dark-section | `#171d26` | H=216, S=24%, L=12% |
| surface-dark-card | `#1e252f` | H=216, S=22%, L=15% |
| surface-dark-card-hover | `#252c37` | H=216, S=20%, L=18% |

### Hell

| Name | Hex | Ableitung |
|------|-----|-----------|
| surface-light | `#ffffff` | Weiß |
| surface-light-alt | `#f6f7f8` | neutral-50 |
| surface-light-tinted | `#f6f9f9` | H=187.1, S=20%, L=97% |
| surface-light-card-alt | `#f1f2f4` | H=216, S=12%, L=95% |

### Glass / Overlay

| Name | Wert |
|------|------|
| glass-dark | `rgba(17, 22, 29, 0.80)` |
| glass-light | `rgba(255, 255, 255, 0.70)` |
| overlay | `rgba(17, 22, 29, 0.60)` |
| overlay-heavy | `rgba(17, 22, 29, 0.85)` |

---

## 6. UI-Mappings

### Text

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| text-primary | `#1b222c` (neutral-900) | `#f6f7f8` (neutral-50) |
| text-secondary | `#647082` (neutral-500) | `#b7bec8` (neutral-300) |
| text-muted | `#8791a1` (neutral-400) | `#8791a1` (neutral-400) |

### Borders

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| border-default | `#d6dae0` (neutral-200) | `#3b4554` (neutral-700) |
| border-light | `#eaedf0` (neutral-100) | `#29313d` (neutral-800) |
| border-emphasis | `#3fa7b5` (primary-500) | `#55b6c3` (primary-400) |

### CTA Button

| Token | Wert |
|-------|------|
| cta-gradient-start | `#3098a6` |
| cta-gradient-end | `#309185` |
| cta-shadow | `rgba(63, 167, 181, 0.30)` |

### Links & Interaktion

| Token | Wert |
|-------|------|
| link | `#3fa7b5` (primary-500) |
| link-hover | `#318e9b` (primary-600) |
| focus-ring | `rgba(63, 167, 181, 0.40)` |
| hover-tint | `rgba(63, 167, 181, 0.06)` |
| active-tint | `rgba(63, 167, 181, 0.15)` |

---

## CSS Custom Properties

```css
:root {
  /* Primary (Logo-Teal #3fa7b5, H=187.1) */
  --primary-50:  #f0f8f9;
  --primary-100: #d9eff2;
  --primary-200: #b3dfe6;
  --primary-300: #85cdd6;
  --primary-400: #55b6c3;
  --primary-500: #3fa7b5;
  --primary-600: #318e9b;
  --primary-700: #25747e;
  --primary-800: #1c575f;
  --primary-900: #154147;

  /* Neutral (Logo-Dunkelgrau #454f5e, H=216) */
  --neutral-50:  #f6f7f8;
  --neutral-100: #eaedf0;
  --neutral-200: #d6dae0;
  --neutral-300: #b7bec8;
  --neutral-400: #8791a1;
  --neutral-500: #647082;
  --neutral-600: #454f5e;
  --neutral-700: #3b4554;
  --neutral-800: #29313d;
  --neutral-900: #1b222c;
  --neutral-950: #11161d;

  /* Accent Light (Logo-Hellteal #a7d3dd, H=191.1) */
  --accent-50:   #f4f9fa;
  --accent-100:  #e6f2f5;
  --accent-200:  #cde4ea;
  --accent-base: #a7d3dd;
  --accent-400:  #87b9c5;

  /* Semantisch */
  --success-100: #e4f6ed;
  --success-500: #39ac73;
  --success-700: #26734d;

  --warning-100: #faf0e1;
  --warning-500: #d99726;
  --warning-700: #986a1b;

  --error-100:   #f9e5e2;
  --error-500:   #ca402b;
  --error-700:   #8b2c1d;

  --info-100:    #d9eff2;
  --info-500:    #3fa7b5;
  --info-700:    #2a7079;

  /* Oberflächen */
  --surface-dark:            #11161d;
  --surface-dark-section:    #171d26;
  --surface-dark-card:       #1e252f;
  --surface-dark-card-hover: #252c37;

  --surface-light:           #ffffff;
  --surface-light-alt:       #f6f7f8;
  --surface-light-tinted:    #f6f9f9;

  /* Glass */
  --glass-dark:    rgba(17, 22, 29, 0.80);
  --glass-light:   rgba(255, 255, 255, 0.70);
  --overlay:       rgba(17, 22, 29, 0.60);

  /* CTA */
  --cta-from:   #3098a6;
  --cta-to:     #309185;
  --cta-shadow: rgba(63, 167, 181, 0.30);
}
```

---

## Ableitungs-Übersicht

| Quellfarbe | Hue | Abgeleitete Kategorien |
|-----------|-----|----------------------|
| `#3fa7b5` | H=187.1 | Primary Scale, Info, CTA, Links, Focus, Hover-Tints |
| `#454f5e` | H=216 | Neutral Scale, Surfaces, Text, Borders, Glass/Overlay |
| `#a7d3dd` | H=191.1 | Accent-Tints, Dark-Mode Hover-Tints |
| — | H=150 | Success (H=187.1 − 37°) |
| — | H=38 | Warning (H=187.1 + 211°, Split-Komplementär) |
| — | H=8 | Error (H=187.1 + 181°, Komplementär) |

**Keine willkürlichen Farben. Jeder Hex-Wert ist mathematisch zurückverfolgbar.**
