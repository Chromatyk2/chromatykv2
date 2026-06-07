const fs = require("fs");

function isAnimatedPng(filePath) {

    const buffer = fs.readFileSync(filePath);

    return (
        buffer.includes(Buffer.from("acTL")) ||
        buffer.includes(Buffer.from("fcTL")) ||
        buffer.includes(Buffer.from("fdAT"))
    );

}
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = path.join(__dirname, "../public/Skins");
const OUTPUT_DIR = path.join(__dirname, "../public/SkinsCentered");

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function centerSprite(file) {

    const input = path.join(INPUT_DIR, file);
    const output = path.join(OUTPUT_DIR, file);

    const image = sharp(input);

    const { data, info } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    let minX = info.width;
    let minY = info.height;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {

            const alpha =
                data[(y * info.width + x) * 4 + 3];

            if (alpha > 0) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    const sprite = await image
        .ensureAlpha()
        .extract({
            left: minX,
            top: minY,
            width: cropWidth,
            height: cropHeight
        })
        .png()
        .toBuffer();

    await sharp({
        create: {
            width: info.width,
            height: info.height,
            channels: 4,
            background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
            }
        }
    })
        .composite([{
            input: sprite,
            left: Math.floor(
                (info.width - cropWidth) / 2
            ),
            top: Math.floor(
                (info.height - cropHeight) / 2
            )
        }])
        .png()
        .toFile(output);

    console.log(`✓ ${file}`);
}

async function run() {

    const files = fs.readdirSync(INPUT_DIR)
        .filter(file => file.endsWith(".png"));

    let success = 0;
    let failed = 0;

    for (const file of files) {

        const input = path.join(INPUT_DIR, file);
        const output = path.join(OUTPUT_DIR, file);

        try {

            if (isAnimatedPng(input)) {

                fs.copyFileSync(input, output);

                console.log(
                    `📋 APNG copié sans modification : ${file}`
                );

                continue;

            }

            await centerSprite(file);

            console.log(`✓ ${file}`);

        } catch (err) {

            console.error(
                `✗ ${file} : ${err.message}`
            );

        }
    }

    console.log("");
    console.log(`Succès : ${success}`);
    console.log(`Échecs : ${failed}`);

    console.log("Terminé");
}

run();