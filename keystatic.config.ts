import { config, fields, collection, singleton } from '@keystatic/core';

const isLocal = import.meta.env.DEV;

// Helper: creates a singleton for a given locale
function localeSingleton(label: string, basePath: string, locale: string, schema: any) {
  return singleton({
    label: `${label} (${locale.toUpperCase()})`,
    path: `src/content/pages/${locale}/${basePath}`,
    format: { data: 'json' },
    schema,
  });
}

// Helper: shortcut for required text fields
const req = { isRequired: true } as const;

// Helper: required with max length
const reqMax = (max: number) => ({ isRequired: true, length: { max } });

// Reusable schemas
const heroSchema = {
  headline_top: fields.text({
    label: 'Headline (Zeile 1)',
    description: 'Erste, weiße Zeile der Hero-Headline. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  accent_line1: fields.text({
    label: 'Accent Text (Zeile 1)',
    description: 'Farbige Zeile direkt darunter — erste Zeile. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  accent_line2: fields.text({
    label: 'Accent Text (Zeile 2)',
    description: 'Farbige Zeile — zweite Zeile. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  subtitle: fields.text({
    label: 'Subtitle',
    description: 'Beschreibungstext unter der Headline. Max. 400 Zeichen.',
    multiline: true,
    validation: reqMax(400),
  }),
  cta_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Haupt-Button. Kurz halten. Max. 50 Zeichen.',
    validation: reqMax(50),
  }),
  cta_url: fields.text({
    label: 'CTA URL',
    description: 'Volle URL (https://...) zu der der Button führen soll.',
    validation: req,
  }),
};

const impactSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift der Impact-Sektion. Max. 100 Zeichen.',
    validation: reqMax(100),
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext zur Headline. Max. 250 Zeichen.',
    multiline: true,
    validation: reqMax(250),
  }),
  cards: fields.array(
    fields.object({
      title: fields.text({
        label: 'Titel',
        description: 'Karten-Titel. Max. 50 Zeichen.',
        validation: reqMax(50),
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Ein-Satz-Zusammenfassung. Max. 80 Zeichen.',
        validation: reqMax(80),
      }),
      description: fields.text({
        label: 'Beschreibung',
        description: 'Detail-Beschreibung der Karte. Max. 300 Zeichen.',
        multiline: true,
        validation: reqMax(300),
      }),
    }),
    { label: 'Karten', itemLabel: (props) => props.fields.title.value || 'Neue Karte' }
  ),
};

const socialproofSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift über den Logos. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  client_label: fields.text({
    label: 'Kunden Label',
    description: 'Kleine Überschrift vor den Kunden-Logos (z.B. "UNSERE KUNDEN"). Max. 30 Zeichen.',
    validation: reqMax(30),
  }),
  transition_text: fields.text({
    label: 'Überleitung Text',
    description: 'Text zwischen Kunden- und OEM-Sektion. Max. 150 Zeichen.',
    validation: reqMax(150),
  }),
  transition_emphasis: fields.text({
    label: 'Überleitung Hervorhebung',
    description: 'Kursive zweite Zeile der Überleitung. Max. 150 Zeichen.',
    validation: reqMax(150),
  }),
  oem_label: fields.text({
    label: 'OEM Label',
    description: 'Kleine Überschrift vor den OEM-Logos (z.B. "BEAUFTRAGT VON"). Max. 30 Zeichen.',
    validation: reqMax(30),
  }),
};

const servicesSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift. HTML erlaubt (z.B. <span class="highlight">). Max. 200 Zeichen.',
    multiline: true,
    validation: reqMax(200),
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext. Max. 300 Zeichen.',
    multiline: true,
    validation: reqMax(300),
  }),
  steps: fields.array(
    fields.object({
      number: fields.text({
        label: 'Nummer',
        description: 'Schritt-Nummer (z.B. "01", "02"). Max. 5 Zeichen.',
        validation: reqMax(5),
      }),
      title: fields.text({
        label: 'Titel',
        description: 'Titel des Schritts. Max. 30 Zeichen.',
        validation: reqMax(30),
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Kurze Beschreibung des Schritts. Max. 150 Zeichen.',
        validation: reqMax(150),
      }),
      points: fields.array(
        fields.text({ label: 'Punkt', validation: reqMax(100) }),
        { label: 'Stichpunkte', itemLabel: (props) => props.value || 'Neuer Punkt' }
      ),
    }),
    { label: 'Schritte', itemLabel: (props) => props.fields.title.value || 'Neuer Schritt' }
  ),
};

