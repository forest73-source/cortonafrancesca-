import os, re, json, shutil

SRC = "/app/_incoming"
DST = "/app/frontend/public/media"
os.makedirs(DST, exist_ok=True)

series = [
    ("innocence serie |",   "innocence-1"),
    ("innocence serie ||",  "innocence-2"),
    ("innocence serie |||", "innocence-3"),
    ("maestri di marmo ",   "maestri-di-marmo"),
    ("frammenti",           "frammenti"),
    ("dopo di noi",         "dopo-di-noi"),
]

IMG_EXT = (".jpg", ".jpeg", ".png", ".JPG", ".JPEG")

def clean_caption(name):
    base = re.sub(r"\.(jpe?g|png)$", "", name, flags=re.I)
    # remove leading number + separator
    base = re.sub(r"^\s*\d+\s*[-\.\)]?\s*", "", base)
    base = base.replace(":", " ").strip()
    base = re.sub(r"\s+", " ", base)
    if base:
        base = base[0].upper() + base[1:]
    return base

def lead_num(name):
    m = re.match(r"\s*(\d+)", name)
    return int(m.group(1)) if m else 9999

manifest = {}
for folder, slug in series:
    fpath = os.path.join(SRC, folder)
    outdir = os.path.join(DST, "opere", slug)
    os.makedirs(outdir, exist_ok=True)
    files = [f for f in os.listdir(fpath) if f.lower().endswith((".jpg", ".jpeg", ".png")) and not f.startswith(".")]
    files.sort(key=lead_num)
    items = []
    for i, f in enumerate(files, 1):
        ext = ".jpg"
        outname = f"{i}{ext}"
        shutil.copy(os.path.join(fpath, f), os.path.join(outdir, outname))
        items.append({"src": f"/media/opere/{slug}/{outname}", "caption": clean_caption(f)})
    manifest[slug] = items
    print(f"{slug}: {len(items)} images")

# Arcani + portrait
arc_out = os.path.join(DST, "arcani")
os.makedirs(arc_out, exist_ok=True)
for f in os.listdir(os.path.join(SRC, "arcani")):
    if f.lower().endswith(".jpg"):
        shutil.copy(os.path.join(SRC, "arcani", f), os.path.join(arc_out, f))
print("arcani copied")

with open("/app/_incoming/manifest.json", "w") as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=2)
print("done")
