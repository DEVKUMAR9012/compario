"""
Compario 840 Product Image Downloader
-------------------------------------
Run this script on your PC with internet access.

It reads:
    Pasted text(20260925-091605).txt

Then downloads ONE image per product using Bing image search and creates:
    Compario_Product_Images/
    Compario_Product_Images.zip
    Compario_Product_Images/index.csv

Install:
    py -m pip install icrawler

Run:
    py download_compario_images.py

Note:
- Search-engine results can contain copyrighted images. Check the image/source
  licenses before using them commercially.
- Some catalog entries are custom variants/bundles and may not have a unique
  real-world product image. For those, the script may return a base-product
  image or no image.
"""

from pathlib import Path
import csv
import re
import shutil
import time
from icrawler.builtin import BingImageCrawler

CATALOG = Path("Pasted text(20260925-091605).txt")
OUT = Path("Compario_Product_Images")
ZIP_NAME = Path("Compario_Product_Images")

def parse_catalog(path):
    text = path.read_text(encoding="utf-8")
    products = []
    category = None

    for line in text.splitlines():
        m = re.match(r"##\s+(.+?)\s+\((\d+)\)", line.strip())
        if m:
            category = m.group(1).strip().title()
            continue

        # Markdown table row: | Brand | Product | Price |
        m = re.match(
            r"\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*₹?[\d,]+(?:\.\d+)?\s*\|",
            line.strip()
        )
        if not m or not category:
            continue

        brand = m.group(1).strip()
        product = m.group(2).strip()

        if brand.lower() in {"brand", "manufacturer"}:
            continue

        products.append({
            "id": len(products) + 1,
            "category": category,
            "brand": brand,
            "product": product,
            "query": f"{brand} {product}"
        })

    return products

def safe_name(s):
    s = re.sub(r'[<>:"/\\|?*]+', "", s)
    s = re.sub(r"\s+", "_", s.strip())
    return s[:120]

def download_one(item):
    category_dir = OUT / safe_name(item["category"])
    product_dir = category_dir / f'{item["id"]:03d}_{safe_name(item["brand"] + "_" + item["product"])}'
    product_dir.mkdir(parents=True, exist_ok=True)

    crawler = BingImageCrawler(
        feeder_threads=1,
        parser_threads=1,
        downloader_threads=4,
        storage={"root_dir": str(product_dir)}
    )

    # Download a few candidates so the first usable image can be retained.
    try:
        crawler.crawl(
            keyword=item["query"],
            max_num=3,
            filters={"type": "photo", "size": "large"}
        )
    except Exception as e:
        print(f"[ERROR] {item['id']:03d}: {item['query']} -> {e}")
        return None

    images = sorted(
        p for p in product_dir.iterdir()
        if p.is_file() and p.suffix.lower() in {
            ".jpg", ".jpeg", ".png", ".webp", ".bmp"
        }
    )

    if not images:
        print(f"[MISS]  {item['id']:03d}: {item['query']}")
        return None

    # Keep the first result and remove extra candidates.
    chosen = images[0]
    final_name = f'{item["id"]:03d}_{safe_name(item["brand"] + "_" + item["product"])}{chosen.suffix.lower()}'
    final_path = category_dir / final_name

    if chosen != final_path:
        if final_path.exists():
            final_path.unlink()
        shutil.move(str(chosen), str(final_path))

    for p in product_dir.iterdir():
        if p.is_file():
            p.unlink()
    product_dir.rmdir()

    print(f"[OK]    {item['id']:03d}: {item['query']}")
    return final_path

def main():
    if not CATALOG.exists():
        raise FileNotFoundError(
            f"Catalog not found: {CATALOG}\n"
            "Put this script in the same folder as your catalog file."
        )

    products = parse_catalog(CATALOG)
    print(f"Found {len(products)} products.")

    if len(products) != 840:
        print("WARNING: Expected 840 products. Check the catalog format.")

    OUT.mkdir(exist_ok=True)

    index_rows = []
    for item in products:
        path = download_one(item)

        index_rows.append({
            "id": item["id"],
            "category": item["category"],
            "brand": item["brand"],
            "product": item["product"],
            "query": item["query"],
            "image_file": str(path.relative_to(OUT)) if path else "",
            "status": "downloaded" if path else "not_found"
        })

        # Small pause to reduce request bursts.
        time.sleep(0.3)

    with (OUT / "index.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "id", "category", "brand", "product",
                "query", "image_file", "status"
            ]
        )
        writer.writeheader()
        writer.writerows(index_rows)

    zip_path = shutil.make_archive(
        str(ZIP_NAME), "zip", root_dir=OUT.parent, base_dir=OUT.name
    )

    ok = sum(1 for x in index_rows if x["status"] == "downloaded")
    print()
    print("=" * 60)
    print(f"Finished: {ok}/{len(products)} images downloaded")
    print(f"Folder:  {OUT.resolve()}")
    print(f"ZIP:     {Path(zip_path).resolve()}")
    print("=" * 60)

if __name__ == "__main__":
    main()
