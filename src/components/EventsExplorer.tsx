'use client';

import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  MapPin,
  Clock,
  Download,
  ChevronLeft,
  ChevronRight,
  Radio
} from 'lucide-react';
import { downloadIcsFile } from '@/lib/calendar';

export interface ChurchEventItem {
  _id: string;
  titleEn: string;
  titleDe?: string;
  category?: string;
  startDateTime: string;
  endDateTime: string;
  recurrenceNoteEn?: string;
  recurrenceNoteDe?: string;
  locationName?: string;
  address?: string;
  isOnline?: boolean;
  descriptionEn?: string;
  descriptionDe?: string;
}

export default function EventsExplorer({
  events,
  locale
}: {
  events: ChurchEventItem[];
  locale: string;
}) {
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const categories = ['All', 'Sunday Worship', 'Prayer & Midweek', 'Conference', 'Community'];

  const filteredEvents = useMemo(() => {
    return events.filter(
      (ev) => selectedCategory === 'All' || ev.category === selectedCategory
    );
  }, [events, selectedCategory]);

  // Month Grid Calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

  const calendarCells = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [firstDayOfWeek, daysInMonth]);

  const getEventsForDay = (day: number) => {
    return filteredEvents.filter((ev) => {
      const d = new Date(ev.startDateTime);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Weekly Services Highlight Strip */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            titleEn: 'Sunday Worship Service',
            titleDe: 'Sonntagsgottesdienst',
            timeEn: 'Every Sunday • 1:00 PM CET',
            timeDe: 'Jeden Sonntag • 13:00 Uhr MEZ',
            place: 'Gütersloh & YouTube Live'
          },
          {
            titleEn: 'Inspiration & Therapy',
            titleDe: 'Inspiration & Therapie',
            timeEn: 'Midweek Gathering',
            timeDe: 'Wochenmitte-Treffen',
            place: 'God Movement Full Gospel Church'
          },
          {
            titleEn: 'Breakthrough & Solution Hour',
            titleDe: 'Durchbruchs- & Gebetsstunde',
            timeEn: 'Weekly Prayer Service',
            timeDe: 'Wöchentlicher Gebetsgottesdienst',
            place: 'Gütersloh & Online'
          }
        ].map((weekly) => (
          <div
            key={weekly.titleEn}
            className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5"
          >
            <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">
              {locale === 'de' ? 'Regelmäßiger Gottesdienst' : 'Weekly Gathering'}
            </span>
            <h3 className="mt-1 text-base font-bold text-slate-900">
              {locale === 'de' ? weekly.titleDe : weekly.titleEn}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-700">
              {locale === 'de' ? weekly.timeDe : weekly.timeEn}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{weekly.place}</p>
          </div>
        ))}
      </div>

      {/* Toolbar: Category Filter + View Toggle */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? (locale === 'de' ? 'Alle Termine' : 'All Events') : cat}
            </button>
          ))}
        </div>

        {/* List vs Month Grid Switch */}
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            {locale === 'de' ? 'Liste' : 'List'}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'month'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {locale === 'de' ? 'Kalender' : 'Calendar'}
          </button>
        </div>
      </div>

      {/* VIEW 1: LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
              <p className="text-sm text-slate-600">
                {locale === 'de'
                  ? 'Keine besonderen Veranstaltungen in dieser Kategorie. Füge Termine im Admin Studio (/studio) hinzu.'
                  : 'No special events scheduled in this category yet. Publish events in /studio to display them here.'}
              </p>
            </div>
          ) : (
            filteredEvents.map((ev) => {
              const title = locale === 'de' && ev.titleDe ? ev.titleDe : ev.titleEn;
              const desc =
                locale === 'de' && ev.descriptionDe
                  ? ev.descriptionDe
                  : ev.descriptionEn;
              const startDate = new Date(ev.startDateTime);

              return (
                <div
                  key={ev._id}
                  className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-5">
                    {/* Date Badge */}
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <span className="text-[11px] font-bold text-amber-400 uppercase">
                        {startDate.toLocaleDateString(
                          locale === 'de' ? 'de-DE' : 'en-US',
                          { month: 'short' }
                        )}
                      </span>
                      <span className="text-2xl font-extrabold leading-none">
                        {startDate.getDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {ev.category && (
                          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                            {ev.category}
                          </span>
                        )}
                        {ev.isOnline && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                            <Radio className="h-3 w-3" />
                            YouTube Live
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1.5 text-lg font-bold text-slate-900">
                        {title}
                      </h3>

                      {desc && (
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                          {desc}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-amber-600" />
                          {startDate.toLocaleTimeString(
                            locale === 'de' ? 'de-DE' : 'en-US',
                            { hour: '2-digit', minute: '2-digit' }
                          )}
                        </span>
                        {ev.locationName && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-amber-600" />
                            {ev.locationName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Calendar (.ics) Button */}
                  <button
                    type="button"
                    onClick={() =>
                      downloadIcsFile({
                        title,
                        description: desc,
                        location: `${ev.locationName || ''} ${ev.address || ''}`.trim(),
                        startDateTime: ev.startDateTime,
                        endDateTime: ev.endDateTime
                      })
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {locale === 'de' ? 'Zum Kalender (.ics)' : 'Add to Calendar'}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: MONTHLY CALENDAR GRID */}
      {viewMode === 'month' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          {/* Month Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">
              {currentMonth.toLocaleDateString(
                locale === 'de' ? 'de-DE' : 'en-US',
                { month: 'long', year: 'numeric' }
              )}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-700 hover:bg-slate-100"
                aria-label="Previous Month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-700 hover:bg-slate-100"
                aria-label="Next Month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100 text-center text-xs font-semibold text-slate-600">
            {(locale === 'de'
              ? ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
              : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            ).map((dayName) => (
              <div key={dayName} className="py-2.5">
                {dayName}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7">
            {calendarCells.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const isSunday = idx % 7 === 0 && day !== null;

              return (
                <div
                  key={idx}
                  className={`min-h-28 border-r border-b border-slate-100 p-2 ${
                    day ? 'bg-white' : 'bg-slate-50/60'
                  }`}
                >
                  {day && (
                    <>
                      <span className="text-xs font-semibold text-slate-700">
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {isSunday && dayEvents.length === 0 && (
                          <div className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                            13:00 Worship
                          </div>
                        )}
                        {dayEvents.map((ev) => (
                          <button
                            key={ev._id}
                            type="button"
                            onClick={() =>
                              downloadIcsFile({
                                title:
                                  locale === 'de' && ev.titleDe
                                    ? ev.titleDe
                                    : ev.titleEn,
                                description: ev.descriptionEn,
                                location: ev.locationName,
                                startDateTime: ev.startDateTime,
                                endDateTime: ev.endDateTime
                              })
                            }
                            title="Click to download .ics calendar invite"
                            className="block w-full truncate rounded bg-amber-600 px-1.5 py-0.5 text-left text-[10px] font-semibold text-white hover:bg-amber-700"
                          >
                            {locale === 'de' && ev.titleDe
                              ? ev.titleDe
                              : ev.titleEn}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}