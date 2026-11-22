export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Datenschutzerklärung / Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Verantwortlicher / Data Controller</h2>
          <p className="mt-1">
            God Movement e.V., 33330 Gütersloh, Germany (info@godmovement.tv).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Gebetswand & Kontaktformulare / Prayer Wall & Forms</h2>
          <p className="mt-1">
            When submitting a prayer request or contact message, your email address and phone number are stored strictly for private notifications and are never published publicly.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Spenden über PayPal / Donations via PayPal</h2>
          <p className="mt-1">
            Online donations are processed via PayPal (Europe) S.à r.l. et Cie, S.C.A. PayPal scripts load only on the Giving page when initiated by the donor.
          </p>
        </section>
      </div>
    </main>
  );
}