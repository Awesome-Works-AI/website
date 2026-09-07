"""Vectorize the AwesomeWorks AW monogram from the raster master.

Reads assets/monogram.png (transparent, alpha-keyed from website/public/logo.png)
and writes monogram.svg (brand gradient), monogram-ink.svg, monogram-white.svg.

Pipeline: 6x LANCZOS upscale -> Gaussian blur(10) on alpha (straightens pixel
stairs so spline fitting yields straight diagonals) -> threshold 128 -> vtracer
binary spline trace -> single path, refilled per variant. The gradient stops are
sampled from the raster along the ink diagonal (bin averages of opaque pixels).

Run: uv run --with vtracer --with pillow python vectorize-logo.py
"""

import re
from pathlib import Path
import tempfile

import vtracer
from PIL import Image, ImageFilter

HERE = Path(__file__).parent
ASSETS = HERE / "assets"
SRC = ASSETS / "monogram.png"

GRAD = """<defs><linearGradient id="awGrad" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#BF96F2"/><stop offset=".19" stop-color="#B296F5"/>
<stop offset=".31" stop-color="#9D97F7"/><stop offset=".44" stop-color="#85A3F8"/>
<stop offset=".56" stop-color="#7BC7EA"/><stop offset=".69" stop-color="#8DE8CC"/>
<stop offset=".81" stop-color="#9AF1BB"/><stop offset="1" stop-color="#ACF6AB"/>
</linearGradient></defs>"""

im = Image.open(SRC).convert("RGBA")
big = im.resize((im.width * 6, im.height * 6), Image.LANCZOS)
alpha = big.getchannel("A").filter(ImageFilter.GaussianBlur(10))
mask = alpha.point(lambda v: 255 if v > 128 else 0)
flat = Image.new("RGB", big.size, (255, 255, 255))
flat.paste(Image.new("RGB", big.size, (0, 0, 0)), (0, 0), mask)

with tempfile.TemporaryDirectory() as td:
    flat_png = str(Path(td) / "flat.png")
    raw_svg = str(Path(td) / "raw.svg")
    flat.save(flat_png)
    vtracer.convert_image_to_svg_py(
        flat_png, raw_svg, colormode="binary",
        filter_speckle=60, mode="spline", corner_threshold=75, length_threshold=14.0,
    )
    raw = Path(raw_svg).read_text()

W = re.search(r'width="(\d+)"', raw).group(1)
H = re.search(r'height="(\d+)"', raw).group(1)
m = re.search(r'<path d="([^"]+)"[^>]*transform="([^"]*)"', raw, re.S)
d, tr = m.group(1), m.group(2)


def emit(name: str, fill: str, defs: str = "") -> None:
    out = ASSETS / name
    out.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
        f'{defs}<path d="{d}" transform="{tr}" fill="{fill}"/></svg>'
    )
    print(out, out.stat().st_size // 1024, "KB")


emit("monogram.svg", "url(#awGrad)", GRAD)
emit("monogram-ink.svg", "#131320")
emit("monogram-white.svg", "#FFFFFF")
