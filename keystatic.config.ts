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

// Reusable schemas
const heroSchema = {
  headline_top: fields.text({
    label: 'Headline (Zeile 1)',
    description: 'Erste, weiße Zeile der Hero-Headline.',
    validation: req,
  }),
  accent_line1: fields.text({
    label: 'Accent Text (Zeile 1)',
    description: 'Farbige Zeile direkt darunter — erste Zeile.',
    validation: req,
  }),
  accent_line2: fields.text({
    label: 'Accent Text (Zeile 2)',
    description: 'Farbige Zeile — zweite Zeile.',
    validation: req,
  }),
  subtitle: fields.text({
    label: 'Subtitle',
    description: 'Beschreibungstext unter der Headline.',
    multiline: true,
    validation: req,
  }),
  cta_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Haupt-Button. Kurz halten.',
    validation: req,
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
    description: 'Überschrift der Impact-Sektion.',
    validation: req,
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext zur Headline.',
    multiline: true,
    validation: req,
  }),
  cards: fields.array(
    fields.object({
      title: fields.text({
        label: 'Titel',
        description: 'Karten-Titel.',
        validation: req,
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Ein-Satz-Zusammenfassung.',
        validation: req,
      }),
      description: fields.text({
        label: 'Beschreibung',
        description: 'Detail-Beschreibung der Karte.',
        multiline: true,
        validation: req,
      }),
    }),
    { label: 'Karten', itemLabel: (props) => props.fields.title.value || 'Neue Karte' }
  ),
};

const socialproofSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift über den Logos.',
    validation: req,
  }),
  client_label: fields.text({
    label: 'Kunden Label',
    description: 'Kleine Überschrift vor den Kunden-Logos (z.B. "UNSERE KUNDEN").',
    validation: req,
  }),
  transition_text: fields.text({
    label: 'Überleitung Text',
    description: 'Text zwischen Kunden- und OEM-Sektion.',
    validation: req,
  }),
  transition_emphasis: fields.text({
    label: 'Überleitung Hervorhebung',
    description: 'Kursive zweite Zeile der Überleitung.',
    validation: req,
  }),
  oem_label: fields.text({
    label: 'OEM Label',
    description: 'Kleine Überschrift vor den OEM-Logos (z.B. "BEAUFTRAGT VON").',
    validation: req,
  }),
};

const servicesSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift. HTML erlaubt (z.B. <span class="highlight">).',
    multiline: true,
    validation: req,
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext.',
    multiline: true,
    validation: req,
  }),
  steps: fields.array(
    fields.object({
      number: fields.text({
        label: 'Nummer',
        description: 'Schritt-Nummer (z.B. "01", "02").',
        validation: req,
      }),
      title: fields.text({
        label: 'Titel',
        description: 'Titel des Schritts.',
        validation: req,
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Kurze Beschreibung des Schritts.',
        validation: req,
      }),
      points: fields.array(
        fields.text({ label: 'Punkt', validation: req }),
        { label: 'Stichpunkte', itemLabel: (props) => props.value || 'Neuer Punkt' }
      ),
    }),
    { label: 'Schritte', itemLabel: (props) => props.fields.title.value || 'Neuer Schritt' }
  ),
};

const foundersSchema = {
  headline_highlight: fields.text({
    label: 'Headline Highlight',
    description: 'Hervorgehobener Teil der Headline (in Farbe).',
    validation: req,
  }),
  headline_plain: fields.text({
    label: 'Headline Text',
    description: 'Normaler Teil der Headline.',
    validation: req,
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Einführungstext für den Gründer-Abschnitt.',
    multiline: true,
    validation: req,
  }),
  founders: fields.array(
    fields.object({
      name: fields.text({
        label: 'Name',
        description: 'Vollständiger Name des Gründers.',
        validation: req,
      }),
      role: fields.text({
        label: 'Rolle',
        description: 'Job-Titel / Rolle.',
        validation: req,
      }),
      photo: fields.text({
        label: 'Foto Pfad',
        description: 'Pfad zum Foto (z.B. /assets/pics/name.jpeg). Datei muss unter public/assets/pics/ liegen.',
        validation: req,
      }),
      manifesto: fields.array(
        fields.text({ label: 'Absatz', multiline: true, validation: req }),
        {
          label: 'Manifesto Absätze',
          itemLabel: (props) => (props.value || '').substring(0, 50) + '...',
        }
      ),
      tags: fields.array(
        fields.text({ label: 'Tag', validation: req }),
        { label: 'Tags', itemLabel: (props) => props.value || 'Neuer Tag' }
      ),
    }),
    { label: 'Gründer', itemLabel: (props) => props.fields.name.value || 'Neuer Gründer' }
  ),
};

const contactSchema = {
  section_label: fields.text({
    label: 'Section Label',
    description: 'Kleine Überschrift (z.B. "Kontakt").',
    validation: req,
  }),
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift der Kontakt-Sektion.',
    validation: req,
  }),
  description: fields.text({
    label: 'Beschreibung',
    description: 'Kurzer Text unter der Headline.',
    multiline: true,
    validation: req,
  }),
  cta_title: fields.text({
    label: 'CTA Titel',
    description: 'Titel der CTA-Karte rechts.',
    validation: req,
  }),
  cta_description: fields.text({
    label: 'CTA Beschreibung',
    description: 'Text in der CTA-Karte.',
    multiline: true,
    validation: req,
  }),
  cta_button_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Button (z.B. "Termin wählen").',
    validation: req,
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
        'hero_de', 'impact_de', 'socialproof_de', 'services_de',
        'founders_de', 'testimonials_headline_de', 'contact_de', 'header_de',
      ],
      'English': [
        'hero_en', 'impact_en', 'socialproof_en', 'services_en',
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
    services_de: localeSingleton('Services', 'services', 'de', servicesSchema),
    founders_de: localeSingleton('Founders', 'founders', 'de', foundersSchema),
    testimonials_headline_de: localeSingleton('Testimonials Headline', 'testimonials-headline', 'de', testimonialsHeadlineSchema),
    contact_de: localeSingleton('Kontakt', 'contact', 'de', contactSchema),
    header_de: localeSingleton('Header', 'header', 'de', headerSchema),

    // English
    hero_en: localeSingleton('Hero', 'hero', 'en', heroSchema),
    impact_en: localeSingleton('Impact Strip', 'impact', 'en', impactSchema),
    socialproof_en: localeSingleton('Social Proof', 'socialproof', 'en', socialproofSchema),
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
