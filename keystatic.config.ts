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

// Reusable schemas
const heroSchema = {
  headline_top: fields.text({ label: 'Headline (Zeile 1)' }),
  accent_line1: fields.text({ label: 'Accent Text (Zeile 1)' }),
  accent_line2: fields.text({ label: 'Accent Text (Zeile 2)' }),
  subtitle: fields.text({ label: 'Subtitle', multiline: true }),
  cta_text: fields.text({ label: 'CTA Button Text' }),
  cta_url: fields.url({ label: 'CTA URL' }),
};

const impactSchema = {
  headline: fields.text({ label: 'Headline' }),
  subline: fields.text({ label: 'Subline', multiline: true }),
  cards: fields.array(
    fields.object({
      title: fields.text({ label: 'Titel' }),
      subtitle: fields.text({ label: 'Subtitle' }),
      description: fields.text({ label: 'Beschreibung', multiline: true }),
    }),
    { label: 'Karten', itemLabel: (props) => props.fields.title.value || 'Neue Karte' }
  ),
};

const socialproofSchema = {
  headline: fields.text({ label: 'Headline' }),
  client_label: fields.text({ label: 'Kunden Label' }),
  transition_text: fields.text({ label: 'Überleitung Text' }),
  transition_emphasis: fields.text({ label: 'Überleitung Hervorhebung' }),
  oem_label: fields.text({ label: 'OEM Label' }),
};

const servicesSchema = {
  headline: fields.text({ label: 'Headline', multiline: true }),
  subline: fields.text({ label: 'Subline', multiline: true }),
  steps: fields.array(
    fields.object({
      number: fields.text({ label: 'Nummer' }),
      title: fields.text({ label: 'Titel' }),
      subtitle: fields.text({ label: 'Subtitle' }),
      points: fields.array(
        fields.text({ label: 'Punkt' }),
        { label: 'Stichpunkte', itemLabel: (props) => props.value || 'Neuer Punkt' }
      ),
    }),
    { label: 'Schritte', itemLabel: (props) => props.fields.title.value || 'Neuer Schritt' }
  ),
};

const foundersSchema = {
  headline_highlight: fields.text({ label: 'Headline Highlight' }),
  headline_plain: fields.text({ label: 'Headline Text' }),
  subline: fields.text({ label: 'Subline', multiline: true }),
  founders: fields.array(
    fields.object({
      name: fields.text({ label: 'Name' }),
      role: fields.text({ label: 'Rolle' }),
      photo: fields.text({ label: 'Foto Pfad' }),
      manifesto: fields.array(
        fields.text({ label: 'Absatz', multiline: true }),
        { label: 'Manifesto Absätze', itemLabel: (props) => (props.value || '').substring(0, 50) + '...' }
      ),
      tags: fields.array(
        fields.text({ label: 'Tag' }),
        { label: 'Tags', itemLabel: (props) => props.value || 'Neuer Tag' }
      ),
    }),
    { label: 'Gründer', itemLabel: (props) => props.fields.name.value || 'Neuer Gründer' }
  ),
};

const contactSchema = {
  section_label: fields.text({ label: 'Section Label' }),
  headline: fields.text({ label: 'Headline' }),
  description: fields.text({ label: 'Beschreibung', multiline: true }),
  cta_title: fields.text({ label: 'CTA Titel' }),
  cta_description: fields.text({ label: 'CTA Beschreibung', multiline: true }),
  cta_button_text: fields.text({ label: 'CTA Button Text' }),
  cta_url: fields.url({ label: 'CTA URL' }),
};

const headerSchema = {
  nav_items: fields.array(
    fields.object({
      label: fields.text({ label: 'Label' }),
      href: fields.text({ label: 'Link' }),
    }),
    { label: 'Navigation', itemLabel: (props) => props.fields.label.value || 'Neuer Link' }
  ),
  cta_text: fields.text({ label: 'CTA Button Text' }),
  cta_href: fields.text({ label: 'CTA Link' }),
};

const testimonialsHeadlineSchema = {
  headline: fields.text({ label: 'Headline' }),
  testimonials: fields.array(
    fields.object({
      name: fields.text({ label: 'Name' }),
      position: fields.text({ label: 'Position / Firma' }),
      photo: fields.text({ label: 'Foto Pfad' }),
      quote: fields.text({ label: 'Zitat', multiline: true }),
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
      'Collections': ['testimonials', 'blog', 'team'],
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
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        position: fields.text({ label: 'Position', validation: { isRequired: true } }),
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
        title: fields.text({ label: 'Titel', validation: { isRequired: true } }),
        date: fields.date({ label: 'Datum', validation: { isRequired: true } }),
        author: fields.text({ label: 'Autor', validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Auszug', multiline: true, validation: { isRequired: true } }),
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
        published: fields.checkbox({ label: 'Veröffentlicht', defaultValue: false }),
        content: fields.mdx({ label: 'Inhalt' }),
      },
    }),

    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        role: fields.text({ label: 'Rolle', validation: { isRequired: true } }),
        location: fields.text({ label: 'Standort', validation: { isRequired: true } }),
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
