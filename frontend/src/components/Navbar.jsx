import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/data/content.json";

const navBase = "font-ui tracking-wide2 text-[0.78rem] uppercase transition-colors duration-300";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openOpere, setOpenOpere] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setOpenOpere(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `${navBase} ${isActive ? "text-gold-bright" : "text-[#cfc9c1] hover:text-gold-bright"}`;

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(11,10,15,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
        <Link to="/" data-testid="logo-link" className="group flex flex-col leading-none">
          <span className="font-display text-gold-bright text-[1.05rem] md:text-[1.25rem] tracking-[0.22em]">
            CORTONA
          </span>
          <span className="font-ui text-[#b6afa6] text-[0.6rem] md:text-[0.68rem] tracking-[0.5em] mt-1 pl-1">
            FRANCESCA
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-9">
          <NavLink to="/" className={linkClass} data-testid="nav-home">Home</NavLink>
          <NavLink to="/arcani" className={linkClass} data-testid="nav-arcani">Arcani</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setOpenOpere(true)}
            onMouseLeave={() => setOpenOpere(false)}
          >
            <NavLink
              to="/opere"
              data-testid="nav-opere"
              className={({ isActive }) =>
                `${navBase} flex items-center gap-1.5 ${
                  isActive || location.pathname.startsWith("/opere")
                    ? "text-gold-bright"
                    : "text-[#cfc9c1] hover:text-gold-bright"
                }`
              }
            >
              Opere <ChevronDown size={13} className={`transition-transform duration-300 ${openOpere ? "rotate-180" : ""}`} />
            </NavLink>

            <AnimatePresence>
              {openOpere && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  data-testid="opere-dropdown"
                  className="absolute right-0 top-full pt-4 w-[290px]"
                >
                  <div
                    className="border overflow-hidden"
                    style={{ background: "rgba(18,16,26,0.97)", borderColor: "var(--line)", backdropFilter: "blur(14px)" }}
                  >
                    {content.opere.map((o, i) => (
                      <Link
                        key={o.slug}
                        to={`/opere/${o.slug}`}
                        data-testid={`dropdown-${o.slug}`}
                        className="group flex items-center justify-between px-5 py-3.5 border-b transition-colors duration-300 hover:bg-[#1e1a29]"
                        style={{ borderColor: "rgba(201,162,75,0.08)" }}
                      >
                        <div className="flex flex-col">
                          <span className="font-serif-el text-[1.12rem] text-[#ece7e1] group-hover:text-gold-bright transition-colors">
                            {o.title}
                          </span>
                          <span className="font-ui text-[0.62rem] tracking-[0.2em] uppercase text-[#8a837b]">
                            {o.subtitle}
                          </span>
                        </div>
                        <span className="font-display text-gold text-xs opacity-40 group-hover:opacity-100 transition-opacity">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/contatti" className={linkClass} data-testid="nav-contatti">Contatti</NavLink>
        </div>

        <button
          className="md:hidden text-gold-bright"
          onClick={() => setMobile((m) => !m)}
          data-testid="mobile-menu-toggle"
          aria-label="Menu"
        >
          {mobile ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(11,10,15,0.98)", borderTop: "1px solid var(--line)" }}
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {[
                { to: "/", label: "Home" },
                { to: "/arcani", label: "Arcani" },
              ].map((l) => (
                <NavLink key={l.to} to={l.to} className="font-serif-el text-2xl py-2 text-[#ece7e1]">
                  {l.label}
                </NavLink>
              ))}
              <div className="py-2">
                <span className="font-display text-gold text-[0.7rem] tracking-[0.3em] uppercase">Opere</span>
                <div className="pl-3 mt-2 flex flex-col gap-1 border-l" style={{ borderColor: "var(--line)" }}>
                  {content.opere.map((o) => (
                    <Link key={o.slug} to={`/opere/${o.slug}`} className="font-serif-el text-xl py-1.5 text-[#cfc9c1]">
                      {o.title} <span className="text-sm text-[#8a837b]">— {o.subtitle}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <NavLink to="/contatti" className="font-serif-el text-2xl py-2 text-[#ece7e1]">
                Contatti
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
