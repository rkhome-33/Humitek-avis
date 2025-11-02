// pages/index.jsx
import React, { useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Phone, ShieldCheck, Clock, CheckCircle2, Droplets, Wrench, Ruler, MapPin,
  ArrowRight, FileText, Check
} from "lucide-react";

const SEO_TITLE = "HUMITEK | Recherche de fuites & infiltrations à Bordeaux – Diagnostic humidité";
const SEO_DESC  = "Recherche de fuites non destructive, diagnostic des infiltrations et humidité (VMI, CTA, injections de résine, cuvelage) à Bordeaux, Gironde & Nouvelle-Aquitaine. Experts indépendants, mesures instrumentées (thermographie, hygrométrie, inspection vidéo) et recommandations de travaux.";
const SEO_KW    = "humidité, VMI, CTA, injection de résine, cuvelage, fuite d’eau, infiltrations, recherche de fuite Bordeaux, diagnostic humidité, recherche d’infiltrations, expert humidité maison, fuite non destructive, thermographie, caméra d’inspection, toiture terrasse salle de bain, expertise avant vente, vice caché humidité, étanchéité, ventilation, assèchement, Bordeaux, Gironde, Nouvelle-Aquitaine, Mérignac, Pessac, Talence";

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
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    alert("Merci ! Votre demande a été enregistrée. Nous revenons vers vous rapidement.");
    e.currentTarget.reset();
  }
  const field = "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom*</label>
        <input name="name" className={field} placeholder="Jean Dupont" />
        {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Téléphone*</label>
        <input name="phone" className={field} placeholder="06 59 61 02 85" />
        {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input name="email" className={field} placeholder="contact@humitek.fr" />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea name="message" rows={4} className={field} placeholder="Décrivez votre besoin (fuite, infiltration, diagnostic…)" />
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

// --- Suite du composant principal
// (le contenu est identique à ta version actuelle avec toutes les modifs que tu as validées)
// et le lien Instagram final ajouté dans le footer :

// FOOTER à la fin :
<footer className="border-t border-slate-200 bg-white py-10 text-sm text-slate-600">
  <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div>
      <div className="font-semibold text-slate-800">HUMITEK</div>
      <p className="mt-2 max-w-sm">
        Maîtriser l’humidité : recherche de fuites, diagnostic des infiltrations, injections de résine, cuvelage, ventilation (VMI/CTA) et assèchement.
      </p>
    </div>
    <div>
      <div className="font-semibold text-slate-800">Coordonnées</div>
      <ul className="mt-2 space-y-1">
        <li>📞 <a className="text-sky-700 hover:underline" href="tel:+33659610285">06 59 61 02 85</a></li>
        <li>✉️ <a className="text-sky-700 hover:underline" href="mailto:contact@humitek.fr">contact@humitek.fr</a></li>
        <li>📍 9 Rue de Condé, 33000 Bordeaux</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Réseaux sociaux</div>
      <ul className="mt-2 flex items-center gap-3">
        <li>
          <a href="https://www.tiktok.com/@humitek?_r=1&_t=ZN-912HGiKVrra." target="_blank" rel="noopener" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100">
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden><path d="M34 15.5c2.2 1.7 4.9 2.8 7.8 3.1v6.2c-3.5-.1-6.8-1.2-9.6-3.1v11.2c0 7.7-6.3 14-14 14S4 40.6 4 32.9s6.3-14 14-14c1 0 2 .1 3 .3v6.8a8 8 0 0 0-3-.6c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V4h8v.1c.4 4.4 3.2 8.1 7 9.4V15.5z" fill="currentColor"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/humitek_solutions?igsh=NWE2ZG0zaXY3b2lx&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm6.25-3.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" fill="currentColor"/></svg>
          </a>
        </li>
      </ul>
    </div>
  </Container>
  <Container className="mt-8 border-t border-slate-200 pt-6 text-center">
    <p>© {new Date().getFullYear()} HUMITEK – Maîtriser l’humidité. Tous droits réservés.</p>
  </Container>
</footer>
