import { defineField, defineType } from 'sanity';

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact & Visit Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'Plan a Sunday Visit', value: 'visit' },
          { title: 'General Question / Contact', value: 'general' },
          { title: 'Pastoral Care / Counseling', value: 'pastoral' },
          { title: 'Speaker / Ministry Invitation', value: 'invitation' }
        ]
      },
      initialValue: 'general'
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp (Optional)',
      type: 'string'
    }),
    defineField({
      name: 'plannedVisitDate',
      title: 'Planned Visit Date (if applicable)',
      type: 'date'
    }),
    defineField({
      name: 'guestsCount',
      title: 'Number of Guests / Family Size',
      type: 'string'
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Replied', value: 'replied' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'new'
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
      name: 'fullName',
      type: 'inquiryType',
      status: 'status',
      date: 'submittedAt'
    },
    prepare({ name, type, status, date }) {
      const tag = status === 'new' ? '🆕' : '✓';
      const formatted = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: `${tag} ${name} (${type || 'general'})`,
        subtitle: formatted
      };
    }
  }
});