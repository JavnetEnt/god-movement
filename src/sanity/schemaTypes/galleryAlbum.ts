import { defineField, defineType } from 'sanity';

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Album Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'titleDe',
      title: 'Album Title (German)',
      type: 'string'
    }),
    defineField({
      name: 'eventDate',
      title: 'Event / Album Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0]
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English, optional)',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'descriptionDe',
      title: 'Description (German, optional)',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'photos',
      title: 'Album Photos',
      type: 'array',
      description: 'Drag and drop multiple photos at once to upload.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'captionEn',
              title: 'Caption (English, optional)',
              type: 'string'
            }),
            defineField({
              name: 'captionDe',
              title: 'Caption (German, optional)',
              type: 'string'
            })
          ]
        }
      ],
      validation: (Rule) => Rule.min(1)
    })
  ],
  preview: {
    select: {
      title: 'titleEn',
      date: 'eventDate',
      media: 'photos.0'
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date || 'Photo Album',
        media
      };
    }
  }
});