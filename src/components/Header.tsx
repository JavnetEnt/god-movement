'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/events', label: t('events') },
    { href: '/sermons', label: t('sermons') },
    { href: '/prayer-wall', label: t('prayerWall') },
    { href: '/gallery', label: t('gallery') },
    { href: '/plan-your-visit', label: t('planVisit') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
       {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="God Movement e.V. — Resurrection Family Church Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-tight text-slate-900">
              God Movement
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Full Gospel Church
            </span>
          </div>
        </Link>
       

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? 'text-amber-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Who We Are Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {t('whoWeAre')}
              <ChevronDown className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <Link
                  href="/about"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                >
                  {t('aboutBeliefs')}
                </Link>
                <Link
                  href="/leadership"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                >
                  {t('leadership')}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                >
                  {t('contact')}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Language Switcher + Give Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/give"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-700"
          >
            <Heart className="h-4 w-4 fill-current" />
            {t('give')}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-6 lg:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-2">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {t('aboutBeliefs')}
              </Link>
              <Link
                href="/leadership"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {t('leadership')}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {t('contact')}
              </Link>
            </div>
            <Link
              href="/give"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-amber-600 px-4 py-2.5 text-base font-semibold text-white"
            >
              <Heart className="h-4 w-4 fill-current" />
              {t('give')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}