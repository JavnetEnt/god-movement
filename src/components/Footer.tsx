import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Clock, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Ministry Identity */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="God Movement e.V. Logo"
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold text-white">God Movement e.V.</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {t('aboutText')}
            </p>
          </div>
          {/* Column 2: Location & Service Times */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {t('serviceTimesTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>{t('sundayService')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Avenwedde Bahnhof, Isselhorster Straße 248, 33335 Gütersloh, Germany</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <a href="mailto:info@godmovement.tv" className="hover:text-white">
                  info@godmovement.tv
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/sermons" className="hover:text-amber-400">
                  {nav('sermons')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400">
                  {nav('events')}
                </Link>
              </li>
              <li>
                <Link href="/prayer-wall" className="hover:text-amber-400">
                  {nav('prayerWall')}
                </Link>
              </li>
              <li>
                <Link href="/plan-your-visit" className="hover:text-amber-400">
                  {nav('planVisit')}
                </Link>
              </li>
              <li>
                <Link href="/give" className="hover:text-amber-400">
                  {nav('give')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: German e.V. Legal Compliance */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {t('legalTitle')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-amber-400">
                  {t('impressum')}
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-amber-400">
                  {t('datenschutz')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {currentYear} God Movement e.V. — Full Gospel Church. {t('rights')}
        </div>
      </div>
    </footer>
  );
}