'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Maximize2
} from 'lucide-react';

export interface GalleryPhoto {
  _key: string;
  url: string;
  captionEn?: string;
  captionDe?: string;
}

export interface GalleryAlbumItem {
  _id: string;
  titleEn: string;
  titleDe?: string;
  eventDate?: string;
  descriptionEn?: string;
  descriptionDe?: string;
  photos: GalleryPhoto[];
}

interface FlatPhoto extends GalleryPhoto {
  albumId: string;
  albumTitle: string;
  eventDate?: string;
}

export default function GalleryExplorer({
  albums,
  locale
}: {
  albums: GalleryAlbumItem[];
  locale: string;
}) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten photos with their parent album metadata for seamless filtering & lightbox stepping
  const allPhotos = useMemo<FlatPhoto[]>(() => {
    const list: FlatPhoto[] = [];
    albums.forEach((album) => {
      const albumTitle =
        locale === 'de' && album.titleDe ? album.titleDe : album.titleEn;
      (album.photos || []).forEach((photo) => {
        if (photo.url) {
          list.push({
            ...photo,
            albumId: album._id,
            albumTitle,
            eventDate: album.eventDate
          });
        }
      });
    });
    return list;
  }, [albums, locale]);

  const visiblePhotos = useMemo(() => {
    if (selectedAlbumId === 'all') return allPhotos;
    return allPhotos.filter((p) => p.albumId === selectedAlbumId);
  }, [allPhotos, selectedAlbumId]);

  const activeAlbum = albums.find((a) => a._id === selectedAlbumId);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || visiblePhotos.length === 0) return null;
      return (prev + 1) % visiblePhotos.length;
    });
  }, [visiblePhotos.length]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || visiblePhotos.length === 0) return null;
      return (prev - 1 + visiblePhotos.length) % visiblePhotos.length;
    });
  }, [visiblePhotos.length]);

  // Keyboard support for Lightbox (Escape, Left/Right arrows)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  const activeLightboxPhoto =
    lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Album Filter Tabs */}
      {albums.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedAlbumId('all')}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
              selectedAlbumId === 'all'
                ? 'bg-amber-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Images className="h-3.5 w-3.5" />
            <span>
              {locale === 'de' ? 'Alle Alben' : 'All Albums'} ({allPhotos.length})
            </span>
          </button>

          {albums.map((album) => {
            const title =
              locale === 'de' && album.titleDe ? album.titleDe : album.titleEn;
            const count = album.photos?.length || 0;
            return (
              <button
                key={album._id}
                type="button"
                onClick={() => setSelectedAlbumId(album._id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedAlbumId === album._id
                    ? 'bg-amber-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {title} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Album Header Banner */}
      {activeAlbum && (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              {locale === 'de' && activeAlbum.titleDe
                ? activeAlbum.titleDe
                : activeAlbum.titleEn}
            </h2>
            {activeAlbum.eventDate && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-amber-600" />
                {new Date(activeAlbum.eventDate).toLocaleDateString(
                  locale === 'de' ? 'de-DE' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            )}
          </div>
          {(activeAlbum.descriptionEn || activeAlbum.descriptionDe) && (
            <p className="mt-2 text-sm text-slate-600">
              {locale === 'de' && activeAlbum.descriptionDe
                ? activeAlbum.descriptionDe
                : activeAlbum.descriptionEn}
            </p>
          )}
        </div>
      )}

      {/* Empty State or Photo Grid */}
      {visiblePhotos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <Images className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-900">
            {locale === 'de' ? 'Noch keine Fotoalben vorhanden' : 'No Photo Albums Yet'}
          </h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
            {locale === 'de'
              ? 'Erstelle im Admin Studio ein Album und lade Fotos per Drag & Drop hoch.'
              : 'Create an album and drag-and-drop church photos.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visiblePhotos.map((photo, index) => {
            const caption =
              locale === 'de' && photo.captionDe
                ? photo.captionDe
                : photo.captionEn || photo.albumTitle;

            return (
              <button
                key={`${photo.albumId}-${photo._key || index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-left shadow-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              >
                <img
                  src={`${photo.url}?w=800&auto=format`}
                  alt={caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition duration-200 group-hover:opacity-100">
                  <div className="self-end rounded-full bg-black/50 p-1.5 text-white">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
                      {photo.albumTitle}
                    </span>
                    {caption !== photo.albumTitle && (
                      <p className="mt-0.5 line-clamp-1 text-xs font-medium text-white">
                        {caption}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {visiblePhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Photo"
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Main Image & Caption */}
          <div
            className="flex max-h-[88vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${activeLightboxPhoto.url}?w=1600&auto=format`}
              alt={activeLightboxPhoto.captionEn || activeLightboxPhoto.albumTitle}
              className="max-h-[76vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <p className="text-sm font-semibold">
                {locale === 'de' && activeLightboxPhoto.captionDe
                  ? activeLightboxPhoto.captionDe
                  : activeLightboxPhoto.captionEn ||
                    activeLightboxPhoto.albumTitle}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {activeLightboxPhoto.albumTitle} • {lightboxIndex + 1} /{' '}
                {visiblePhotos.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          {visiblePhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Photo"
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}