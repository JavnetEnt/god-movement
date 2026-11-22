import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import GivingClient from '@/components/GivingClient';

export default function GivePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('Giving');

  return (
    <main>
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      <GivingClient locale={locale} />
    </main>
  );
}