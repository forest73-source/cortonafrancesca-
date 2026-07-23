# Cortona Francesca — Sito d'Arte

## Problem Statement
Sito d'arte per l'artista Cortona Francesca (esistente su Cloudflare Pages). Richieste principali:
- Home = biografia, con nome invertito in "CORTONA FRANCESCA".
- Sezione Arcani con titolo grande "ARCANI" in alto e "DI CORTONA FRANCESCA" sotto.
- Nuova sezione "Opere" con menu a tendina: Innocence Serie I/II/III, Maestri di Marmo, Frammenti, Dopo di Noi. Ogni voce = pagina con foto + testo.
- Risolvere immagini non visibili (causa: spazi/caratteri speciali nei nomi file).
- Foto cliccabili che si ingrandiscono (lightbox).
- Contatti con loghi Facebook e Instagram (reindirizzamento).

## Architettura
- React 19 SPA (react-router 7), framer-motion, lucide-react, Tailwind. NESSUN backend/DB.
- Contenuti statici in `src/data/content.json` (6 collezioni + 22 arcani) e `src/data/site.js` (contatti/social).
- Immagini in `frontend/public/media/opere/<slug>/N.jpg` e `frontend/public/media/arcani/arcano-N.jpg` (rinominate con slug puliti per risolvere il bug immagini).
- Design: galleria d'arte dark, accenti oro, font Cinzel (display) + Cormorant Garamond (serif) + Jost (UI).

## Implementato (Giugno 2026)
- Home (hero + biografia + arcani in evidenza), Arcani (titolo + cofanetto + edizioni + galleria 22), Opere (hero + dropdown + grid), pagine collezione /opere/:slug (testo + galleria), Contatti (social + form mailto), Footer con social.
- Lightbox riutilizzabile (Gallery.jsx) con prev/next/tastiera/ESC.
- Navbar con dropdown Opere (desktop + mobile).
- `public/_redirects` per SPA routing su Cloudflare Pages.
- Testing agent: 100% frontend pass (immagini, lightbox, dropdown, link social).

## Backlog / Next
- P1: Aggiungere schede dettaglio per singolo Arcano (nome + significato).
- P2: SEO/OpenGraph meta + sitemap, ottimizzazione peso immagini (webp).
- P2: Deploy: `yarn build` → cartella `build` su Cloudflare Pages.

## Aggiornamenti (Giugno 2026)
- Ripristinate 2 sezioni mancanti: **Mostre & Critica** (/mostre) e **7 Chakra** (/7-chakra).
- Inserito il **CV** nella biografia (Home) in modo elegante: timeline Studi & Formazione, Lingue, Interessi + pulsante download PDF (`public/cv-francesca-cortona.pdf`).
- Su richiesta utente: NESSUN link di reindirizzamento esterno (contenuti inline). Link OpenSea in Home sostituito con link interno a /7-chakra.
- Navbar e Footer aggiornati con le nuove voci. Dati centralizzati in `src/data/extra.js`.
- Immagini convertite in WebP (41MB→12MB) + meta OpenGraph/Twitter con og-image.jpg.
- Cloudflare Pages: ricordare Root directory = `frontend`, build `yarn build`, output `build`.
- Testing agent: iteration_2 100% pass.
