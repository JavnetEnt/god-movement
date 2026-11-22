'use client';

interface LiveStreamEmbedProps {
  videoId?: string;
}

export default function LiveStreamEmbed({ videoId }: LiveStreamEmbedProps) {
  const activeVideoId =
    videoId || process.env.NEXT_PUBLIC_FEATURED_YOUTUBE_ID || 'jO_RUFOIhDg';

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xl">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0`}
          title="God Movement FGC Live & Recent Services"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}