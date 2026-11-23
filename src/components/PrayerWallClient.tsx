'use client';

import { useState } from 'react';
import {
  HeartHandshake,
  Send,
  Lock,
  CheckCircle2,
  Sparkles,
  User,
  EyeOff
} from 'lucide-react';

export interface PublicPrayerItem {
  _id: string;
  visibility: 'public' | 'anonymous';
  name?: string;
  category?: string;
  prayerText: string;
  prayedCount: number;
  submittedAt: string;
}

export default function PrayerWallClient({
  initialPrayers,
  locale
}: {
  initialPrayers: PublicPrayerItem[];
  locale: string;
}) {
  const [prayers, setPrayers] = useState<PublicPrayerItem[]>(initialPrayers);
  const [prayedIds, setPrayedIds] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form state
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'anonymous' | 'private'>('public');
  const [category, setCategory] = useState('Spiritual Growth');
  const [prayerText, setPrayerText] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifyOnPrayer, setNotifyOnPrayer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'All',
    'Healing',
    'Family',
    'Breakthrough',
    'Spiritual Growth',
    'Thanksgiving'
  ];

  const handlePrayClick = async (id: string) => {
    if (prayedIds[id]) return;

    setPrayedIds((prev) => ({ ...prev, [id]: true }));
    setPrayers((prev) =>
      prev.map((p) => (p._id === id ? { ...p, prayedCount: (p.prayedCount || 0) + 1 } : p))
    );

    await fetch('/api/prayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pray', id })
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          visibility,
          category,
          prayerText,
          email,
          phone,
          notifyOnPrayer
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
      setPrayerText('');
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Could not submit prayer request.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPrayers = prayers.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* LEFT COLUMN (5 cols): Submit Prayer Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {locale === 'de' ? 'Gebetsanliegen teilen' : 'Share a Prayer Request'}
                </h2>
                <p className="text-xs text-slate-500">
                  {locale === 'de'
                    ? 'Unser Gebetsteam und die Gemeinde beten mit dir.'
                    : 'Our pastoral team and church family stand with you in faith.'}
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h3 className="mt-3 text-base font-bold text-emerald-950">
                  {locale === 'de' ? 'Gebetsanliegen eingegangen' : 'Prayer Request Received'}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-emerald-800">
                  {visibility === 'private'
                    ? locale === 'de'
                      ? 'Dein Anliegen wurde vertraulich an unser Seelsorgeteam gesendet.'
                      : 'Your request has been sent privately to our pastoral prayer team.'
                    : locale === 'de'
                    ? 'Vielen Dank. Nach kurzer Prüfung erscheint dein Gebet auf der Gebetswand.'
                    : 'Thank you. After brief moderation, your prayer will appear on the public wall.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  {locale === 'de' ? 'Weiteres Gebet senden' : 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Visibility Choice */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    {locale === 'de' ? 'Sichtbarkeit' : 'Sharing Preference'}
                  </label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {[
                      { id: 'public', labelEn: 'Public', labelDe: 'Öffentlich', icon: User },
                      { id: 'anonymous', labelEn: 'Anonymous', labelDe: 'Anonym', icon: EyeOff },
                      { id: 'private', labelEn: 'Pastors Only', labelDe: 'Vertraulich', icon: Lock }
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setVisibility(opt.id as 'public' | 'anonymous' | 'private')
                          }
                          className={`flex flex-col items-center gap-1 rounded-xl border py-2.5 text-xs font-semibold transition ${
                            visibility === opt.id
                              ? 'border-amber-600 bg-amber-50 text-amber-800'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{locale === 'de' ? opt.labelDe : opt.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name (hidden when Anonymous) */}
                {visibility !== 'anonymous' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      {locale === 'de' ? 'Dein Name' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required={visibility === 'public'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={locale === 'de' ? 'Vorname oder voller Name' : 'First name or full name'}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    {locale === 'de' ? 'Kategorie' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="Spiritual Growth">Spiritual Growth</option>
                    <option value="Healing">Healing & Health</option>
                    <option value="Family">Family & Marriage</option>
                    <option value="Breakthrough">Provision & Breakthrough</option>
                    <option value="Thanksgiving">Thanksgiving</option>
                  </select>
                </div>

                {/* Prayer Text */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    {locale === 'de' ? 'Dein Gebetsanliegen' : 'Your Prayer Request'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder={
                      locale === 'de'
                        ? 'Wie dürfen wir für dich beten?'
                        : 'How can our church family pray for you today?'
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                {/* Privacy-Safe Optional Contact Details */}
                <div className="rounded-xl bg-slate-50 p-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <Lock className="h-3 w-3 text-emerald-600" />
                    <span>
                      {locale === 'de'
                        ? 'Optionale Kontaktdaten (niemals öffentlich sichtbar)'
                        : 'Optional Contact Info (Never Displayed Publicly)'}
                    </span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional)"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={locale === 'de' ? 'Telefon (optional)' : 'Phone (optional)'}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>
                  <label className="mt-2.5 flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={notifyOnPrayer}
                      onChange={(e) => setNotifyOnPrayer(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>
                      {locale === 'de'
                        ? 'Benachrichtige mich, wenn jemand für mich betet'
                        : 'Email me when someone prays for my request'}
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-xs font-medium text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-700 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting
                    ? locale === 'de'
                      ? 'Wird gesendet...'
                      : 'Submitting...'
                    : locale === 'de'
                    ? 'Gebet einreichen'
                    : 'Submit Prayer Request'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols): Approved Public Prayer Feed */}
        <div className="lg:col-span-7">
          {/* Category Filter Pills */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'All' ? (locale === 'de' ? 'Alle Anliegen' : 'All Prayers') : cat}
              </button>
            ))}
          </div>

          {filteredPrayers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-amber-500" />
              <p className="mt-3 text-sm font-medium text-slate-700">
                {locale === 'de'
                  ? 'Noch keine freigegebenen Gebetsanliegen in dieser Kategorie. Sei der Erste!'
                  : 'No approved prayer requests in this category yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrayers.map((prayer) => {
                const hasPrayed = Boolean(prayedIds[prayer._id]);
                const authorLabel =
                  prayer.visibility === 'anonymous'
                    ? locale === 'de'
                      ? 'Anonym'
                      : 'Anonymous'
                    : prayer.name || 'Church Member';

                return (
                  <article
                    key={prayer._id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {authorLabel}
                        </span>
                        {prayer.category && (
                          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                            {prayer.category}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(prayer.submittedAt).toLocaleDateString(
                          locale === 'de' ? 'de-DE' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {prayer.prayerText}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                      <button
                        type="button"
                        onClick={() => handlePrayClick(prayer._id)}
                        disabled={hasPrayed}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                          hasPrayed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-600 text-white hover:bg-amber-700'
                        }`}
                      >
                        <HeartHandshake className="h-3.5 w-3.5" />
                        <span>
                          {hasPrayed
                            ? locale === 'de'
                              ? 'Gebetet'
                              : 'Prayed'
                            : locale === 'de'
                            ? 'Ich habe gebetet'
                            : 'I Prayed'}
                        </span>
                      </button>

                      <span className="text-xs font-medium text-slate-500">
                        {prayer.prayedCount || 1}{' '}
                        {locale === 'de' ? 'Gebete' : 'prayers offered'}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}