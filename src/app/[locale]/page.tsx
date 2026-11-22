import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  MapPin,
  HeartHandshake,
  PlayCircle,
  Users,
  ArrowRight,
  Calendar
} from 'lucide-react';
import ServiceCountdown from '@/components/ServiceCountdown';
import LiveStreamEmbed from '@/components/LiveStreamEmbed';

export default function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const hero = useTranslations('Hero');
  const home = useTranslations('Home');

  // ... keep the rest of HomePage exactly the same!
  const quickCards = [
    {
      title: home('cardVisitTitle'),
      description: home('cardVisitDesc'),
      href: '/plan-your-visit',
      icon: MapPin,
      accent: 'bg-amber-100 text-amber-700'
    },
    {
      title: home('cardPrayerTitle'),
      description: home('cardPrayerDesc'),
      href: '/prayer-wall',
      icon: HeartHandshake,
      accent: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: home('cardSermonsTitle'),
      description: home('cardSermonsDesc'),
      href: '/sermons',
      icon: PlayCircle,
      accent: 'bg-blue-100 text-blue-700'
    },
    {
      title: home('cardLeadershipTitle'),
      description: home('cardLeadershipDesc'),
      href: '/leadership',
      icon: Users,
      accent: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Subtle warm radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,119,6,0.28),transparent_65%)]"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
            <Calendar className="h-3.5 w-3.5" />
            {home('liveBadge')}
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {hero('title')}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {hero('subtitle')}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/plan-your-visit"
              className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-500"
            >
              {hero('ctaPrimary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" />
              {hero('ctaSecondary')}
            </Link>
          </div>

          {/* Real-Time Sunday Service Countdown */}
          <div className="mt-12">
            <ServiceCountdown />
          </div>
        </div>
      </section>

      {/* 2. QUICK-ACCESS CARDS */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {home('quickAccessTitle')}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
              >
                <div>
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${card.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-amber-600">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-amber-600">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. YOUTUBE LIVE STREAM EMBED */}
      <LiveStreamEmbed />

      {/* 4. ABOUT GOD MOVEMENT e.V. SUMMARY */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {home('aboutHeading')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {home('aboutBody')}
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-amber-500 hover:bg-amber-50"
            >
              {home('aboutCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}