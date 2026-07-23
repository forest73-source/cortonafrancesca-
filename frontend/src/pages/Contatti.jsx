import React, { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export default function Contatti() {
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Messaggio dal sito — ${form.nome || "Contatto"}`);
    const body = encodeURIComponent(`Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.messaggio}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const socials = [
    { href: SITE.facebook, icon: Facebook, label: "Facebook", sub: "Arte e Spiritualità Connesse", testid: "contact-facebook" },
    { href: SITE.instagram, icon: Instagram, label: "Instagram", sub: "@francescacortona", testid: "contact-instagram" },
    { href: `https://wa.me/${SITE.whatsapp}`, icon: MessageCircle, label: "WhatsApp", sub: SITE.whatsappDisplay, testid: "contact-whatsapp" },
    { href: `mailto:${SITE.email}`, icon: Mail, label: "Email", sub: SITE.email, testid: "contact-email" },
  ];

  return (
    <div data-testid="contatti-page">
      <section className="relative pt-40 pb-14 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <h1 className="font-display text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-none text-[#f3eee7] tracking-[0.06em]">
            CONTATTI
          </h1>
          <div className="divider-ornament my-6"><Sparkles size={16} className="text-gold" /></div>
          <p className="font-serif-el text-xl text-[#a29b93] max-w-xl mx-auto px-6">
            Per commissioni artistiche, acquisto di opere originali o informazioni sul Cofanetto degli Arcani.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-16 grid lg:grid-cols-2 gap-12">
        {/* SOCIAL / DIRECT */}
        <Reveal>
          <h2 className="font-display text-2xl text-gold-bright tracking-wide2 mb-7">Seguimi & Scrivimi</h2>
          <div className="space-y-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={s.testid}
                className="group flex items-center gap-5 p-5 border transition-all duration-400 hover:border-[var(--gold)] hover:bg-[var(--surface-2)]"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <span className="flex items-center justify-center w-14 h-14 border text-gold-bright group-hover:bg-[var(--gold)] group-hover:text-[#0b0a0f] transition-all duration-400"
                      style={{ borderColor: "var(--line)" }}>
                  <s.icon size={24} />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-lg text-[#ece7e1] tracking-wide2">{s.label}</span>
                  <span className="font-ui text-sm text-[#8a837b]">{s.sub}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* FORM */}
        <Reveal delay={0.15}>
          <h2 className="font-display text-2xl text-gold-bright tracking-wide2 mb-7">Invia un Messaggio</h2>
          <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
            <div>
              <label className="font-ui text-[0.7rem] tracking-[0.25em] uppercase text-[#8a837b]">Nome e Cognome</label>
              <input
                type="text" required value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                data-testid="form-nome"
                className="w-full mt-2 px-4 py-3 bg-transparent border font-serif-el text-lg text-[#ece7e1] outline-none focus:border-[var(--gold)] transition-colors"
                style={{ borderColor: "var(--line)" }}
              />
            </div>
            <div>
              <label className="font-ui text-[0.7rem] tracking-[0.25em] uppercase text-[#8a837b]">Indirizzo Email</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="form-email"
                className="w-full mt-2 px-4 py-3 bg-transparent border font-serif-el text-lg text-[#ece7e1] outline-none focus:border-[var(--gold)] transition-colors"
                style={{ borderColor: "var(--line)" }}
              />
            </div>
            <div>
              <label className="font-ui text-[0.7rem] tracking-[0.25em] uppercase text-[#8a837b]">Messaggio</label>
              <textarea
                rows={5} required value={form.messaggio}
                onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                data-testid="form-messaggio"
                className="w-full mt-2 px-4 py-3 bg-transparent border font-serif-el text-lg text-[#ece7e1] outline-none focus:border-[var(--gold)] transition-colors resize-none"
                style={{ borderColor: "var(--line)" }}
              />
            </div>
            <button type="submit" className="btn-gold w-full justify-center" data-testid="form-submit">
              <Send size={16} /> Invia Messaggio
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
