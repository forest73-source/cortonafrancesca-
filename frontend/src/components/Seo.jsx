import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { SEO, OG_LOCALE } from "@/i18n/seo";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Seo() {
  const { lang, t } = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    const map = {
      "/": t.nav.home,
      "/arcani": t.nav.arcani,
      "/opere": t.nav.opere,
      "/mostre": t.nav.mostreFull,
      "/7-chakra": t.nav.chakra,
      "/contatti": t.nav.contatti,
    };
    let label = map[pathname];
    if (!label && pathname.startsWith("/opere/")) label = t.nav.opere;
    document.title = label ? `Cortona Francesca — ${label}` : "Cortona Francesca — Arte, Arcani & Opere";

    const desc = (SEO[lang] || SEO.it).desc;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[name="twitter:description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[name="twitter:title"]', "content", document.title);
    setMeta('meta[property="og:locale"]', "content", OG_LOCALE[lang] || "it_IT");
  }, [lang, pathname, t]);

  return null;
}
