import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { MapPin, Mail, Clock, ExternalLink } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export default function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de' ? 'Kontakt' : 'Contact Us'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Hast du eine Frage, ein Seelsorgeanliegen oder eine Einladung? Schreib uns gerne.'
              : 'Have a question, pastoral care request, or ministry inquiry? Reach out to our team.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Office Details & Map Card */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900">
                God Movement e.V.
              </h2>
              <p className="text-xs font-medium text-amber-600">
                Resurrection Family Church
              </p>

              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <strong className="block text-slate-900">
                      {locale === 'de' ? 'Adresse' : 'Address'}
                    </strong>
                    <span>[Street & House Number]</span>
                    <span className="block">33330 Gütersloh, Germany</span>
                    <a
                      href="https://maps.google.com/?q=33330+Gutersloh+Germany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      <span>
                        {locale === 'de'
                          ? 'In Google Maps öffnen'
                          : 'Open in Google Maps'}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <strong className="block text-slate-900">E-Mail</strong>
                    <a
                      href="mailto:info@godmovement.tv"
                      className="text-slate-700 hover:text-amber-600"
                    >
                      info@godmovement.tv
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <strong className="block text-slate-900">
                      {locale === 'de' ? 'Gottesdienstzeit' : 'Service Time'}
                    </strong>
                    <span>
                      {locale === 'de'
                        ? 'Sonntags um 13:00 Uhr MEZ'
                        : 'Sundays at 1:00 PM CET'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-slate-900">
                {locale === 'de' ? 'Nachricht senden' : 'Send Us a Message'}
              </h2>
              <InquiryForm locale={locale} defaultType="general" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}