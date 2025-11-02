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
  const [msg, setMsg] = useState(null);

  function validate(form) {
    const e = {};
    if (!form.get("name")?.toString().trim()) e.name = "Nom requis";
    if (!form.get("phone")?.toString().trim()) e.phone = "Téléphone requis";
    const email = form.get("email")?.toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email invalide";
    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setErrors({});
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    if (formData.get("company")) return;

    const eMap = validate(formData);
    if (Object.keys(eMap).length) { setErrors(eMap); return; }

    try {
      setLoading(true);
      const res = await fetch("https://formspree.io/f/xblpqyyr", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        setMsg({ type: "success", text: "✅ Votre message a bien été envoyé. Nous vous recontactons rapidement." });
        formEl.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        const detail = data?.errors?.[0]?.message || "Une erreur est survenue.";
        setMsg({ type: "error", text: "❌ Envoi impossible : " + detail });
      }
    } catch {
      setMsg({ type: "error", text: "❌ Problème réseau. Merci de réessayer." });
    } finally {
      setLoading(false);
    }
  }

  const field = "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input type="text" name="company" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />
      <input type="hidden" name="_subject" value="Nouvelle demande via HUMITEK" />

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
        <label htmlFor="gdpr" className="text-sm text-slate-600">
          J’accepte d’être recontacté·e et la politique de confidentialité.
        </label>
      </div>

      {msg && (
        <div className={`sm:col-span-2 rounded-xl px-4 py-3 text-sm ${msg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
          {msg.text}
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Phone className="h-5 w-5" />
          {loading ? "Envoi…" : "Demander un devis"}
        </button>
      </div>
    </form>
  );
};

// ... le reste de ton composant Home est identique à la dernière version,
// incluant le footer avec Instagram et TikTok.
