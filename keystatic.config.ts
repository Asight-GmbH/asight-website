import { config, fields, collection, singleton } from '@keystatic/core';

const isLocal = import.meta.env.DEV;

function localeSingleton(label: string, basePath: string, locale: string, schema: any) {
  return singleton({
    label: `${label} (${locale.toUpperCase()})`,
    path: `src/content/pages/${locale}/${basePath}`,
    format: { data: 'json' },
    schema,
  });
}

const req = { isRequired: true } as const;

// Photo field: uses image upload that stores into public/assets/pics/
const photoField = fields.image({
  label: 'Foto',
  directory: 'public/assets/pics',
  publicPath: '/assets/pics/',
  validation: req,
});

// Reusable schemas
const heroSchema = {
  headline_top: fields.text({
    label: 'Headline (Zeile 1)',
    description: 'Erste, weiße Zeile der Hero-Headline. Max. 60 Zeichen.',
    validation: { isRequired: true, length: { max: 60 } },
  }),
  accent_line1: fields.text({
    label: 'Accent Text (Zeile 1)',
    description: 'Farbige Zeile direkt darunter — erste Zeile.',
    validation: { isRequired: true, length: { max: 60 } },
  }),
  accent_line2: fields.text({
    label: 'Accent Text (Zeile 2)',
    description: 'Farbige Zeile — zweite Zeile.',
    validation: { isRequired: true, length: { max: 60 } },
  }),
  subtitle: fields.text({
    label: 'Subtitle',
    description: 'Beschreibungstext unter der Headline. Max. 300 Zeichen.',
    multiline: true,
    validation: { isRequired: true, length: { max: 300 } },
  }),
  cta_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Haupt-Button. Kurz halten (z.B. "Termin buchen").',
    validation: { isRequired: true, length: { max: 40 } },
  }),
  cta_url: fields.url({
    label: 'CTA URL',
    description: 'Volle URL (https://...) zu der der Button führen soll.',
    validation: req,
  }),
};

const impactSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift der Impact-Sektion.',
    validation: { isRequired: true, length: { max: 100 } },
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext zur Headline.',
    multiline: true,
    validation: { isRequired: true, length: { max: 250 } },
  }),
  cards: fields.array(
    fields.object({
      title: fields.text({
        label: 'Titel',
        description: 'Karten-Titel. Kurz und knackig.',
        validation: { isRequired: true, length: { max: 50 } },
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Ein-Satz-Zusammenfassung.',
        validation: { isRequired: true, length: { max: 80 } },
      }),
      description: fields.text({
        label: 'Beschreibung',
        description: 'Detail-Beschreibung der Karte (1-2 Sätze).',
        multiline: true,
        validation: { isRequired: true, length: { max: 300 } },
      }),
    }),
    {
      label: 'Karten',
      itemLabel: (props) => props.fields.title.value || 'Neue Karte',
      validation: { length: { min: 4, max: 4 } },
    }
  ),
};

const socialproofSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Überschrift über den Logos.',
    validation: { isRequired: true, length: { max: 80 } },
  }),
  client_label: fields.text({
    label: 'Kunden Label',
    description: 'Kleine Überschrift vor den Kunden-Logos (z.B. "UNSERE KUNDEN").',
    validation: { isRequired: true, length: { max: 30 } },
  }),
  transition_text: fields.text({
    label: 'Überleitung Text',
    description: 'Text zwischen Kunden- und OEM-Sektion.',
    validation: { isRequired: true, length: { max: 150 } },
  }),
  transition_emphasis: fields.text({
    label: 'Überleitung Hervorhebung',
    description: 'Kursive zweite Zeile der Überleitung.',
    validation: { isRequired: true, length: { max: 150 } },
  }),
  oem_label: fields.text({
    label: 'OEM Label',
    description: 'Kleine Überschrift vor den OEM-Logos (z.B. "BEAUFTRAGT VON").',
    validation: { isRequired: true, length: { max: 30 } },
  }),
};

const servicesSchema = {
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift der Services-Sektion. HTML erlaubt (z.B. <span class="highlight">).',
    multiline: true,
    validation: { isRequired: true, length: { max: 200 } },
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Unterzeile mit Kontext.',
    multiline: true,
    validation: { isRequired: true, length: { max: 300 } },
  }),
  steps: fields.array(
    fields.object({
      number: fields.text({
        label: 'Nummer',
        description: 'Schritt-Nummer (z.B. "01", "02").',
        validation: { isRequired: true, length: { max: 3 } },
      }),
      title: fields.text({
        label: 'Titel',
        description: 'Titel des Schritts.',
        validation: { isRequired: true, length: { max: 30 } },
      }),
      subtitle: fields.text({
        label: 'Subtitle',
        description: 'Kurze Beschreibung des Schritts.',
        validation: { isRequired: true, length: { max: 150 } },
      }),
      points: fields.array(
        fields.text({
          label: 'Punkt',
          validation: { isRequired: true, length: { max: 100 } },
        }),
        {
          label: 'Stichpunkte',
          itemLabel: (props) => props.value || 'Neuer Punkt',
          validation: { length: { min: 1 } },
        }
      ),
    }),
    {
      label: 'Schritte',
      itemLabel: (props) => props.fields.title.value || 'Neuer Schritt',
      validation: { length: { min: 3, max: 3 } },
    }
  ),
};

