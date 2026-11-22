import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { BookOpen, Compass, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

const DOCTRINAL_BELIEFS = [
  {
    num: 1,
    titleEn: 'The Holy Scriptures',
    titleDe: 'Die Heilige Schrift',
    textEn:
      'We believe the Bible is the inspired, infallible, and authoritative Word of God, serving as the supreme standard for faith and Christian living.',
    textDe:
      'Wir glauben, dass die Bibel das inspirierte, unfehlbare und maßgebliche Wort Gottes ist und die höchste Richtschnur für Glauben und christliches Leben bildet.'
  },
  {
    num: 2,
    titleEn: 'The One True God (The Trinity)',
    titleDe: 'Der eine wahre Gott (Die Dreieinigkeit)',
    textEn:
      'We believe in one eternally existing God, Creator of heaven and earth, revealed in three distinct persons: Father, Son, and Holy Spirit.',
    textDe:
      'Wir glauben an einen ewig existierenden Gott, den Schöpfer des Himmels und der Erde, offenbart in drei Personen: Vater, Sohn und Heiliger Geist.'
  },
  {
    num: 3,
    titleEn: 'The Deity and Humanity of Jesus Christ',
    titleDe: 'Die Gottheit und Menschheit Jesu Christi',
    textEn:
      'We believe Jesus Christ is the eternal Son of God, conceived by the Holy Spirit, born of the Virgin Mary, truly God and truly man.',
    textDe:
      'Wir glauben, dass Jesus Christus der ewige Sohn Gottes ist, empfangen durch den Heiligen Geist, geboren von der Jungfrau Maria, wahrer Gott und wahrer Mensch.'
  },
  {
    num: 4,
    titleEn: 'The Fall of Humanity and Need for Salvation',
    titleDe: 'Der Sündenfall und die Notwendigkeit der Erlösung',
    textEn:
      'We believe all humanity fell into sin and separation from God, and can only be reconciled to God through repentance and faith in Jesus Christ.',
    textDe:
      'Wir glauben, dass alle Menschen durch die Sünde von Gott getrennt wurden und nur durch Buße und Glauben an Jesus Christus mit Gott versöhnt werden können.'
  },
  {
    num: 5,
    titleEn: 'Salvation by Grace Through Faith',
    titleDe: 'Errettung aus Gnade durch Glauben',
    textEn:
      'We believe salvation is a free gift of God’s grace received through personal faith in the finished work of Jesus Christ on the cross and His bodily resurrection.',
    textDe:
      'Wir glauben, dass Errettung ein freies Geschenk der Gnade Gottes ist, empfangen durch persönlichen Glauben an das vollbrachte Werk Jesu Christi am Kreuz und seine Auferstehung.'
  },
  {
    num: 6,
    titleEn: 'Water Baptism',
    titleDe: 'Die Wassertaufe',
    textEn:
      'We believe in water baptism by immersion in the name of the Father, the Son, and the Holy Spirit as an outward testimony of inward faith and new life in Christ.',
    textDe:
      'Wir glauben an die Wassertaufe durch Untertauchen im Namen des Vaters, des Sohnes und des Heiligen Geistes als öffentliches Zeugnis des neuen Lebens in Christus.'
  },
  {
    num: 7,
    titleEn: 'The Lord’s Supper (Holy Communion)',
    titleDe: 'Das Abendmahl des Herrn',
    textEn:
      'We believe in regularly partaking of Holy Communion in remembrance of Christ’s sacrifice until He returns.',
    textDe:
      'Wir glauben an die regelmäßige Feier des Heiligen Abendmahls zur Erinnerung an das Opfer Christi, bis er wiederkommt.'
  },
  {
    num: 8,
    titleEn: 'The Baptism and Gifts of the Holy Spirit',
    titleDe: 'Die Taufe und Gaben des Heiligen Geistes',
    textEn:
      'We believe in the indwelling and empowering baptism of the Holy Spirit for every believer, accompanied by spiritual gifts for the edification of the Church.',
    textDe:
      'Wir glauben an das Innewohnen und die erfüllende Kraft des Heiligen Geistes für jeden Gläubigen sowie an die geistlichen Gaben zur Auferbauung der Gemeinde.'
  },
  {
    num: 9,
    titleEn: 'Sanctification and Holy Living',
    titleDe: 'Heiligung und ein Gott wohlgefälliges Leben',
    textEn:
      'We believe every believer is called to grow in Christlikeness, walking in love, integrity, and holiness through the power of the Holy Spirit.',
    textDe:
      'Wir glauben, dass jeder Gläubige berufen ist, in der Nachfolge Christi zu wachsen und durch die Kraft des Heiligen Geistes in Liebe und Heiligkeit zu wandeln.'
  },
  {
    num: 10,
    titleEn: 'Divine Healing and Restoration',
    titleDe: 'Göttliche Heilung und Wiederherstellung',
    textEn:
      'We believe God still heals, restores, and delivers today in answer to the prayer of faith according to His sovereign will.',
    textDe:
      'Wir glauben, dass Gott auch heute noch heilt, wiederherstellt und befreit als Antwort auf das Gebet des Glaubens nach seinem Willen.'
  },
  {
    num: 11,
    titleEn: 'The Church and the Great Commission',
    titleDe: 'Die Gemeinde und der Missionsbefehl',
    textEn:
      'We believe the Church is the Body of Christ, commissioned to worship God, make disciples of all nations, and demonstrate Christ’s love through practical service.',
    textDe:
      'Wir glauben, dass die Gemeinde der Leib Christi ist, beauftragt, Gott anzubeten, alle Nationen zu Jüngern zu machen und die Liebe Christi praktisch zu leben.'
  },
  {
    num: 12,
    titleEn: 'The Second Coming of Jesus Christ',
    titleDe: 'Die Wiederkunft Jesu Christi',
    textEn:
      'We believe in the personal, visible, and glorious return of our Lord Jesus Christ to gather His Church and establish His eternal Kingdom.',
    textDe:
      'Wir glauben an die persönliche, sichtbare und herrliche Wiederkunft unseres Herrn Jesus Christus, um seine Gemeinde zu sammeln und sein ewiges Reich aufzurichten.'
  },
  {
    num: 13,
    titleEn: 'Resurrection and Eternal Life',
    titleDe: 'Auferstehung und ewiges Leben',
    textEn:
      'We believe in the bodily resurrection of the dead, final judgment, and eternal life in God’s presence for all who are redeemed in Christ.',
    textDe:
      'Wir glauben an die leibliche Auferstehung der Toten, das letzte Gericht und das ewige Leben in der Gegenwart Gottes für alle, die in Christus erlöst sind.'
  }
];

export default function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {locale === 'de'
              ? 'Über uns & Unser Glaube'
              : 'About Us & What We Believe'}
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {locale === 'de'
              ? 'God Movement e.V. — Träger der Resurrection Family Church in Gütersloh.'
              : 'God Movement e.V. — Parent ministry of Resurrection Family Church in Gütersloh.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Unsere Geschichte' : 'Our Story'}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {locale === 'de'
              ? 'God Movement e.V. ist ein eingetragener, gemeinnütziger religiöser Verein mit Sitz in Gütersloh, Deutschland, und die Dachorganisation der Resurrection Family Church. Gegründet von Pastor Joshua Bruno (General Overseer), begannen unsere Präsenzgottesdienste am 17. Januar 2016 mit der klaren Berufung: Gott zu lieben und seine Schöpfung zu lieben.'
              : 'God Movement e.V. is a registered non-profit religious association based in Gütersloh, Germany, and the parent ministry of Resurrection Family Church. Founded by Pastor Joshua Bruno (General Overseer), our in-person worship services began on 17 January 2016 with a simple, enduring mandate: Love God and Love His Creations.'}
          </p>
        </section>

        {/* Vision & Mission Grid */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              {locale === 'de' ? 'Unsere Vision' : 'Our Vision'}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {locale === 'de'
                ? 'Unser Ziel ist es, die Welt mit dem Evangelium von Jesus Christus zu erreichen – durch alle modernen Mittel der Massenkommunikation, praktische Evangelisationseinsätze, persönliche Glaubensgespräche, jährliche Sommer- und Winter-Campmeetings, Evangelisationsveranstaltungen und Seminare sowie durch jede Tür, die der Herr uns öffnet. Wir möchten Verlorene für das Reich Gottes gewinnen, Gott in Wort und Tat durch die Kraft seines Geistes offenbaren und so viele Menschen wie möglich zur Erkenntnis des Herrn Jesus Christus und in den Himmel führen. Amen.'
                : 'To reach the world with the gospel of Jesus Christ through every modern means of mass communication, physical evangelical outreach, personal evangelism, yearly summer and winter God camp meetings, gospel crusades & seminars and every open door by the Lord to win the lost to the Kingdom of God, reveal God in Word and deed in demonstration of His power, bring as many into the knowledge of the Lord Jesus Christ and to make heaven. Amen.'}            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              {locale === 'de' ? 'Unsere Mission' : 'Our Mission'}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {locale === 'de'
                ? 'Gott den Menschen in Wort und Tat offenbaren zur ganzheitlichen Heilung von Geist, Seele und Leib.'
                : 'Revealing God To Mankind In Word & Deed For The Total Healing of The Spirit, Soul & Body'}
            </p>
          </div>
        </section>

        {/* 13 Doctrinal Statements */}
        <section className="mt-14">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              {locale === 'de'
                ? 'Unsere 13 Glaubensgrundsätze'
                : 'What We Believe In (13 Core Tenets)'}
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {DOCTRINAL_BELIEFS.map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {locale === 'de' ? item.titleDe : item.titleEn}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {locale === 'de' ? item.textDe : item.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA to Leadership & Plan Your Visit */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-7 text-white">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-amber-400" />
            <div>
              <h3 className="text-base font-bold">
                {locale === 'de'
                  ? 'Lerne unsere Gemeindeleitung kennen'
                  : 'Meet Our Pastors & Deacon Board'}
              </h3>
              <p className="text-xs text-slate-300">
                {locale === 'de'
                  ? 'Erfahre mehr über Pastor Joshua Bruno und unser Diakonat.'
                  : 'Learn more about Pastor Joshua Bruno and the deacons serving our church.'}
              </p>
            </div>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500"
          >
            {locale === 'de' ? 'Zur Gemeindeleitung' : 'View Leadership'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}