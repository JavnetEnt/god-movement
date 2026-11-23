export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Impressum</h1>
      <p className="mt-2 text-sm text-slate-500">Angaben gemäß § 5 DDG / TMG</p>

      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Trägerverein</h2>
          <p className="mt-1">
            God Movement e.V.<br />
            Full Gospel Church<br />
            Avenwedde Bahnhof, Isselhorster Straße 248,<br />
            33335 Gütersloh, Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Vertreten durch den Vorstand</h2>
          <p className="mt-1">Pastor Joshua Bruno (1. Vorsitzender / General Overseer)</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Vereinsregister & Kontakt</h2>
          <p className="mt-1">
            Registergericht: Amtsgericht Gütersloh<br />
            Registernummer: [VR-Nummer einfügen]<br />
            E-Mail: info@godmovement.tv
          </p>
        </section>
      </div>
    </main>
  );
}