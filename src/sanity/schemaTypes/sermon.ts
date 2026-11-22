import { defineField, defineType } from 'sanity';

export const sermonType = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'titleDe',
      title: 'Title (German)',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'preachedAt',
      title: 'Date Preached',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      initialValue: 'Pastor Joshua Bruno',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'series',
      title: 'Sermon Series (Optional)',
      type: 'string'
    }),
    defineField({
      name: 'topics',
      title: 'Topics / Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Faith', value: 'Faith' },
          { title: 'Grace', value: 'Grace' },
          { title: 'Love', value: 'Love' },
          { title: 'Missions', value: 'Missions' },
          { title: 'Prayer', value: 'Prayer' },
          { title: 'Worship', value: 'Worship' }
        ]
      }
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste any YouTube link (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https']
        })
    }),
    defineField({
      name: 'summaryEn',
      title: 'Summary / Notes (English)',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'summaryDe',
      title: 'Summary / Notes (German)',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'studyNotesPdf',
      title: 'Sermon Notes PDF (Optional)',
      type: 'file',
      options: { accept: '.pdf' }
    })
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'speaker',
      date: 'preachedAt'
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${subtitle} • ${formattedDate}`
      };
    }
  }
});