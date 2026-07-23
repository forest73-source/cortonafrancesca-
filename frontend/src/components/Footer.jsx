import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative mt-24 border-t" style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-gold-bright text-xl tracking-[0.22em]">CORTONA</div>
          <div className="font-ui text-[#b6afa6] text-[0.68rem] tracking-[0.5em] mt-1">FRANCESCA</div>
          <p className="font-serif-el text-[#a29b93] text-lg mt-5 leading-relaxed max-w-xs">
            Artista contemporanea, pittrice e ricercatrice spirituale. L'arte come Guarigione.
          </p>
        </div>

        <div>
          <h4 className="font-display text-[0.75rem] tracking-[0.3em] text-gold uppercase mb-5">Naviga</h4>
          <ul className="space-y-3 font-ui text-[#cfc9c1]">
            <li><Link to="/" className="link-underline hover:text-gold-bright transition-colors">Home</Link></li>
            <li><Link to="/arcani" className="link-underline hover:text-gold-bright transition-colors">Arcani</Link></li>
            <li><Link to="/opere" className="link-underline hover:text-gold-bright transition-colors">Opere</Link></li>
            <li><Link to="/contatti" className="link-underline hover:text-gold-bright transition-colors">Contatti</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[0.75rem] tracking-[0.3em] text-gold uppercase mb-5">Seguimi</h4>
          <div className="flex items-center gap-4">
            {[
              { href: SITE.facebook, icon: Facebook, label: "Facebook", testid: "footer-facebook" },
              { href: SITE.instagram, icon: Instagram, label: "Instagram", testid: "footer-instagram" },
              { href: `https://wa.me/${SITE.whatsapp}`, icon: MessageCircle, label: "WhatsApp", testid: "footer-whatsapp" },
              { href: `mailto:${SITE.email}`, icon: Mail, label: "Email", testid: "footer-email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-testid={s.testid}
                className="flex items-center justify-center w-11 h-11 border text-[#cfc9c1] hover:text-[#0b0a0f] hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all duration-400"
                style={{ borderColor: "var(--line)" }}
              >
                <s.icon size={19} />
              </a>
            ))}
          </div>
          <p className="font-ui text-[#8a837b] text-sm mt-6">{SITE.email}</p>
        </div>
      </div>
      <div className="border-t py-6 text-center" style={{ borderColor: "var(--line)" }}>
        <p className="font-ui text-[0.72rem] tracking-[0.2em] text-[#726c66] uppercase">
          © {new Date().getFullYear()} Cortona Francesca — Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}
