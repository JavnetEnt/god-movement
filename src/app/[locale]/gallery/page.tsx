import { setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/client';
import GalleryExplorer, {
  type GalleryAlbumItem
} from '@/components/GalleryExplorer';

const GALLERY_QUERY = `*[_type == "galleryAlbum"] | order(eventDate desc) {
  _id,
  titleEn,
  titleDe,
  eventDate,
  descriptionEn,
  descriptionDe,
  "photos": photos[]{
    _key,
    "url": asset->url,
    captionEn,
    captionDe
  }
}`;

export default async function GalleryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let albums: GalleryAlbumItem[] = [];
  try {
    albums = await client.fetch<GalleryAlbumItem[]>(GALLERY_QUERY);
  } catch (error) {
    console.error('Sanity gallery fetch error:', error);
  }

  return (
    <main>
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Bildergalerie' : 'Photo Gallery'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Momente aus unseren Gottesdiensten, Konferenzen und der Gemeinschaft in Gütersloh.'
              : 'Moments from worship services, conferences, and fellowship in Gütersloh.'}
          </p>
        </div>
      </section>

      <GalleryExplorer albums={albums} locale={locale} />
    </main>
  );
}