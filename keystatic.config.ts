import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'ASIGHT' },
  },
  collections: {
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titel', validation: { isRequired: true } }),
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'Clipboard', value: 'clipboard' },
            { label: 'Settings', value: 'settings' },
            { label: 'Monitor', value: 'monitor' },
          ],
          defaultValue: 'clipboard',
        }),
        order: fields.integer({ label: 'Reihenfolge', defaultValue: 0 }),
        highlights: fields.array(
          fields.text({ label: 'Highlight' }),
          {
            label: 'Highlights',
            itemLabel: (props) => props.value || 'Neuer Eintrag',
          }
        ),
        content: fields.mdx({ label: 'Beschreibung' }),
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
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Neuer Tag',
          }
        ),
        published: fields.checkbox({ label: 'Veröffentlicht', defaultValue: false }),
        image: fields.image({
          label: 'Bild',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.mdx({ label: 'Inhalt' }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        position: fields.text({ label: 'Position', validation: { isRequired: true } }),
        order: fields.integer({ label: 'Reihenfolge', defaultValue: 0 }),
        image: fields.image({
          label: 'Foto',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials/',
        }),
        content: fields.mdx({ label: 'Zitat' }),
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
        linkedin: fields.url({ label: 'LinkedIn' }),
        order: fields.integer({ label: 'Reihenfolge', defaultValue: 0 }),
        image: fields.image({
          label: 'Foto',
          directory: 'public/images/team',
          publicPath: '/images/team/',
        }),
        content: fields.mdx({ label: 'Biografie' }),
      },
    }),
  },
});
