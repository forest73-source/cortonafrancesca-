import os, json
from PIL import Image, ImageOps

MEDIA = "/app/frontend/public/media"
MAX_DIM = 2000  # cap for faster loading, keeps quality for lightbox

converted = 0
saved_before = 0
saved_after = 0

for root, _, files in os.walk(MEDIA):
    for f in files:
        if f.lower().endswith((".jpg", ".jpeg")):
            src = os.path.join(root, f)
            dst = os.path.splitext(src)[0] + ".webp"
            saved_before += os.path.getsize(src)
            try:
                im = Image.open(src)
                im = ImageOps.exif_transpose(im)
                if im.mode not in ("RGB", "RGBA"):
                    im = im.convert("RGB")
                w, h = im.size
                if max(w, h) > MAX_DIM:
                    scale = MAX_DIM / max(w, h)
                    im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
                im.save(dst, "WEBP", quality=82, method=6)
                saved_after += os.path.getsize(dst)
                os.remove(src)
                converted += 1
            except Exception as e:
                print("FAIL", src, e)

print(f"Converted {converted} images")
print(f"Before: {saved_before/1024/1024:.1f} MB  After: {saved_after/1024/1024:.1f} MB")

# Update content.json
cj = "/app/frontend/src/data/content.json"
with open(cj) as fh:
    data = json.load(fh)
def fix(s):
    return s.replace(".jpg", ".webp").replace(".jpeg", ".webp")
for o in data["opere"]:
    o["cover"] = fix(o["cover"])
    for img in o["images"]:
        img["src"] = fix(img["src"])
for a in data["arcani"]:
    a["src"] = fix(a["src"])
with open(cj, "w") as fh:
    json.dump(data, fh, ensure_ascii=False, indent=2)
print("content.json updated to .webp")
