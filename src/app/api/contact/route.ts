import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-22',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Silent honeypot spam check
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const {
      inquiryType,
      fullName,
      email,
      phone,
      plannedVisitDate,
      guestsCount,
      message
    } = body;

    if (!fullName || !email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide your name and a valid email address.' },
        { status: 400 }
      );
    }

    await writeClient.create({
      _type: 'contactSubmission',
      inquiryType: inquiryType || 'general',
      fullName: fullName.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      plannedVisitDate: plannedVisitDate || undefined,
      guestsCount: guestsCount || undefined,
      message: (message || '').trim(),
      status: 'new',
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Unable to send message right now. Please try again.' },
      { status: 500 }
    );
  }
}