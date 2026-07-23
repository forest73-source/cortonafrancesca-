import React from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { SITE } from "@/data/site";
import content from "@/data/content.json";

const arcaniImages = content.arcani.map((a) => ({
  src: a.src,
  caption: `${String(a.n).padStart(2, "0")} · ${a.name}`,
}));

const wa = `https://wa.me/${SITE.whatsapp}`;

const editions = [
  {
    name: "Edizione Classica",
    price: "57 €",
    tag: null,
    features: ["Mazzo completo 22 Arcani", "Libro «Arcani» incluso", "Spedizione gratuita", "Opera artistica da collezione"],
    cta: "Acquista via WhatsApp",
    highlight: false,
  },
  {
    name: "Edizione Limitata",
    price: "220 €",
    tag: "Solo 33 esemplari",
    features: ["Edizione numerata e firmata", "Mazzo completo dei 22 Arcani", "Libro «Arcani»", "Musica dedicata all'opera", "Certificato di autenticità", "Spedizione gratuita"],
    cta: "Prenota Edizione Limitata",
    highlight: true,
  },
];

export default function Arcani() {
  return (
    <div data-testid="arcani-page">
      {/* HERO TITLE */}
      <section className="relative pt-40 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Sparkles size={520} className="text-gold" style={{ opacity: 0.03 }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          <h1 className="font-display text-[3.6rem] sm:text-[6rem] lg:text-[8rem] leading-none text-[#f3eee7] tracking-[0.08em]">
            ARCANI
          </h1>
          <div className="divider-ornament my-6"><Sparkles size={16} className="text-gold" /></div>
          <p className="font-display text-gold-bright text-lg sm:text-2xl tracking-[0.42em] uppercase">
            di Cortona Francesca
          </p>
        </motion.div>
      </section>

      {/* COFANETTO INTRO */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-16 text-center" data-testid="cofanetto-intro">
        <Reveal>
          <span className="font-ui text-[0.72rem] tracking-[0.4em] uppercase text-gold">Il Cofanetto d'Autore</span>
          <h2 className="font-display text-3xl md:text-4xl text-[#f3eee7] mt-5 leading-tight">
            22 Arcani Maggiori dipinti a mano
          </h2>
          <p className="font-serif-el text-xl text-[#d8d2ca] mt-6 leading-relaxed">
            Edizione limitata a soli 33 cofanetti numerati. Ogni esemplare è preparato, numerato e firmato
            personalmente da Francesca Cortona, rendendo ogni cofanetto un'opera unica da collezione, pensata per
            accompagnare il tuo percorso attraverso i 22 arcani.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-12 text-left">
          {[
            { t: "Il Mazzo d'Arte", d: "Cofanetto speciale da collezione con il mazzo completo, 22 Arcani illustrati e firmati con la sigla FC." },
            { t: "Contenuti Editoriali", d: "Volume illustrato ARCANI e accesso esclusivo alle composizioni sonore originali dell'opera." },
            { t: "Autenticità & Stampe", d: "Certificato di Autenticità compilato a mano e una stampa Fine Art di un Arcano a scelta, firmata e datata." },
            { t: "Esclusività & Invio", d: "Edizione limitata a soli 33 esemplari numerati, con spedizione gratuita inclusa per ogni ordine." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="h-full p-6 border" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                <h3 className="font-display text-lg text-gold-bright tracking-wide2">{c.t}</h3>
                <p className="font-serif-el text-lg text-[#a29b93] mt-2 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDITIONS */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-16" data-testid="editions-section">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-[#f3eee7]">Le Edizioni Disponibili</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {editions.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <div
                data-testid={`edition-${i}`}
                className="relative h-full p-8 md:p-10 border flex flex-col"
                style={{
                  borderColor: e.highlight ? "var(--gold)" : "var(--line)",
                  background: e.highlight ? "linear-gradient(160deg, #1e1a29, #14111c)" : "var(--surface)",
                }}
              >
                {e.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 font-ui text-[0.62rem] tracking-[0.25em] uppercase text-[#0b0a0f]"
                        style={{ background: "var(--gold)" }}>
                    {e.tag}
                  </span>
                )}
                <h3 className="font-display text-2xl text-[#f3eee7] tracking-wide2">{e.name}</h3>
                <div className="font-display text-5xl text-gold-bright mt-4">{e.price}</div>
                <ul className="mt-7 space-y-3 flex-1">
                  {e.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-serif-el text-lg text-[#d8d2ca]">
                      <Check size={18} className="text-gold mt-1 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                   data-testid={`edition-cta-${i}`}
                   className="btn-gold mt-9 justify-center w-full">
                  <MessageCircle size={16} /> {e.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 22 ARCANI GALLERY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16" data-testid="arcani-gallery-section">
        <Reveal className="text-center mb-14">
          <div className="divider-ornament mb-6"><Sparkles size={16} className="text-gold" /></div>
          <h2 className="font-display text-3xl md:text-4xl text-[#f3eee7]">I 22 Archetipi dell'Anima</h2>
          <p className="font-serif-el text-lg text-[#a29b93] mt-3">
            Ogni Arcano custodisce un nome, un simbolo e un messaggio nel viaggio della coscienza.
          </p>
        </Reveal>
        <Gallery images={arcaniImages} testid="arcani-gallery" />
      </section>
    </div>
  );
}
