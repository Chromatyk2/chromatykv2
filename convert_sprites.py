from PIL import Image
from pathlib import Path

SOURCE = Path("public/Sprites")
DEST = Path("public/Sprites_webp")

total_gif = 0
total_webp = 0
count = 0

for gif_path in SOURCE.rglob("*.gif"):

    relative = gif_path.relative_to(SOURCE)
    output = DEST / relative.with_suffix(".webp")

    output.parent.mkdir(parents=True, exist_ok=True)

    try:
        with Image.open(gif_path) as im:

            # Se placer sur la première frame
            im.seek(0)

            # Conserver la transparence
            frame = im.convert("RGBA")

            # Enregistrer uniquement cette frame en WebP
            frame.save(
                output,
                "WEBP",
                quality=90,
                method=6
            )

            gif_size = gif_path.stat().st_size
            webp_size = output.stat().st_size

            total_gif += gif_size
            total_webp += webp_size
            count += 1

            reduction = (1 - webp_size / gif_size) * 100

            print(
                f"{gif_path.name:25} "
                f"{gif_size / 1024:8.0f} Ko -> "
                f"{webp_size / 1024:8.0f} Ko "
                f"(-{reduction:.1f}%)"
            )

    except Exception as e:
        print(f"ERREUR : {gif_path}")
        print(e)

print()
print("=" * 60)
print(f"{count} fichiers convertis")
print(f"GIF  : {total_gif / 1024 / 1024:.2f} Mo")
print(f"WebP : {total_webp / 1024 / 1024:.2f} Mo")

if total_gif:
    reduction = (1 - total_webp / total_gif) * 100
    print(f"Réduction totale : {reduction:.1f}%")

print("=" * 60)