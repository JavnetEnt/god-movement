import { setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/client';
import { Users, Mail, Award } from 'lucide-react';

interface LeaderItem {
  _id: string;
  name: string;
  category: 'pastorate' | 'deacon';
  roleEn: string;
  roleDe?: string;
  photoUrl?: string;
  bioEn?: string;
  bioDe?: string;
  displayOrder: number;
}

const LEADERS_QUERY = `*[_type == "leader"] | order(displayOrder asc, name asc) {
  _id,
  name,
  category,
  roleEn,
  roleDe,
  "photoUrl": photo.asset->url,
  bioEn,
  bioDe,
  displayOrder
}`;

export default async function LeadershipPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let leaders: LeaderItem[] = [];
  try {
    leaders = await client.fetch<LeaderItem[]>(LEADERS_QUERY);
  } catch (error) {
    console.error('Sanity leaders fetch error:', error);
  }

  const pastorate =
    leaders.filter((l) => l.category === 'pastorate').length > 0
      ? leaders.filter((l) => l.category === 'pastorate')
      : [
          {
            _id: 'default-pastor',
            name: 'Pastor Joshua Bruno',
            category: 'pastorate' as const,
            roleEn: 'Founding Pastor & General Overseer',
            roleDe: 'Gründungspastor & General Overseer',
            bioEn:
              'Pastor Joshua Bruno is the founding pastor and general overseer of God Movement e.V. and Resurrection Family Church in Gütersloh, Germany, dedicated to teaching God’s Word, raising disciples, and serving communities across Europe and Africa.',
            bioDe:
              'Pastor Joshua Bruno ist der Gründungspastor und General Overseer von God Movement e.V. und der Resurrection Family Church in Gütersloh, Deutschland – mit dem Auftrag, Gottes Wort zu lehren, Jünger auszubilden und Menschen in Europa und Afrika zu dienen.',
            displayOrder: 1
          }
        ];

  const deacons = leaders.filter((l) => l.category === 'deacon');

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de'
              ? 'Gemeindeleitung & Diakonat'
              : 'Leadership & Deacon Board'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'Die geistliche Leitung und der Vorstand von God Movement e.V. und der Resurrection Family Church.'
              : 'Meet the pastoral leadership and deacon board serving God Movement e.V. and Resurrection Family Church.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Section 1: Senior Leadership / Pastorate */}
        <section>
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              {locale === 'de' ? 'Geistliche Leitung' : 'Pastoral Leadership'}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {pastorate.map((leader) => {
              const role =
                locale === 'de' && leader.roleDe ? leader.roleDe : leader.roleEn;
              const bio =
                locale === 'de' && leader.bioDe ? leader.bioDe : leader.bioEn;

              return (
                <div
                  key={leader._id}
                  className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center"
                >
                  {leader.photoUrl ? (
                    <img
                      src={leader.photoUrl}
                      alt={leader.name}
                      className="h-32 w-32 shrink-0 rounded-2xl object-cover shadow-xs"
                    />
                  ) : (
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-3xl font-bold text-amber-400">
                      JB
                    </div>
                  )}

                  <div>
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800">
                      {role}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {leader.name}
                    </h3>
                    {bio && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {bio}
                      </p>
                    )}
                    <a
                      href="mailto:info@godmovement.tv?subject=Pastoral%20Office%20-%20Pastor%20Joshua%20Bruno"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {locale === 'de' ? 'Büro kontaktieren' : 'Contact Office'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Deacon Board */}
        <section className="mt-16 border-t border-slate-200 pt-14">
          <div className="flex items-center gap-2.5">
            <Users className="h-5 w-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              {locale === 'de' ? 'Diakonat (Deacon Board)' : 'Deacon Board'}
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {locale === 'de'
              ? 'Unsere Diakone und Diakoninnen unterstützen die Gemeinde in Seelsorge, Gastfreundschaft, Verwaltung und praktischem Dienst.'
              : 'Our deacons and deaconesses serve the congregation in pastoral care, hospitality, administration, and practical ministry.'}
          </p>

          {deacons.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-slate-600">
                {locale === 'de'
                  ? 'Füge die Profile der Diakoninnen und Diakone im Admin Studio (/studio → Leadership & Deacon Board) hinzu, um sie hier anzuzeigen.'
                  : 'Add the Deacon Board profiles in Sanity Studio (/studio → Leadership & Deacon Board) to display their photos and roles here.'}
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deacons.map((deacon) => {
                const role =
                  locale === 'de' && deacon.roleDe ? deacon.roleDe : deacon.roleEn;
                const bio =
                  locale === 'de' && deacon.bioDe ? deacon.bioDe : deacon.bioEn;
                const initials = deacon.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <article
                    key={deacon._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs"
                  >
                    {deacon.photoUrl ? (
                      <img
                        src={deacon.photoUrl}
                        alt={deacon.name}
                        className="mx-auto h-28 w-28 rounded-full object-cover shadow-xs"
                      />
                    ) : (
                      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-700">
                        {initials}
                      </div>
                    )}
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {deacon.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600">{role}</p>
                    {bio && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {bio}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}