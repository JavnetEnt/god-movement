'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Heart,
  Copy,
  Check,
  Building2,
  Mail,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const FUNDS = [
  { id: 'tithe', labelEn: 'Tithe', labelDe: 'Zehnter', verse: 'Malachi 3:10' },
  { id: 'offering', labelEn: 'Offering', labelDe: 'Opfer', verse: '2 Cor. 9:7' },
  { id: 'partnership', labelEn: 'Partnership', labelDe: 'Partnerschaft', verse: 'Phil. 1:5' },
  { id: 'seed', labelEn: 'Seed', labelDe: 'Saat', verse: 'Luke 6:38' },
  { id: 'pledge', labelEn: 'Pledge', labelDe: 'Gelübde', verse: 'Psalm 76:11' },
  { id: 'missions', labelEn: 'Missions', labelDe: 'Mission', verse: 'Matt. 28:19' }
];

const PRESET_AMOUNTS = ['20', '50', '100', '250'];

function CopyField({
  label,
  value,
  copyLabel,
  copiedLabel
}: {
  label: string;
  value: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
      <div>
        <span className="block text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-slate-900">
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-600">{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>{copyLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function GivingClient({ locale }: { locale: string }) {
  const t = useTranslations('Giving');
  const [selectedFund, setSelectedFund] = useState('offering');
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [amount, setAmount] = useState('50');

  // Reads your PayPal link from .env.local (with fallback placeholder)
  const basePaypalUrl = (
    process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || 'https://paypal.me/Godmovement'
  ).replace(/\/+$/, '');

  const activeFundObj = FUNDS.find((f) => f.id === selectedFund) || FUNDS[1];
  const activeFundName =
    locale === 'de' ? activeFundObj.labelDe : activeFundObj.labelEn;

  const numericAmount = parseFloat(amount);
  const isValidAmount = !isNaN(numericAmount) && numericAmount >= 1;

  // If using a paypal.me link, append /amountCURRENCY so the exact gift pre-fills automatically
  const isPayPalMe = basePaypalUrl.toLowerCase().includes('paypal.me/');
  const finalCheckoutUrl =
    isPayPalMe && isValidAmount
      ? `${basePaypalUrl}/${numericAmount}${currency}`
      : basePaypalUrl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN (7 cols): PayPal Giving Flow */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {t('onlineTitle')}
                </h2>
                <p className="text-sm text-slate-600">{t('onlineSubtitle')}</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {/* Step 1: Fund Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900">
                  {t('selectFund')}
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {FUNDS.map((fund) => {
                    const isSelected = selectedFund === fund.id;
                    return (
                      <button
                        key={fund.id}
                        type="button"
                        onClick={() => setSelectedFund(fund.id)}
                        className={`rounded-xl border p-3 text-left transition ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-sm font-bold text-slate-900">
                          {locale === 'de' ? fund.labelDe : fund.labelEn}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-slate-500">
                          {fund.verse}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Currency & Step 3: Amount */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-900">
                    {t('selectCurrency')}
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(['EUR', 'USD'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`rounded-xl border py-2.5 text-sm font-bold transition ${
                          currency === curr
                            ? 'border-amber-600 bg-amber-600 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {curr === 'EUR' ? '€ EUR' : '$ USD'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    {t('selectAmount')}
                  </label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`rounded-xl border py-2.5 text-sm font-bold transition ${
                          amount === preset
                            ? 'border-amber-600 bg-amber-50 text-amber-800'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {currency === 'EUR' ? `€${preset}` : `$${preset}`}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('customAmount')}
                    className="mt-2.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-900 focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Reminder Note for Donor to Mention Fund on PayPal */}
              <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5 text-xs text-amber-950">
                {locale === 'de' ? (
                  <>
                    <strong>Hinweis für PayPal:</strong> Bitte trage im
                    Nachrichtenfeld auf PayPal{' '}
                    <span className="rounded bg-amber-200/70 px-1.5 py-0.5 font-semibold">
                      {activeFundName}
                    </span>{' '}
                    als Verwendungszweck ein.
                  </>
                ) : (
                  <>
                    <strong>Tip on PayPal:</strong> Add{' '}
                    <span className="rounded bg-amber-200/70 px-1.5 py-0.5 font-semibold">
                      {activeFundName}
                    </span>{' '}
                    in the optional note field on PayPal so our treasury team
                    allocates your gift accurately.
                  </>
                )}
              </div>

              {/* Direct PayPal Launch Button */}
              <div className="pt-1">
                <a
                  href={finalCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#0070BA] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#005EA6]"
                >
                  <span>
                    {locale === 'de'
                      ? `Weiter zu PayPal (${isValidAmount ? `${numericAmount} ${currency}` : activeFundName})`
                      : `Give via PayPal (${isValidAmount ? `${currency === 'EUR' ? '€' : '$'}${numericAmount} • ` : ''}${activeFundName})`}
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>
                    {locale === 'de'
                      ? 'Sichere Weiterleitung zu PayPal • God Movement e.V.'
                      : 'Opens official PayPal checkout securely in a new tab • God Movement e.V.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): EUR & NGN Bank Accounts + Speaker Invitations */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold text-slate-900">
                {t('bankTitle')}
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600">{t('bankSubtitle')}</p>

            {/* EUR Account Card */}
            <div className="mt-5 space-y-2.5">
              <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                {t('eurCardTitle')}
              </h4>
              <CopyField
                label="Account Holder"
                value="God Movement e.V."
                copyLabel={t('copy')}
                copiedLabel={t('copied')}
              />
              <CopyField
                label="IBAN"
                value="DE39 4786 0125 1225 6767 00"
                copyLabel={t('copy')}
                copiedLabel={t('copied')}
              />
              <CopyField
                label="BIC / REF"
                value="GENODEM1GTL"
                copyLabel={t('copy')}
                copiedLabel={t('copied')}
              />
            </div>

            {/* NGN Account Card */}
            <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
              <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                {t('ngnCardTitle')}
              </h4>
              <CopyField
                label="Bank & Account Name"
                value="Zenith Bank — God Movement"
                copyLabel={t('copy')}
                copiedLabel={t('copied')}
              />
              <CopyField
                label="Account Number (NGN)"
                value="2284234371"
                copyLabel={t('copy')}
                copiedLabel={t('copied')}
              />
            </div>

            <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
              {t('referenceHint')}
            </p>
          </div>

          {/* Speaker Invitation Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
            <h3 className="text-base font-bold">{t('speakerTitle')}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {t('speakerBody')}
            </p>
            <a
              href="mailto:info@godmovement.tv?subject=Ministry%20%2F%20Speaker%20Invitation%20-%20Pastor%20Joshua%20Bruno"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-500"
            >
              <Mail className="h-3.5 w-3.5" />
              {t('speakerCta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}