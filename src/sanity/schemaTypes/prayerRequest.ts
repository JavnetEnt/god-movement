import { defineField, defineType } from 'sanity';

export const prayerRequestType = defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  fields: [
    defineField({
      name: 'approved',
      title: 'Approved for Public Wall?',
      type: 'boolean',
      description: 'Turn ON to display this prayer on the public Prayer Wall.',
      initialValue: false
    }),
    defineField({
      name: 'visibility',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Public (Show Name)', value: 'public' },
          { title: 'Anonymous', value: 'anonymous' },
          { title: 'Pastoral Team Only (Private)', value: 'private' }
        ]
      },
      initialValue: 'public'
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Healing & Health', value: 'Healing' },
          { title: 'Family & Marriage', value: 'Family' },
          { title: 'Provision & Breakthrough', value: 'Breakthrough' },
          { title: 'Spiritual Growth', value: 'Spiritual Growth' },
          { title: 'Thanksgiving', value: 'Thanksgiving' }
        ]
      },
      initialValue: 'Spiritual Growth'
    }),
    defineField({
      name: 'prayerText',
      title: 'Prayer Request',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'prayedCount',
      title: 'Prayed Count',
      type: 'number',
      initialValue: 1
    }),
    defineField({
      name: 'privateEmail',
      title: 'Private Email (Never Shown Publicly)',
      type: 'string'
    }),
    defineField({
      name: 'privatePhone',
      title: 'Private Phone (Never Shown Publicly)',
      type: 'string'
    }),
    defineField({
      name: 'notifyOnPrayer',
      title: 'Notify When Someone Prays?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      name: 'name',
      visibility: 'visibility',
      approved: 'approved',
      text: 'prayerText'
    },
    prepare({ name, visibility, approved, text }) {
      const status = approved ? '✅ LIVE' : '⏳ PENDING';
      const author = visibility === 'anonymous' ? 'Anonymous' : name || 'Member';
      return {
        title: `${status} • ${author}`,
        subtitle: text
      };
    }
  }
});