const foundersSchema = {
  headline_highlight: fields.text({
    label: 'Headline Highlight',
    description: 'Hervorgehobener Teil der Headline (in Farbe).',
    validation: { isRequired: true, length: { max: 80 } },
  }),
  headline_plain: fields.text({
    label: 'Headline Text',
    description: 'Normaler Teil der Headline.',
    validation: { isRequired: true, length: { max: 80 } },
  }),
  subline: fields.text({
    label: 'Subline',
    description: 'Einführungstext für den Gründer-Abschnitt.',
    multiline: true,
    validation: { isRequired: true, length: { max: 400 } },
  }),
  founders: fields.array(
    fields.object({
      name: fields.text({
        label: 'Name',
        description: 'Vollständiger Name des Gründers.',
        validation: { isRequired: true, length: { max: 60 } },
      }),
      role: fields.text({
        label: 'Rolle',
        description: 'Job-Titel / Rolle (z.B. "Co-Founder & Experte für...").',
        validation: { isRequired: true, length: { max: 100 } },
      }),
      photo: photoField,
      manifesto: fields.array(
        fields.text({
          label: 'Absatz',
          multiline: true,
          validation: { isRequired: true, length: { max: 1000 } },
        }),
        {
          label: 'Manifesto Absätze',
          itemLabel: (props) => (props.value || '').substring(0, 50) + '...',
          validation: { length: { min: 1 } },
        }
      ),
      tags: fields.array(
        fields.text({
          label: 'Tag',
          validation: { isRequired: true, length: { max: 40 } },
        }),
        {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Neuer Tag',
        }
      ),
    }),
    {
      label: 'Gründer',
      itemLabel: (props) => props.fields.name.value || 'Neuer Gründer',
    }
  ),
};

const contactSchema = {
  section_label: fields.text({
    label: 'Section Label',
    description: 'Kleine Überschrift (z.B. "Kontakt").',
    validation: { isRequired: true, length: { max: 30 } },
  }),
  headline: fields.text({
    label: 'Headline',
    description: 'Hauptüberschrift der Kontakt-Sektion.',
    validation: { isRequired: true, length: { max: 80 } },
  }),
  description: fields.text({
    label: 'Beschreibung',
    description: 'Kurzer Text unter der Headline.',
    multiline: true,
    validation: { isRequired: true, length: { max: 300 } },
  }),
  cta_title: fields.text({
    label: 'CTA Titel',
    description: 'Titel der CTA-Karte rechts.',
    validation: { isRequired: true, length: { max: 50 } },
  }),
  cta_description: fields.text({
    label: 'CTA Beschreibung',
    description: 'Text in der CTA-Karte.',
    multiline: true,
    validation: { isRequired: true, length: { max: 250 } },
  }),
  cta_button_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Button (z.B. "Termin wählen").',
    validation: { isRequired: true, length: { max: 30 } },
  }),
  cta_url: fields.url({
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
        validation: { isRequired: true, length: { max: 30 } },
      }),
      href: fields.text({
        label: 'Link',
        description: 'Anker-Link (z.B. "/#services") oder URL.',
        validation: req,
      }),
    }),
    {
      label: 'Navigation',
      itemLabel: (props) => props.fields.label.value || 'Neuer Link',
    }
  ),
  cta_text: fields.text({
    label: 'CTA Button Text',
    description: 'Text auf dem Button rechts im Header.',
    validation: { isRequired: true, length: { max: 30 } },
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
    validation: { isRequired: true, length: { max: 80 } },
  }),
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
        name: fields.text({
          label: 'Name',
          description: 'Voller Name des Testimonial-Gebers.',
          validation: { isRequired: true, length: { max: 80 } },
        }),
        position: fields.text({
          label: 'Position / Firma',
          description: 'Job-Titel und Firma (z.B. "Projektleiter, Daimler Truck").',
          validation: { isRequired: true, length: { max: 120 } },
        }),
        locale: fields.select({
          label: 'Sprache',
          description: 'In welcher Sprach-Version soll dieses Testimonial erscheinen?',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'de',
        }),
        photo: fields.image({
          label: 'Foto',
          description: 'Portrait-Foto, idealerweise quadratisch.',
          directory: 'public/assets/pics',
          publicPath: '/assets/pics/',
        }),
        order: fields.integer({
          label: 'Reihenfolge',
          description: 'Niedrigere Zahl = weiter links/oben.',
          defaultValue: 0,
        }),
        content: fields.mdx({ label: 'Zitat' }),
      },
    }),

    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({
          label: 'Titel',
          validation: { isRequired: true, length: { max: 120 } },
        }),
        date: fields.date({ label: 'Datum', validation: req }),
        author: fields.text({ label: 'Autor', validation: req }),
        excerpt: fields.text({
          label: 'Auszug',
          description: 'Kurze Zusammenfassung für die Artikel-Übersicht.',
          multiline: true,
          validation: { isRequired: true, length: { max: 300 } },
        }),
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
