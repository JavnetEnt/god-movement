import { defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Event Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'titleDe',
      title: 'Event Title (German)',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday Worship', value: 'Sunday Worship' },
          { title: 'Prayer & Midweek', value: 'Prayer & Midweek' },
          { title: 'Conference / Special', value: 'Conference' },
          { title: 'Youth & Community', value: 'Community' }
        ]
      },
      initialValue: 'Sunday Worship'
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'recurrenceNoteEn',
      title: 'Recurrence Note (English, optional)',
      type: 'string',
      description: 'e.g., "Every Sunday at 1:00 PM CET"'
    }),
    defineField({
      name: 'recurrenceNoteDe',
      title: 'Recurrence Note (German, optional)',
      type: 'string',
      description: 'z.B. „Jeden Sonntag um 13:00 Uhr MEZ“'
    }),
    defineField({
      name: 'locationName',
      title: 'Venue / Location Name',
      type: 'string',
      initialValue: 'God Movement Full Gospel Church — Gütersloh'
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
      initialValue: '33335 Gütersloh, Germany'
    }),
    defineField({
      name: 'isOnline',
      title: 'Also Streamed Online (YouTube Live)?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'descriptionDe',
      title: 'Description (German)',
      type: 'text',
      rows: 4
    })
  ],
  preview: {
    select: {
      title: 'titleEn',
      date: 'startDateTime',
      location: 'locationName'
    },
    prepare({ title, date, location }) {
      const formatted = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${formatted} • ${location || ''}`
      };
    }
  }
});