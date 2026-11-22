'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Shield } from 'lucide-react';

interface InquiryFormProps {
  locale: string;
  defaultType?: 'visit' | 'general' | 'pastoral' | 'invitation';
}

export default function InquiryForm({
  locale,
  defaultType = 'general'
}: InquiryFormProps) {
  const [inquiryType, setInquiryType] = useState(defaultType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plannedVisitDate, setPlannedVisitDate] = useState('');
  const [guestsCount, setGuestsCount] = useState('1');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field
  const [gdprConsent, setGdprConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!gdprConsent) {
      setErrorMsg(
        locale === 'de'
          ? 'Bitte stimme der Datenschutzerklärung zu.'
          : 'Please agree to the privacy policy before submitting.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType,
          fullName,
          email,
          phone,
          plannedVisitDate: inquiryType === 'visit' ? plannedVisitDate : '',
          guestsCount: inquiryType === 'visit' ? guestsCount : '',
          message,
          website
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
      setMessage('');
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Could not send your message.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-3 text-xl font-bold text-emerald-950">
          {inquiryType === 'visit'
            ? locale === 'de'
              ? 'Wir freuen uns auf deinen Besuch!'
              : 'We Look Forward to Welcoming You!'
            : locale === 'de'
            ? 'Nachricht gesendet'
            : 'Message Sent'}
        </h3>
        <p className="mt-2 text-sm text-emerald-800">
          {locale === 'de'
            ? 'Vielen Dank für deine Nachricht. Unser Team in Gütersloh meldet sich in Kürze bei dir.'
            : 'Thank you for reaching out. Our hospitality team in Gütersloh will get back to you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 rounded-full bg-emerald-700 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
        >
          {locale === 'de' ? 'Weitere Nachricht senden' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden Honeypot against spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Topic Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700">
          {locale === 'de' ? 'Anliegen' : 'How Can We Help?'}
        </label>
        <select
          value={inquiryType}
          onChange={(e) =>
            setInquiryType(
              e.target.value as 'visit' | 'general' | 'pastoral' | 'invitation'
            )
          }
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-hidden"
        >
          <option value="visit">
            {locale === 'de' ? 'Sonntagsbesuch planen' : 'Plan a Sunday Visit'}
          </option>
          <option value="general">
            {locale === 'de' ? 'Allgemeine Frage / Kontakt' : 'General Question / Contact'}
          </option>
          <option value="pastoral">
            {locale === 'de' ? 'Seelsorge & Gebet' : 'Pastoral Care & Counseling'}
          </option>
          <option value="invitation">
            {locale === 'de' ? 'Einladung für Pastor Joshua Bruno' : 'Speaker / Ministry Invitation'}
          </option>
        </select>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700">
            {locale === 'de' ? 'Vollständiger Name *' : 'Full Name *'}
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-hidden"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700">
            {locale === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-slate-700">
          {locale === 'de' ? 'Telefon / WhatsApp (optional)' : 'Phone / WhatsApp (optional)'}
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-hidden"
        />
      </div>

      {/* Conditional Visit Fields */}
      {inquiryType === 'visit' && (
        <div className="grid grid-cols-1 gap-4 rounded-xl bg-amber-50/70 p-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              {locale === 'de' ? 'Geplantes Besuchsdatum' : 'Planned Sunday Date'}
            </label>
            <input
              type="date"
              value={plannedVisitDate}
              onChange={(e) => setPlannedVisitDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              {locale === 'de' ? 'Anzahl Personen' : 'Number of People'}
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-amber-500 focus:outline-hidden"
            >
              <option value="1">1 {locale === 'de' ? 'Person' : 'Person'}</option>
              <option value="2">2 {locale === 'de' ? 'Personen' : 'People'}</option>
              <option value="3-4">3–4 {locale === 'de' ? 'Personen' : 'People'}</option>
              <option value="5+">5+ ({locale === 'de' ? 'Familie / Gruppe' : 'Family / Group'})</option>
            </select>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700">
          {inquiryType === 'visit'
            ? locale === 'de'
              ? 'Fragen oder Hinweise (z. B. Kinderbetreuung, Abholung vom Bahnhof)'
              : 'Questions or Notes (e.g., children, station pickup, accessibility)'
            : locale === 'de'
            ? 'Deine Nachricht *'
            : 'Your Message *'}
        </label>
        <textarea
          rows={4}
          required={inquiryType !== 'visit'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-hidden"
        />
      </div>

      {/* German GDPR Consent Checkbox */}
      <label className="flex items-start gap-2.5 text-xs text-slate-600">
        <input
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
        />
        <span>
          {locale === 'de'
            ? 'Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gemäß der Datenschutzerklärung verarbeitet werden.'
            : 'I consent to my details being processed to respond to my inquiry in accordance with the Privacy Policy.'}
        </span>
      </label>

      {errorMsg && <p className="text-xs font-medium text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-700 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {submitting
          ? locale === 'de'
            ? 'Wird gesendet...'
            : 'Sending...'
          : inquiryType === 'visit'
          ? locale === 'de'
            ? 'Besuch anmelden'
            : 'Confirm My Visit'
          : locale === 'de'
          ? 'Nachricht senden'
          : 'Send Message'}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <Shield className="h-3.5 w-3.5 text-emerald-600" />
        <span>GDPR-compliant • God Movement e.V.</span>
      </div>
    </form>
  );
}