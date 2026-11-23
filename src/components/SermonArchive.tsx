'use client';

import { useState, useMemo } from 'react';
import { Search, Play, FileText, User, Calendar, Tag } from 'lucide-react';
import { extractYouTubeId } from '@/lib/youtube';

export interface SermonItem {
  _id: string;
  titleEn: string;
  titleDe?: string;
  slug: string;
  preachedAt: string;
  speaker: string;
  series?: string;
  topics?: string[];
  youtubeUrl: string;
  summaryEn?: string;
  summaryDe?: string;
  pdfUrl?: string;
}

export default function SermonArchive({
  sermons,
  locale
}: {
  sermons: SermonItem[];
  locale: string;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    sermons[0] ? extractYouTubeId(sermons[0].youtubeUrl) : null
  );
  const [activeSermonTitle, setActiveSermonTitle] = useState<string>(
    sermons[0]
      ? locale === 'de' && sermons[0].titleDe
        ? sermons[0].titleDe
        : sermons[0].titleEn
      : ''
  );

  // Dynamically derive unique topics and speakers from actual published sermons
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    sermons.forEach((s) => s.topics?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [sermons]);

  const allSpeakers = useMemo(() => {
    const set = new Set<string>();
    sermons.forEach((s) => {
      if (s.speaker) set.add(s.speaker);
    });
    return ['All', ...Array.from(set)];
  }, [sermons]);

  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const title =
        locale === 'de' && sermon.titleDe ? sermon.titleDe : sermon.titleEn;
      const summary =
        locale === 'de' && sermon.summaryDe
          ? sermon.summaryDe
          : sermon.summaryEn || '';

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic =
        selectedTopic === 'All' || sermon.topics?.includes(selectedTopic);

      const matchesSpeaker =
        selectedSpeaker === 'All' || sermon.speaker === selectedSpeaker;

      return matchesSearch && matchesTopic && matchesSpeaker;
    });
  }, [sermons, searchQuery, selectedTopic, selectedSpeaker, locale]);

  const handleWatch = (sermon: SermonItem) => {
    const id = extractYouTubeId(sermon.youtubeUrl);
    if (id) {
      setActiveVideoId(id);
      setActiveSermonTitle(
        locale === 'de' && sermon.titleDe ? sermon.titleDe : sermon.titleEn
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Featured / Active Video Player */}
      {activeVideoId && (
        <div className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0`}
              title={activeSermonTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 px-6 py-4 text-white">
            <div>
              <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                {locale === 'de' ? 'Aktuelle Wiedergabe' : 'Now Watching'}
              </span>
              <h2 className="text-lg font-bold sm:text-xl">{activeSermonTitle}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'de'
                  ? 'Predigten nach Titel, Thema oder Prediger durchsuchen...'
                  : 'Search sermons by title, keyword, or speaker...'
              }
              className="w-full rounded-xl border border-slate-300 py-2.5 pr-4 pl-10 text-sm text-slate-900 focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Speaker Filter */}
          <div>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              aria-label="Filter by speaker"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-hidden"
            >
              {allSpeakers.map((speaker) => (
                <option key={speaker} value={speaker}>
                  {speaker === 'All'
                    ? locale === 'de'
                      ? 'Alle Prediger'
                      : 'All Speakers'
                    : speaker}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {allTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                selectedTopic === topic
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {topic === 'All' ? (locale === 'de' ? 'Alle Themen' : 'All Topics') : topic}
            </button>
          ))}
        </div>
      </div>

      {/* Sermon Cards Grid */}
      {filteredSermons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-base font-medium text-slate-600">
            {locale === 'de'
              ? 'Keine Predigten gefunden. Bitte Suchfilter anpassen oder im Studio veröffentlichen.'
              : 'No sermons match your filters yet. Try clearing filters or publish a sermon in studio.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSermons.map((sermon) => {
            const videoId = extractYouTubeId(sermon.youtubeUrl);
            const thumbnailUrl = videoId
              ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              : null;
            const displayTitle =
              locale === 'de' && sermon.titleDe ? sermon.titleDe : sermon.titleEn;
            const displaySummary =
              locale === 'de' && sermon.summaryDe
                ? sermon.summaryDe
                : sermon.summaryEn;

            return (
              <article
                key={sermon._id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md"
              >
                <div>
                  {/* Auto-fetched YouTube Thumbnail */}
                  <button
                    type="button"
                    onClick={() => handleWatch(sermon)}
                    className="group relative block aspect-video w-full overflow-hidden bg-slate-900"
                  >
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt={displayTitle}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/20">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg transition group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </div>
                  </button>

                  <div className="p-5">
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-amber-600" />
                        {new Date(sermon.preachedAt).toLocaleDateString(
                          locale === 'de' ? 'de-DE' : 'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-amber-600" />
                        {sermon.speaker}
                      </span>
                    </div>

                    <h3 className="mt-2.5 text-lg font-bold text-slate-900">
                      {displayTitle}
                    </h3>

                    {displaySummary && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {displaySummary}
                      </p>
                    )}

                    {/* Topic Tags */}
                    {sermon.topics && sermon.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {sermon.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5">
                  <button
                    type="button"
                    onClick={() => handleWatch(sermon)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {locale === 'de' ? 'Video ansehen' : 'Watch Video'}
                  </button>

                  {sermon.pdfUrl && (
                    <a
                      href={sermon.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {locale === 'de' ? 'Notizen (PDF)' : 'Study Notes'}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}