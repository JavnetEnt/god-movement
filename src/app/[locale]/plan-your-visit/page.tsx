import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Clock, MapPin, Languages, Smile, HelpCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function PlanYourVisitPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const faqs = [
    {
      qEn: 'What time should I arrive?',
      qDe: 'Wann sollte ich ankommen?',
      aEn: 'Our Sunday Worship Service starts promptly at 1:00 PM CET. Arriving 10–15 minutes early gives you time to find parking, get settled, and meet our hospitality team.',
      aDe: 'Unser Sonntagsgottesdienst beginnt pünktlich um 13:00 Uhr MEZ. Wenn du 10–15 Minuten früher kommst, hast du genug Zeit anzukommen und unser Begrüßungsteam kennenzulernen.'
    },
    {
      qEn: 'What languages are the services in?',
      qDe: 'In welcher Sprache finden die Gottesdienste statt?',
      aEn: 'Services are conducted in English with German hospitality and translation support available so both international and local German guests feel right at home.',
      aDe: 'Unsere Gottesdienste finden auf Englisch statt, mit herzlicher deutscher Gastfreundschaft und Übersetzungshilfe, sodass sich sowohl lokale als auch internationale Gäste zu Hause fühlen.'
    },
    {
      qEn: 'What should I wear?',
      qDe: 'Was soll ich anziehen?',
      aEn: 'Come as you are! You will see everything from smart casual to traditional African attire and Sunday best—there is no strict dress code.',
      aDe: 'Komm so, wie du bist! Bei uns findest du alles von entspannter Alltagskleidung bis hin zu festlicher oder traditioneller Kleidung – es gibt keine Kleiderordnung.'
    },
    {
      qEn: 'Are children welcome?',
      qDe: 'Sind Kinder willkommen?',
      aEn: 'Yes! Families and children of all ages are warmly welcomed at Resurrection Family Church.',
      aDe: 'Ja! Familien und Kinder jeden Alters sind in der Resurrection Family Church herzlich willkommen.'
    }
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Plane deinen Besuch' : 'Plan Your Visit'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Wir freuen uns darauf, dich diesen Sonntag in der Resurrection Family Church in Gütersloh willkommen zu heißen.'
              : 'We would love to welcome you this Sunday at Resurrection Family Church in Gütersloh.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* 4 Key Info Highlights */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Clock,
              titleEn: 'Sunday Service',
              titleDe: 'Sonntagsgottesdienst',
              bodyEn: 'Every Sunday at 1:00 PM CET',
              bodyDe: 'Jeden Sonntag um 13:00 Uhr MEZ'
            },
            {
              icon: MapPin,
              titleEn: 'Location',
              titleDe: 'Standort',
              bodyEn: '33335 Gütersloh, Germany',
              bodyDe: '33335 Gütersloh, Deutschland'
            },
            {
              icon: Languages,
              titleEn: 'Bilingual Welcome',
              titleDe: 'Zweisprachig',
              bodyEn: 'English & German Community',
              bodyDe: 'Englisch & Deutsch'
            },
            {
              icon: Smile,
              titleEn: 'Warm Atmosphere',
              titleDe: 'Herzliche Gemeinschaft',
              bodyEn: 'Vibrant worship, prayer & biblical teaching',
              bodyDe: 'Lebendiger Lobpreis, Gebet & biblische Lehre'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titleEn}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-3 text-base font-bold text-slate-900">
                  {locale === 'de' ? item.titleDe : item.titleEn}
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  {locale === 'de' ? item.bodyDe : item.bodyEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-Column: FAQs + Visitor Registration Form */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: First-Time Visitor FAQs */}
          <div className="space-y-6 lg:col-span-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-amber-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                {locale === 'de' ? 'Was dich erwartet (FAQ)' : 'What to Expect (FAQ)'}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.qEn}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <h3 className="text-base font-bold text-slate-900">
                    {locale === 'de' ? faq.qDe : faq.qEn}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {locale === 'de' ? faq.aDe : faq.aEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Let Us Know You're Coming Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                {locale === 'de'
                  ? 'Sag uns, dass du kommst'
                  : 'Let Us Know You’re Coming'}
              </h2>
              <p className="mt-1 mb-6 text-sm text-slate-600">
                {locale === 'de'
                  ? 'Melde deinen Besuch kurz an, damit unser Team dich persönlich begrüßen kann.'
                  : 'Fill out this quick form so our welcome team can greet you and answer any questions.'}
              </p>
              <InquiryForm locale={locale} defaultType="visit" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}