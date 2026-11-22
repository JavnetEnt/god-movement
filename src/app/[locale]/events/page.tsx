import { setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/client';
import EventsExplorer, { type ChurchEventItem } from '@/components/EventsExplorer';

const EVENTS_QUERY = `*[_type == "event"] | order(startDateTime asc) {
  _id,
  titleEn,
  titleDe,
  category,
  startDateTime,
  endDateTime,
  recurrenceNoteEn,
  recurrenceNoteDe,
  locationName,
  address,
  isOnline,
  descriptionEn,
  descriptionDe
}`;

export default async function EventsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let events: ChurchEventItem[] = [];
  try {
    events = await client.fetch<ChurchEventItem[]>(EVENTS_QUERY);
  } catch (error) {
    console.error('Sanity events fetch error:', error);
  }

  return (
    <main>
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Veranstaltungen & Kalender' : 'Events & Calendar'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Gottesdienste, Gebetsabende und besondere Konferenzen in Gütersloh und online.'
              : 'Worship services, prayer gatherings, and special conferences in Gütersloh and online.'}
          </p>
        </div>
      </section>

      <EventsExplorer events={events} locale={locale} />
    </main>
  );
}