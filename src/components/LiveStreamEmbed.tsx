'use client';

import { useTranslations } from 'next-intl';
import { Tv } from 'lucide-react';

interface LiveStreamEmbedProps {
  channelId?: string;
  fallbackVideoId?: string;
}

export default function LiveStreamEmbed({
  channelId = 'UC_REPLACE_WITH_CHANNEL_ID',
  fallbackVideoId
}: LiveStreamEmbedProps) {
  const t = useTranslations('Home');

  const embedSrc = fallbackVideoId
    ? `https://www.youtube-nocookie.com/embed/${fallbackVideoId}`
    : `https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}`;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold text-amber-800">
          <Tv className="h-3.5 w-3.5" />
          <span>YouTube Live</span>
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t('watchLiveTitle')}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-base text-slate-600">
          {t('watchLiveSub')}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedSrc}
            title="God Movement Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}