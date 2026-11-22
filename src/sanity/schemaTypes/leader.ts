import { defineField, defineType } from 'sanity';

export const leaderType = defineType({
  name: 'leader',
  title: 'Leadership & Deacon Board',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Leadership Group',
      type: 'string',
      options: {
        list: [
          { title: 'Senior Leadership / Pastorate', value: 'pastorate' },
          { title: 'Deacon Board', value: 'deacon' }
        ]
      },
      initialValue: 'deacon',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'roleEn',
      title: 'Role / Title (English)',
      type: 'string',
      description: 'e.g., "Founding Pastor & General Overseer" or "Deaconess"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'roleDe',
      title: 'Role / Title (German)',
      type: 'string',
      description: 'z.B. „Gründungspastor & General Overseer“ oder „Diakonin“'
    }),
    defineField({
      name: 'photo',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'bioEn',
      title: 'Short Biography (English)',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'bioDe',
      title: 'Short Biography (German)',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1 for Pastor Joshua Bruno).',
      initialValue: 10
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'roleEn',
      media: 'photo'
    }
  }
});