import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import content from "@/data/content.json";

export default function Opere() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div data-testid="opere-page">
      {/* HERO TITLE */}
      <section className="relative pt-40 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h1 className="font-display text-[3.4rem] sm:text-[5.5rem] lg:text-[7rem] leading-none text-[#f3eee7] tracking-[0.08em]">
            OPERE
          </h1>
          <div className="divider-ornament my-6"><Sparkles size={16} className="text-gold" /></div>
          <p className="font-display text-gold-bright text-base sm:text-xl tracking-[0.42em] uppercase">
            di Cortona Francesca
          </p>
        </motion.div>
      </section>

      {/* DROPDOWN SELECTOR */}
      <section className="max-w-xl mx-auto px-6 pb-20" data-testid="opere-selector">
        <Reveal>
          <p className="text-center font-serif-el text-lg text-[#a29b93] mb-4">
            Seleziona una collezione
          </p>
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              data-testid="opere-select-trigger"
              className="w-full flex items-center justify-between px-6 py-4 border font-ui tracking-wide2 uppercase text-sm text-[#ece7e1] transition-colors hover:border-[var(--gold)]"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}
            >
              Tutte le opere
              <ChevronDown size={18} className={`text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-0 right-0 mt-2 z-30 border overflow-hidden"
                  style={{ background: "rgba(18,16,26,0.98)", borderColor: "var(--line)", backdropFilter: "blur(14px)" }}
                  data-testid="opere-select-list"
                >
                  {content.opere.map((o) => (
                    <li key={o.slug}>
                      <button
                        onClick={() => navigate(`/opere/${o.slug}`)}
                        data-testid={`select-${o.slug}`}
                        className="w-full text-left px-6 py-3.5 flex items-center justify-between border-b hover:bg-[#1e1a29] transition-colors"
                        style={{ borderColor: "rgba(201,162,75,0.08)" }}
                      >
                        <span className="font-serif-el text-lg text-[#ece7e1]">
                          {o.title} <span className="text-[#8a837b] text-base">— {o.subtitle}</span>
                        </span>
                        <ArrowRight size={15} className="text-gold" />
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      {/* SERIES GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16" data-testid="opere-grid">
        <div className="grid md:grid-cols-2 gap-7">
          {content.opere.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 2) * 0.1}>
              <Link
                to={`/opere/${o.slug}`}
                data-testid={`serie-card-${o.slug}`}
                className="card-hover group relative block overflow-hidden border vignette"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="h-[440px] overflow-hidden">
                  <img src={o.cover} alt={o.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8"
                     style={{ background: "linear-gradient(to top, rgba(11,10,15,0.95) 5%, transparent 60%)" }}>
                  <span className="font-display text-gold text-xs tracking-[0.35em]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-3xl md:text-4xl text-[#f3eee7] mt-2 tracking-wide2">{o.title}</h3>
                  <p className="font-ui text-[0.7rem] tracking-[0.28em] uppercase text-gold-bright mt-2">{o.subtitle}</p>
                  <span className="inline-flex items-center gap-2 font-ui text-sm text-[#cfc9c1] mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Scopri la collezione <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
