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

    // Action 1: Increment "I Prayed" counter
    if (body.action === 'pray' && body.id) {
      await writeClient
        .patch(body.id)
        .setIfMissing({ prayedCount: 0 })
        .inc({ prayedCount: 1 })
        .commit();

      return NextResponse.json({ ok: true });
    }

    // Action 2: Submit a new prayer request
    const { name, visibility, category, prayerText, email, phone, notifyOnPrayer } = body;

    if (!prayerText || prayerText.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please enter a valid prayer request.' },
        { status: 400 }
      );
    }

    await writeClient.create({
      _type: 'prayerRequest',
      approved: false, // Held in moderation queue until staff approves in /studio
      visibility: visibility || 'public',
      name: visibility === 'anonymous' ? '' : (name || '').trim(),
      category: category || 'Spiritual Growth',
      prayerText: prayerText.trim(),
      prayedCount: 1,
      privateEmail: (email || '').trim(),
      privatePhone: (phone || '').trim(),
      notifyOnPrayer: Boolean(notifyOnPrayer),
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Prayer API error:', err);
    return NextResponse.json(
      { error: 'Unable to process request right now.' },
      { status: 500 }
    );
  }
}