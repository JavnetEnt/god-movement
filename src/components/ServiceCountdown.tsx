'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Radio, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function getNextServiceTime(): TimeLeft {
  const now = new Date();

  const berlinParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now);

  const getPart = (type: string) =>
    berlinParts.find((p) => p.type === type)?.value || '0';

  const weekday = getPart('weekday');
  const hour = parseInt(getPart('hour'), 10);
  const minute = parseInt(getPart('minute'), 10);
  const second = parseInt(getPart('second'), 10);

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  const currentDay = dayMap[weekday] ?? 0;

  if (
    currentDay === 0 &&
    (hour === 13 || hour === 14 || (hour === 15 && minute < 30))
  ) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  let daysUntilSunday = (7 - currentDay) % 7;
  const currentSecondsIntoDay = hour * 3600 + minute * 60 + second;
  const targetSecondsIntoDay = 13 * 3600;

  if (daysUntilSunday === 0 && currentSecondsIntoDay >= targetSecondsIntoDay) {
    daysUntilSunday = 7;
  }

  const totalSecondsRemaining =
    daysUntilSunday * 86400 + (targetSecondsIntoDay - currentSecondsIntoDay);

  const days = Math.floor(totalSecondsRemaining / 86400);
  const hours = Math.floor((totalSecondsRemaining % 86400) / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  return { days, hours, minutes, seconds, isLive: false };
}

export default function ServiceCountdown() {
  const t = useTranslations('Home');
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getNextServiceTime());
    const timer = setInterval(() => {
      setTimeLeft(getNextServiceTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="h-24 w-full max-w-md animate-pulse rounded-2xl bg-white/10" />
    );
  }

  if (timeLeft.isLive) {
    return (
      <div className="inline-flex flex-col items-center rounded-2xl border border-red-400/40 bg-red-950/60 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-red-400 uppercase">
          <Radio className="h-4 w-4 animate-pulse" />
          <span>{t('liveNowBadge')}</span>
        </div>
        <p className="mt-1 text-xs text-slate-200">{t('liveNowSub')}</p>
      </div>
    );
  }

  const blocks = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds }
  ];

  return (
    <div className="inline-block rounded-2xl border border-white/15 bg-slate-900/75 px-6 py-4 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
        <Clock className="h-3.5 w-3.5" />
        <span>{t('countdownLabel')}</span>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {blocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center rounded-xl bg-white/10 px-3 py-2 sm:px-4"
          >
            <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-[11px] font-medium text-slate-300 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}