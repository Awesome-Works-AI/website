"""Generate AwesomeWorks brandbook assets from the master raster logo.

The master (website/public/logo.png) is the AW gradient monogram BAKED onto the
dark site background (no alpha). We derive alpha by color distance from the
background, tight-crop, and emit gradient / white / ink variants plus a dark
avatar tile. There is no graphic wordmark — the name is always set in type.
"""

import sys
from pathlib import Path

from PIL import Image

SRC = Path.home() / "projects/website/public/logo.png"
OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
EMBED = OUT.parent / "_embed"
EMBED.mkdir(parents=True, exist_ok=True)

INK = (19, 19, 32)      # #131320 (foreground light-mode token)
WHITE = (255, 255, 255)
DARK_BG = (7, 7, 13)    # #07070D (background dark token)

img = Image.open(SRC).convert("RGB")
w, h = img.size
bg = img.getpixel((4, 4))

# Alpha from distance to the baked background: soft ramp keeps anti-aliasing.
D0, D1 = 26, 110
px = img.load()
alpha = Image.new("L", img.size, 0)
ap = alpha.load()
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        d = ((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2) ** 0.5
        a = 0 if d <= D0 else 255 if d >= D1 else int((d - D0) / (D1 - D0) * 255)
        ap[x, y] = a

mono = img.convert("RGBA")
mono.putalpha(alpha)
bbox = alpha.point(lambda a: 255 if a > 24 else 0).getbbox()
monogram = mono.crop(bbox)
print(f"master {w}x{h}, bg {bg}, monogram {monogram.size}")

# Sample gradient stops along the mark for the palette section.
mw, mh = monogram.size
mp = monogram.load()
for fx in (0.08, 0.35, 0.65, 0.92):
    xcol = int(mw * fx)
    best = None
    for y in range(mh):
        r, g, b, a = mp[xcol, y]
        if a > 200 and (best is None or a > best[3]):
            best = (r, g, b, a)
    print(f"stop@{fx:.2f}: {'#%02X%02X%02X' % best[:3] if best else 'n/a'}")


def recolor(im: Image.Image, rgb) -> Image.Image:
    out = Image.new("RGBA", im.size, rgb + (0,))
    solid = Image.new("RGBA", im.size, rgb + (255,))
    out.paste(solid, (0, 0), im.getchannel("A"))
    return out


def save(im: Image.Image, name: str, embed_max_w: int) -> None:
    im.save(OUT / name, optimize=True)
    if im.size[0] > embed_max_w:
        ratio = embed_max_w / im.size[0]
        small = im.resize((embed_max_w, round(im.size[1] * ratio)), Image.LANCZOS)
    else:
        small = im
    small.save(EMBED / name, optimize=True)


save(monogram, "monogram.png", 640)
save(recolor(monogram, WHITE), "monogram-white.png", 640)
save(recolor(monogram, INK), "monogram-ink.png", 640)

# Avatar / favicon tile: monogram centered on the dark token, ~24% margin.
side = int(max(monogram.size) * 1.48)
tile = Image.new("RGBA", (side, side), DARK_BG + (255,))
tile.paste(monogram, ((side - mw) // 2, (side - mh) // 2), monogram)
save(tile, "avatar-dark.png", 512)

for f in sorted(OUT.iterdir()):
    print(f"{f.name}: {f.stat().st_size // 1024} KB")
