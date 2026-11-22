import { setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/client';
import SermonArchive, { type SermonItem } from '@/components/SermonArchive';

const SERMONS_QUERY = `*[_type == "sermon"] | order(preachedAt desc) {
  _id,
  titleEn,
  titleDe,
  "slug": slug.current,
  preachedAt,
  speaker,
  series,
  topics,
  youtubeUrl,
  summaryEn,
  summaryDe,
  "pdfUrl": studyNotesPdf.asset->url
}`;

export default async function SermonsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let sermons: SermonItem[] = [];
  try {
    sermons = await client.fetch<SermonItem[]>(SERMONS_QUERY);
  } catch (error) {
    console.error('Sanity fetch error:', error);
  }

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Predigtarchiv' : 'Sermon Archive'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Gottes Wort hören, ansehen und vertiefen – überall und jederzeit.'
              : 'Watch messages, search by topic or speaker, and download study notes.'}
          </p>
        </div>
      </section>

      <SermonArchive sermons={sermons} locale={locale} />
    </main>
  );
}