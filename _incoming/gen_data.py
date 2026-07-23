import json, os

manifest = json.load(open("/app/_incoming/manifest.json"))

meta = {
  "innocence-1": {
    "title": "Innocence",
    "subtitle": "Serie I",
    "year": "17 oli su tela",
    "desc": "La serie d'esordio INNOCENCE I (17 oli su tela) segna un passaggio fondamentale nella ricerca artistica di Cortona. Attraverso una profonda sperimentazione sui colori primari e le loro sfumature viscerali, prende forma un'intensa metamorfosi visiva ed emotiva.\n\nDalle inquadrature parziali degli esordi, lo sguardo dell'artista si stringe progressivamente fino a \u201centrare\u201d nei soggetti stessi, abbattendo ogni distanza: lo spazio sulla tela si riduce per lasciare posto all'esplorazione dell'Anima. Un'immersione interiore che si intensifica ulteriormente nelle serie II e III, trasformando la pittura in un puro viaggio attraverso la profondit\u00e0 emotiva umana."
  },
  "innocence-2": {
    "title": "Innocence",
    "subtitle": "Serie II",
    "year": "Olio e pigmenti fotoluminescenti su lamiera zincata",
    "desc": "INNOCENCE \u2013 Serie II nasce dalla ricerca di Cortona sulla luce interiore e sul desiderio di dare nuova vita allo sguardo dei suoi soggetti attraverso l'arte.\n\nLe opere sono realizzate a mano su lamiera zincata con pigmenti foto-luminescenti naturali che, dopo essere stati caricati dalla luce, si illuminano al buio rivelando colori intensi e sorprendenti. Ogni dipinto \u00e8 il risultato di un lungo processo artigianale, in cui tecnica e sensibilit\u00e0 si fondono per creare un'esperienza visiva in continua trasformazione.\n\nLa luce diventa parte integrante dell'opera, rivelando ci\u00f2 che resta invisibile e invitando lo spettatore a intraprendere un viaggio verso la scoperta della propria luce interiore."
  },
  "innocence-3": {
    "title": "Innocence",
    "subtitle": "Serie III",
    "year": "10 oli su lamiera zincata \u2014 bianco e nero",
    "desc": "La Serie III di INNOCENCE rappresenta l'ultimo capitolo della serie, composta da 10 dipinti ad olio su lamiera zincata, tutti eseguiti in bianco e nero. Ogni lamiera viene preparata e lavorata dall'artista con la stessa attenzione ai dettagli e lo stesso procedimento accurato.\n\nCortona, con una profonda passione per il contrasto tra luce e ombra, fa emergere questo tema in modo distintivo attraverso il chiaroscuro presente in questa serie. L'uso del bianco e del nero permette all'artista di esplorare le sottili sfumature emotive di ogni singolo sguardo, creando una profondit\u00e0 e una intensit\u00e0 che cattura l'attenzione dello spettatore.\n\nIl risultato \u00e8 una collezione di opere che esplorano la profondit\u00e0 dell'animo umano attraverso il potente linguaggio del chiaroscuro."
  },
  "maestri-di-marmo": {
    "title": "Maestri di Marmo",
    "subtitle": "Omaggio a Caravaggio e Michelangelo",
    "year": "Olio su marmo di Carrara",
    "desc": "Con Maestri di Marmo, Cortona rende omaggio a due giganti della storia dell'arte: Caravaggio e Michelangelo.\n\nRealizzate su pregiato marmo di Carrara, le opere reinterpretano dettagli iconici come L'Incredulit\u00e0 di San Tommaso e La Creazione di Adamo, trasformandoli in un dialogo tra tradizione e contemporaneit\u00e0.\n\nIl marmo, simbolo di eternit\u00e0 e bellezza, diventa il supporto ideale per celebrare la forza espressiva di questi capolavori, offrendo allo spettatore una nuova prospettiva sulla loro straordinaria eredit\u00e0 artistica."
  },
  "frammenti": {
    "title": "Frammenti",
    "subtitle": "Olio su mattonella",
    "year": "2020",
    "desc": "FRAMMENTI \u00e8 una collezione di dipinti a olio su mattonelle di diverse dimensioni, dove ogni opera rappresenta un'emozione, un istante, una parte dell'esperienza umana.\n\nOgni mattonella \u00e8 un frammento di un racconto pi\u00f9 ampio: un dialogo tra colore, materia e sentimento che invita lo spettatore a riconoscersi nelle infinite sfumature dell'animo umano.\n\nLa variet\u00e0 dei formati crea un ritmo visivo dinamico, trasformando ogni opera in un tassello di un mosaico emotivo. Insieme, questi frammenti compongono una narrazione intensa e personale sulla complessit\u00e0 delle emozioni."
  },
  "dopo-di-noi": {
    "title": "Dopo di Noi",
    "subtitle": "Illustrazioni ispirate ai glifi astrologici",
    "year": "2024",
    "desc": ".DOPO DI NOI. \u00e8 il primo progetto nato dalla collaborazione tra due sorelle e due forme d'arte: la pittura di Cortona e la poesia della scrittrice Li\u00e8 Larousse.\n\nPer la raccolta poetica pubblicata nel 2024, Cortona ha realizzato la copertina e sette illustrazioni ispirate ai glifi astrologici, antichi simboli che racchiudono significati universali e spirituali.\n\nOgni illustrazione accompagna una poesia trasformandosi in un messaggio visivo che invita alla riflessione, alla crescita interiore e alla riscoperta del legame tra l'essere umano e l'universo."
  },
}

order = ["innocence-1","innocence-2","innocence-3","maestri-di-marmo","frammenti","dopo-di-noi"]
opere = []
for slug in order:
    m = meta[slug]
    opere.append({
        "slug": slug,
        "title": m["title"],
        "subtitle": m["subtitle"],
        "year": m["year"],
        "desc": m["desc"],
        "cover": manifest[slug][0]["src"],
        "images": manifest[slug],
    })

arcani_names = ["UNITAS","MATER","CREATIO","FIRMAS","FIDES","LUX ET UMBRIA","UNIVERSUM",
"STATERA SUBLIME","SAPIENTIA","INFINITUM","VIRTUS","LUMEN","MORTEM","ANGELUS","MATERIA",
"SANCTUARIUM","SPES","MYSTERIUM","NUCLEO SOLARIS","RESURGERE","CONCRETIO","LIBERTAS"]
arcani = [{"n": i+1, "name": n, "src": f"/media/arcani/arcano-{i+1}.jpg"} for i,n in enumerate(arcani_names)]

os.makedirs("/app/frontend/src/data", exist_ok=True)
with open("/app/frontend/src/data/content.json","w") as f:
    json.dump({"opere": opere, "arcani": arcani}, f, ensure_ascii=False, indent=2)
print("content.json written:", len(opere), "series,", len(arcani), "arcani")
