import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Reveal from "@/components/Reveal";

/*
  images: [{ src, caption }]
  columns: base column layout
*/
export default function Gallery({ images, testid = "gallery" }) {
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  const close = useCallback(() => setIndex(-1), []);
  const prev = useCallback(
    (e) => { e && e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length); },
    [images.length]
  );
  const next = useCallback(
    (e) => { e && e.stopPropagation(); setIndex((i) => (i + 1) % images.length); },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div
        data-testid={testid}
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
      >
        {images.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 0.08}>
            <figure
              className="card-hover group relative overflow-hidden cursor-pointer break-inside-avoid border"
              style={{ borderColor: "var(--line)" }}
              onClick={() => setIndex(i)}
              data-testid={`${testid}-item-${i}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full block"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: "linear-gradient(to top, rgba(11,10,15,0.9) 0%, transparent 55%)" }} />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-6px] group-hover:translate-y-0">
                <span className="flex items-center justify-center w-9 h-9 border text-gold-bright" style={{ borderColor: "var(--gold)", background: "rgba(11,10,15,0.5)" }}>
                  <ZoomIn size={16} />
                </span>
              </div>
              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="font-serif-el text-[#ece7e1] text-[0.98rem] leading-snug">{img.caption}</p>
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(6,5,9,0.96)", backdropFilter: "blur(6px)" }}
            onClick={close}
            data-testid="lightbox"
          >
            <button onClick={close} data-testid="lightbox-close"
              className="absolute top-5 right-5 md:top-8 md:right-10 text-[#cfc9c1] hover:text-gold-bright transition-colors z-10">
              <X size={32} />
            </button>

            <button onClick={prev} data-testid="lightbox-prev"
              className="absolute left-3 md:left-8 text-[#cfc9c1] hover:text-gold-bright transition-colors z-10">
              <ChevronLeft size={44} />
            </button>
            <button onClick={next} data-testid="lightbox-next"
              className="absolute right-3 md:right-8 text-[#cfc9c1] hover:text-gold-bright transition-colors z-10">
              <ChevronRight size={44} />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="flex flex-col items-center max-w-[92vw] max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index].src}
                alt={images[index].caption}
                className="max-w-[92vw] max-h-[76vh] object-contain shadow-2xl"
                style={{ boxShadow: "0 0 80px rgba(201,162,75,0.12)" }}
              />
              {images[index].caption && (
                <p className="font-serif-el text-center text-[#d8d2ca] text-base md:text-lg mt-5 max-w-2xl px-4">
                  {images[index].caption}
                </p>
              )}
              <span className="font-ui text-[0.7rem] tracking-[0.3em] text-[#8a837b] mt-2">
                {index + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
