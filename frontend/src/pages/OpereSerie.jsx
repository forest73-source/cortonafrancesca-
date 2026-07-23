import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import content from "@/data/content.json";

export default function OpereSerie() {
  const { slug } = useParams();
  const idx = content.opere.findIndex((o) => o.slug === slug);
  if (idx === -1) return <Navigate to="/opere" replace />;

  const serie = content.opere[idx];
  const next = content.opere[(idx + 1) % content.opere.length];

  return (
    <div data-testid="opere-serie-page">
      {/* HERO */}
      <section className="relative pt-36 pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <img src={serie.cover} alt={serie.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,10,15,0.85), var(--bg))" }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <Link to="/opere" data-testid="back-to-opere"
                  className="inline-flex items-center gap-2 font-ui text-[0.72rem] tracking-[0.3em] uppercase text-[#a29b93] hover:text-gold-bright transition-colors mb-8">
              <ArrowLeft size={14} /> Tutte le Opere
            </Link>
            <p className="font-ui text-[0.72rem] tracking-[0.4em] uppercase text-gold mb-4">{serie.subtitle}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#f3eee7] leading-none tracking-wide2">
              {serie.title}
            </h1>
            <p className="font-serif-el italic text-xl text-[#c7c0b7] mt-5">{serie.year}</p>
          </motion.div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-16" data-testid="serie-description">
        <div className="divider-ornament mb-10"><Sparkles size={15} className="text-gold" /></div>
        {serie.desc.split("\n\n").map((para, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className={`font-serif-el leading-relaxed text-[#d8d2ca] mb-6 ${i === 0 ? "text-2xl md:text-[1.55rem]" : "text-xl"}`}>
              {para}
            </p>
          </Reveal>
        ))}
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16" data-testid="serie-gallery-section">
        <Reveal className="mb-10 flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-display text-2xl md:text-3xl text-[#f3eee7]">Le Opere</h2>
          <span className="font-ui text-sm tracking-wide2 text-[#8a837b]">{serie.images.length} opere · clicca per ingrandire</span>
        </Reveal>
        <Gallery images={serie.images} testid="serie-gallery" />
      </section>

      {/* NEXT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <Link to={`/opere/${next.slug}`} data-testid="next-serie"
              className="group flex items-center justify-between p-8 border transition-colors hover:border-[var(--gold)]"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <div>
            <span className="font-ui text-[0.68rem] tracking-[0.3em] uppercase text-[#8a837b]">Prossima Collezione</span>
            <div className="font-display text-2xl md:text-3xl text-[#f3eee7] mt-2 group-hover:text-gold-bright transition-colors tracking-wide2">
              {next.title} <span className="text-lg text-[#8a837b]">— {next.subtitle}</span>
            </div>
          </div>
          <ArrowRight size={30} className="text-gold group-hover:translate-x-2 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
