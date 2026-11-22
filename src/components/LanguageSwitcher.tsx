'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = (nextLocale: 'en' | 'de') => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
      <Globe className="ml-1.5 h-3.5 w-3.5 text-slate-500" />
      <button
        type="button"
        onClick={() => toggleLocale('en')}
        className={`rounded-full px-2 py-0.5 transition ${
          locale === 'en'
            ? 'bg-white text-slate-900 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => toggleLocale('de')}
        className={`rounded-full px-2 py-0.5 transition ${
          locale === 'de'
            ? 'bg-white text-slate-900 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </button>
    </div>
  );
}