import { setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/client';
import PrayerWallClient, {
  type PublicPrayerItem
} from '@/components/PrayerWallClient';

const APPROVED_PRAYERS_QUERY = `*[_type == "prayerRequest" && approved == true && visibility != "private"] | order(submittedAt desc) {
  _id,
  visibility,
  name,
  category,
  prayerText,
  prayedCount,
  submittedAt
}`;

export default async function PrayerWallPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let prayers: PublicPrayerItem[] = [];
  try {
    prayers = await client.fetch<PublicPrayerItem[]>(APPROVED_PRAYERS_QUERY);
  } catch (error) {
    console.error('Sanity prayers fetch error:', error);
  }

  return (
    <main>
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Gebetswand' : 'Prayer Wall'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? '„Bittet, so wird euch gegeben“ – Teile dein Anliegen und bete für andere.'
              : '“Bear one another’s burdens” — Share a request and stand in prayer together.'}
          </p>
        </div>
      </section>

      <PrayerWallClient initialPrayers={prayers} locale={locale} />
    </main>
  );
}