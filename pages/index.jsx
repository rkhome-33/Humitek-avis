import React, { useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Phone, ShieldCheck, Clock, CheckCircle2, Droplets, Wrench, Ruler, MapPin, ArrowRight, FileText, Check } from "lucide-react";

const SEO_TITLE = "HUMITEK | Recherche de fuites & infiltrations à Bordeaux – Diagnostic humidité";
const SEO_DESC  = "Recherche de fuites non destructive, diagnostic des infiltrations et humidité à Bordeaux, Gironde & Nouvelle-Aquitaine. Experts indépendants, mesures instrumentées (thermographie, hygrométrie, inspection vidéo) et recommandations de travaux.";
const SEO_KW    = "recherche de fuite Bordeaux, diagnostic humidité, recherche d’infiltrations, expert humidité maison, fuite non destructive, thermographie, caméra d’inspection, toiture terrasse salle de bain, expertise avant vente, vice caché humidité, injection de résine, cuvelage, étanchéité, ventilation, Bordeaux, Gironde, Nouvelle-Aquitaine, Mérignac, Pessac, Talence";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="mb-8 text-center">
    {kicker && <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">{kicker}</div>}
    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    {children && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{children}</p>}
  </div>
);

const Pill = ({ icon: Icon, children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ${className}`}>
    {Icon && <Icon className="h-4 w-4" aria-hidden />}
    <span>{children}</span>
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-1 h-5 w-5 flex-none text-sky-600" />
    <span className="text-sm text-slate-700">{children}</span>
  </li>
);

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  function validate(form) {
    const e = {};
    if (!form.get("name")?.toString().trim()) e.name = "Nom requis";
    const phone = form.get("phone")?.toString().trim();
    if (!phone) e.phone = "Téléphone requis";
    const email = form.get("email")?.toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide";
    return e;
  }
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const eMap = validate(formData);
    if (Object.keys(eMap).length) { setErrors(eMap); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    alert("Merci ! Votre demande a été enregistrée. Nous revenons vers vous rapidement.");
    e.currentTarget.reset();
  }
  const fieldCls = "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom*</label>
        <input name="name" className={fieldCls} placeholder="Jean Dupont" />
        {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Téléphone*</label>
        <input name="phone" className={fieldCls} placeholder="06 59 61 02 85" />
        {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input name="email" className={fieldCls} placeholder="contact@humitek.fr" />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea name="message" rows={4} className={fieldCls} placeholder="Décrivez votre besoin (fuite, infiltration, diagnostic…)" />
      </div>
      <div className="sm:col-span-2 flex items-start gap-2">
        <input id="gdpr" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
        <label htmlFor="gdpr" className="text-sm text-slate-600">J’accepte d’être recontacté·e et la politique de confidentialité.</label>
      </div>
      <div className="sm:col-span-2">
        <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">
          <Phone className="h-5 w-5" />
          {loading ? "Envoi…" : "Demander un devis"}
        </button>
      </div>
    </form>
  );
};

export default function Home() {
  const trustBullets = useMemo(() => [
    { icon: CheckCircle2, label: "Experts en pathologies du bâtiment" },
    { icon: Clock, label: "Intervention rapide" },
    { icon: MapPin, label: "Bordeaux · Nouvelle-Aquitaine" },
  ], []);

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "HUMITEK",
    "url": "https://humitek.fr",
    "telephone": "+33659610285",
    "email": "contact@humitek.fr",
    "address": {"streetAddress":"9 Rue de Condé", "addressLocality": "Bordeaux", "postalCode":"33000", "addressRegion": "Nouvelle-Aquitaine", "addressCountry": "FR"},
    "areaServed": ["Bordeaux","Gironde","Nouvelle-Aquitaine","Mérignac","Pessac","Talence"],
    "image": "/hero-photo.jpg"
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name":"Faites-vous de la recherche de fuites non destructive ?","acceptedAnswer":{"@type":"Answer","text":"Oui. Nous utilisons thermographie infrarouge, hygrométrie (capacitive/carbure), caméras d’inspection, tests traceurs et mises en eau contrôlées."}},
      {"@type":"Question","name":"Intervenez-vous à Bordeaux et en Gironde ?","acceptedAnswer":{"@type":"Answer","text":"Oui, Bordeaux et toute la Nouvelle-Aquitaine (Gironde, Métropole et alentours)."}},
      {"@type":"Question","name":"Fournissez-vous un rapport ?","acceptedAnswer":{"@type":"Answer","text":"Oui, un rapport clair avec photos, mesures et recommandations."}}
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESC} />
        <meta name="keywords" content={SEO_KW} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero-photo.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      </Head>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src="/logo_humitek.png" alt="HUMITEK" fill className="object-contain" priority />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">HUMITEK</div>
              <div className="text-xs text-slate-500">Maîtriser l’humidité</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="hover:text-sky-700">Services</a>
            <a href="#avis" className="hover:text-sky-700">Avis</a>
            <a href="#contact" className="hover:text-sky-700">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+33659610285" className="hidden rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 sm:inline-flex items-center gap-2">
              <Phone className="h-4 w-4"/> 06 59 61 02 85
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
              Devis <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </Container>
      </header>

      <section className="relative border-b border-slate-200 bg-white">
        <div className="absolute inset-0">
          <Image src="/hero-photo.jpg" alt="Inspection et diagnostic d'un dégât des eaux" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/10" />
        </div>
        <Container className="relative grid grid-cols-1 items-center gap-8 py-16 lg:grid-cols-2">
          <div className="text-white">
            <Pill icon={ShieldCheck} className="bg-white/90 text-slate-800">Maîtriser l’humidité</Pill>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Recherche de fuites, Recherche d’infiltrations, Diagnostic humidité
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              Experts indépendants — investigations instrumentées, analyses causales et recommandations de travaux.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-700">
                Demander un devis <ArrowRight className="h-5 w-5"/>
              </a>
              <a href="tel:+33659610285" className="inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/10 px-5 py-3 font-semibold text-white shadow-sm backdrop-blur hover:bg-white/20">
                Appeler le 06 59 61 02 85
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {trustBullets.map((b, i) => (
                <Pill key={i} icon={b.icon} className="bg-white/90">{b.label}</Pill>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="services" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Services" title="Nos expertises">
            Diagnostics instrumentés, recherche de causes et recommandations de mise en œuvre.
          </SectionTitle>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Droplets className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Recherche de fuites</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Localisation <strong>non destructive</strong> par approche multi‑instrumentale : thermographie IR, hygrométrie (capacitive / carbure), caméras d’inspection, tests traceurs, mise en eau contrôlée. Qualification de l’origine, du cheminement et de l’ampleur pour une réparation <em>ciblée</em>.
              </p>
              <ul className="mt-4 space-y-2">
                <Bullet>Cartographie d’humidification et relevés normés</Bullet>
                <Bullet>Détection des points singuliers et réseaux</Bullet>
                <Bullet>Rapport photos/mesures exploitable par l’entreprise</Bullet>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Ruler className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Diagnostic infiltrations</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Analyse des <strong>entrées d’eau structurelles</strong> : relevés d’étanchéité, pieds de murs enterrés, interfaces menuiseries/façades, toitures‑terrasses. Évaluation de la cinétique et des risques (salpêtre, décollements, corrosion) avec plan d’actions priorisé.
              </p>
              <ul className="mt-4 space-y-2">
                <Bullet>Essais ciblés pour confirmer les hypothèses</Bullet>
                <Bullet>Traçabilité des désordres et causes probables</Bullet>
                <Bullet>Préconisations de remise en conformité</Bullet>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <FileText className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Expertise conseil avant vente</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                État des lieux <strong>indépendant</strong> avant transaction : identification des causes probables, estimation des correctifs, analyse des impacts. Objectif : <em>réduire le risque de vice caché</em> et sécuriser la décision d’achat/vente.
              </p>
              <ul className="mt-4 space-y-2">
                <Bullet>Rapport clair, opposable, illustré</Bullet>
                <Bullet>Hiérarchisation des urgences et coûts indicatifs</Bullet>
                <Bullet>Échanges possibles avec notaires et parties</Bullet>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Wrench className="h-6 w-6"/>
                </div>
                <h3 className="text-lg font-semibold">Solutions adaptées</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Accompagnement vers les <strong>solutions les plus adaptées</strong> : injections de résine (coupure de capillarité), cuvelage, ventilation/traitement de l’air, étanchéités extérieures et drainage. Phasage des travaux et contrôle d’assèchement.
              </p>
              <ul className="mt-4 space-y-2">
                <Bullet>Priorisation technique et budgétaire</Bullet>
                <Bullet>Coordination avec entreprises et assurances</Bullet>
                <Bullet>Contrôles post‑intervention</Bullet>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="avis" className="border-b border-slate-200 bg-white py-12">
        <Container>
          <SectionTitle kicker="Avis" title="Avis Google">
            Ils nous ont fait confiance.
          </SectionTitle>
          <div className="mt-2 flex justify-center" aria-label="Note moyenne 5 sur 5">
            {Array.from({length: 5}).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="mx-0.5 h-5 w-5 text-amber-500" fill="currentColor" aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.802-2.036a1 1 0 0 0-1.176 0l-2.802 2.036c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.379-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z"/>
              </svg>
            ))}
            <span className="sr-only">Note moyenne 5/5</span>
            <span className="ml-2 text-sm font-semibold text-slate-800">4,8/5</span>
          </div>

          <div className="mt-4 flex justify-center">
            <a
              href="https://share.google/qg0vFvdv0WYISEntx"
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Voir nos avis Google
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "A. Martin", text: "Diagnostic précis et recommandations claires. Très pro." },
              { name: "S. Bernard", text: "Fuite localisée rapidement, coordination efficace avec l’entreprise d’étanchéité." },
              { name: "C. Dupuy", text: "Conseil avant achat pertinent, a permis d’ajuster le projet sans mauvaise surprise." },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm text-slate-700">“{r.text}”</p>
                <div className="mt-3 text-sm font-semibold text-slate-900">— {r.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="bg-slate-50 py-12">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Contact & Devis</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Bordeaux – Nouvelle-Aquitaine. Dites‑nous ce que vous constatez, nous revenons vers vous rapidement.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
                  <Phone className="h-6 w-6"/>
                </div>
                <div>
                  <div className="font-semibold">Un besoin urgent ?</div>
                  <div className="text-sm text-slate-600">Appelez‑nous ou laissez vos coordonnées.</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li><strong>Tél.</strong> : <a className="text-sky-700 hover:underline" href="tel:+33659610285">06 59 61 02 85</a></li>
                <li><strong>Email</strong> : <a className="text-sky-700 hover:underline" href="mailto:contact@humitek.fr">contact@humitek.fr</a></li>
                <li><strong>Adresse</strong> : HUMITEK – 9 Rue de Condé, 33000 Bordeaux</li>
                <li><strong>Zone</strong> : Bordeaux · Nouvelle‑Aquitaine</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Informations SEO locales" className="border-t border-slate-200 bg-white py-10 text-sm text-slate-600">
        <Container>
          <h2 className="mb-3 text-base font-semibold text-slate-800">Expert humidité à Bordeaux (Gironde)</h2>
          <p className="max-w-4xl">
            HUMITEK accompagne particuliers, syndics et entreprises en Nouvelle‑Aquitaine pour la recherche de fuites, le diagnostic des infiltrations,
            l’analyse des remontées capillaires et la prévention des moisissures. Nous intervenons sur maisons individuelles, appartements, locaux tertiaires,
            toitures‑terrasses, façades, caves et sous‑sols. Nos rapports documentés (photos, relevés et traçabilité) facilitent la décision, les demandes
            d’indemnisation et le pilotage des travaux d’étanchéité, ventilation, cuvelage ou injections de résine.
          </p>
        </Container>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10 text-sm">
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Réseaux sociaux ajoutés */}

          <div>
            <div className="font-semibold">Réseaux sociaux</div>
            <ul className="mt-2 flex items-center gap-3">
              <li>
                <a href="#" target="_blank" rel="noopener" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100">
                  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden><path d="M34 15.5c2.2 1.7 4.9 2.8 7.8 3.1v6.2c-3.5-.1-6.8-1.2-9.6-3.1v11.2c0 7.7-6.3 14-14 14S4 40.6 4 32.9s6.3-14 14-14c1 0 2 .1 3 .3v6.8a8 8 0 0 0-3-.6c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V4h8v.1c.4 4.4 3.2 8.1 7 9.4V15.5z" fill="currentColor"/></svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm6.25-3.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" fill="currentColor"/></svg>
                </a>
              </li>
            </ul>
            <p className="mt-1 text-xs text-slate-500">Envoie-moi tes URL TikTok/Instagram pour les brancher.</p>
          </div>

          <div>
            <div className="text-lg font-bold">HUMITEK</div>
            <p className="mt-2 text-slate-600">Recherche de fuites, infiltrations & diagnostics humidité — Nouvelle‑Aquitaine.</p>
          </div>
          <div>
            <div className="font-semibold">Navigation</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#avis" className="hover:underline">Avis</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Coordonnées</div>
            <ul className="mt-2 space-y-1">
              <li>HUMITEK</li>
              <li>9 Rue de Condé, 33000 Bordeaux</li>
              <li><a className="hover:underline" href="mailto:contact@humitek.fr">contact@humitek.fr</a> · <a className="hover:underline" href="tel:+33659610285">06 59 61 02 85</a></li>
            </ul>
          </div>
        </Container>
        <Container className="mt-8 border-t border-slate-200 pt-6 text-slate-500">
          © {new Date().getFullYear()} HUMITEK – Tous droits réservés.
        </Container>
      </footer>
    </div>
  );
}