const foundersSchema = {
  headline_highlight: fields.text({
    label: 'Headline Highlight',
    description: 'Hervorgehobener Teil der Headline (in Farbe). Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  headline_plain: fields.text({
    label: 'Headline Text',
    description: 'Normaler Teil der Headline. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Einführungstext für den Gründer-Abschnitt. Max. 400 Zeichen.',
    multiline: true,
    validation: reqMax(400),
  }),
  founders: fields.array(
    fields.object({
      name: fields.text({
        label: 'Name',
        description: 'Vollständiger Name des Gründers. Max. 60 Zeichen.',
        validation: reqMax(60),
      }),
      role: fields.text({
        label: 'Rolle',
        description: 'Job-Titel / Rolle. Max. 100 Zeichen.',
        validation: reqMax(100),
      }),
      photo: fields.text({
        label: 'Foto Pfad',
        description: 'Pfad zum Foto (z.B. /assets/pics/name.jpeg). Datei muss unter public/assets/pics/ liegen.',
        validation: req,
      }),
      manifesto: fields.array(
        fields.text({ label: 'Absatz', multiline: true, validation: reqMax(1000) }),
        {
          label: 'Manifesto Absätze',
          itemLabel: (props) => (props.value || '').substring(0, 50) + '...',
        }
      ),
      tags: fields.array(
        fields.text({ label: 'Tag', validation: reqMax(50) }),
        { label: 'Tags', itemLabel: (props) => props.value || 'Neuer Tag' }
      ),
    }),
    { label: 'Gründer', itemLabel: (props) => props.fields.name.value || 'Neuer Gründer' }
  ),
};

const contactSchema = {
  section_label: fields.text({
    label: 'Section Label',
    description: 'Kleine Überschrift (z.B. "Kontakt"). Max. 30 Zeichen.',
    validation: reqMax(30),
  }),
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift der Kontakt-Sektion. Max. 80 Zeichen.',
    validation: reqMax(80),
  }),
  description: fields.text({
    label: 'Beschreibung',
    description: 'Kurzer Text unter der Headline. Max. 300 Zeichen.',
    multiline: true,
    validation: reqMax(300),
  }),
  cta_title: fields.text({
    label: 'CTA Titel',
    description: 'Titel der CTA-Karte rechts. Max. 60 Zeichen.',
    validation: reqMax(60),
  }),
  cta_description: fields.text({
    label: 'CTA Beschreibung',
    description: 'Text in der CTA-Karte. Max. 250 Zeichen.',
    multiline: true,
    validation: reqMax(250),
  }),
  cta_button_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Button (z.B. "Termin wählen"). Max. 30 Zeichen.',
    validation: reqMax(30),
  }),
  cta_url: fields.text({
    label: 'CTA URL',
    description: 'Volle URL (https://...) zu der der Button führen soll.',
    validation: req,
  }),
};

const headerSchema = {
  nav_items: fields.array(
    fields.object({
      label: fields.text({
        label: 'Label',
        description: 'Sichtbarer Navigations-Text.',
        validation: req,
      }),
      href: fields.text({
        label: 'Link',
        description: 'Anker-Link (z.B. /#services) oder URL.',
        validation: req,
      }),
    }),
    { label: 'Navigation', itemLabel: (props) => props.fields.label.value || 'Neuer Link' }
  ),
  cta_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Button rechts im Header.',
    validation: req,
  }),
  cta_href: fields.text({
    label: 'CTA Link',
    description: 'Ziel-Link des Header-Buttons.',
    validation: req,
  }),
};

const globalReachSchema = {
  map_label: fields.text({
    label: 'Map Label',
    description: 'Kleines Label oben (z.B. "GLOBALE REICHWEITE").',
    validation: reqMax(40),
  }),
  map_subtitle: fields.text({
    label: 'Map Subtitle',
    description: 'Untertitel unter dem Label.',
    validation: reqMax(80),
  }),
  locations: fields.array(
    fields.object({
      name: fields.text({
        label: 'Standort',
        description: 'Name des Standorts (wird auf der Karte angezeigt).',
        validation: reqMax(30),
      }),
      x: fields.number({
        label: 'X-Position (%)',
        description: 'Horizontal: 0=ganz links, 100=ganz rechts.',
        validation: { isRequired: true },
      }),
      y: fields.number({
        label: 'Y-Position (%)',
        description: 'Vertikal: 0=oben, 100=unten.',
        validation: { isRequired: true },
      }),
      label_position: fields.select({
        label: 'Label-Position',
        description: 'Wo soll das Label relativ zum Pin erscheinen?',
        options: [
          { label: 'Oben (Standard)', value: 'top' },
          { label: 'Unten', value: 'bottom' },
          { label: 'Links', value: 'left' },
          { label: 'Rechts', value: 'right' },
        ],
        defaultValue: 'top',
      }),
    }),
    { label: 'Standorte', itemLabel: (props) => props.fields.name.value || 'Neuer Standort' }
  ),
  cards: fields.array(
    fields.object({
      icon: fields.select({
        label: 'Icon',
        options: [
          { label: 'Team', value: 'team' },
          { label: 'Globe', value: 'globe' },
        ],
        defaultValue: 'team',
      }),
      title: fields.text({
        label: 'Titel',
        validation: reqMax(80),
      }),
      description: fields.text({
        label: 'Beschreibung',
        multiline: true,
        validation: reqMax(250),
      }),
    }),
    { label: 'Info-Karten', itemLabel: (props) => props.fields.title.value || 'Neue Karte' }
  ),
};

const testimonialsHeadlineSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift der Testimonials-Sektion.',
    validation: req,
  }),
  testimonials: fields.array(
    fields.object({
      name: fields.text({
        label: 'Name',
        description: 'Voller Name der Person.',
        validation: req,
      }),
      position: fields.text({
        label: 'Position / Firma',
        description: 'Job-Titel und Firma.',
        validation: req,
      }),
      photo: fields.text({
        label: 'Foto Pfad',
        description: 'Pfad zum Foto (z.B. /assets/pics/name.png).',
        validation: req,
      }),
      quote: fields.text({
        label: 'Zitat',
        description: 'Das Kundenzitat.',
        multiline: true,
        validation: req,
      }),
    }),
    { label: 'Testimonials', itemLabel: (props) => props.fields.name.value || 'Neues Testimonial' }
  ),
};

export default config({
  storage: isLocal
    ? { kind: 'local' as const }
    : {
        kind: 'github' as const,
        repo: 'Asight-GmbH/asight-website',
      },
  ui: {
    brand: { name: 'ASIGHT CMS' },
    navigation: {
      'Deutsch': [
        'hero_de', 'impact_de', 'socialproof_de', 'globalreach_de', 'services_de',
        'founders_de', 'testimonials_headline_de', 'contact_de', 'header_de',
      ],
      'English': [
        'hero_en', 'impact_en', 'socialproof_en', 'globalreach_en', 'services_en',
        'founders_en', 'testimonials_headline_en', 'contact_en', 'header_en',
      ],
      'Einträge': ['testimonials', 'blog', 'team'],
    },
  },
  singletons: {
    // German
    hero_de: localeSingleton('Hero', 'hero', 'de', heroSchema),
    impact_de: localeSingleton('Impact Strip', 'impact', 'de', impactSchema),
    socialproof_de: localeSingleton('Social Proof', 'socialproof', 'de', socialproofSchema),
    globalreach_de: localeSingleton('Global Reach', 'globalreach', 'de', globalReachSchema),
    services_de: localeSingleton('Services', 'services', 'de', servicesSchema),
    founders_de: localeSingleton('Founders', 'founders', 'de', foundersSchema),
    testimonials_headline_de: localeSingleton('Testimonials Headline', 'testimonials-headline', 'de', testimonialsHeadlineSchema),
    contact_de: localeSingleton('Kontakt', 'contact', 'de', contactSchema),
    header_de: localeSingleton('Header', 'header', 'de', headerSchema),

    // English
    hero_en: localeSingleton('Hero', 'hero', 'en', heroSchema),
    impact_en: localeSingleton('Impact Strip', 'impact', 'en', impactSchema),
    socialproof_en: localeSingleton('Social Proof', 'socialproof', 'en', socialproofSchema),
    globalreach_en: localeSingleton('Global Reach', 'globalreach', 'en', globalReachSchema),
    services_en: localeSingleton('Services', 'services', 'en', servicesSchema),
    founders_en: localeSingleton('Founders', 'founders', 'en', foundersSchema),
    testimonials_headline_en: localeSingleton('Testimonials Headline', 'testimonials-headline', 'en', testimonialsHeadlineSchema),
    contact_en: localeSingleton('Contact', 'contact', 'en', contactSchema),
    header_en: localeSingleton('Header', 'header', 'en', headerSchema),
  },
  collections: {
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Name', validation: req }),
        position: fields.text({ label: 'Position', validation: req }),
        locale: fields.select({
          label: 'Sprache',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'de',
        }),
        photo: fields.text({ label: 'Foto Pfad' }),
        order: fields.integer({ label: 'Reihenfolge', defaultValue: 0 }),
        content: fields.mdx({ label: 'Zitat' }),
      },
    }),

    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titel', validation: req }),
        date: fields.date({ label: 'Datum', validation: req }),
        author: fields.text({ label: 'Autor', validation: req }),
        excerpt: fields.text({ label: 'Auszug', multiline: true, validation: req }),
        locale: fields.select({
          label: 'Sprache',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'de',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.value || 'Neuer Tag' }
        ),
        published: fields.checkbox({
          label: 'Veröffentlicht',
          description: 'Nur veröffentlichte Artikel erscheinen auf der Website.',
          defaultValue: false,
        }),
        content: fields.mdx({ label: 'Inhalt' }),
      },
    }),

    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Name', validation: req }),
        role: fields.text({ label: 'Rolle', validation: req }),
        location: fields.text({ label: 'Standort', validation: req }),
        locale: fields.select({
          label: 'Sprache',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'de',
        }),
        linkedin: fields.url({ label: 'LinkedIn' }),
        order: fields.integer({ label: 'Reihenfolge', defaultValue: 0 }),
        content: fields.mdx({ label: 'Biografie' }),
      },
    }),
  },
});
