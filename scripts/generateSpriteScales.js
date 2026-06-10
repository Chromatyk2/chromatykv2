const fs = require("fs");
const path = require("path");
const gifFrames = require("gif-frames");
const sharp = require("sharp");

const SPRITES_FOLDER = path.join(
    __dirname,
    "../public/Sprites/normal"
);

const OUTPUT_FILE = path.join(
    __dirname,
    "../src/data/sprite_scales.json"
);

// Raichu = référence
const REFERENCE_POKEMON = "583.gif";

function median(values) {

    if (!values.length) return 0;

    const sorted = [...values].sort((a, b) => a - b);

    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2;
}

function streamToBuffer(stream) {

    return new Promise((resolve, reject) => {

        const chunks = [];

        stream.on("data", chunk => chunks.push(chunk));

        stream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        stream.on("error", reject);
    });
}

async function getFrameBoundingBox(frame) {

    const pngBuffer =
        await streamToBuffer(
            frame.getImage()
        );

    const { data, info } =
        await sharp(pngBuffer)
            .ensureAlpha()
            .raw()
            .toBuffer({
                resolveWithObject: true
            });

    let minX = info.width;
    let minY = info.height;

    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < info.height; y++) {

        for (let x = 0; x < info.width; x++) {

            const idx =
                (y * info.width + x) * 4;

            const alpha =
                data[idx + 3];

            if (alpha > 0) {

                if (x < minX) minX = x;
                if (y < minY) minY = y;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (maxX === -1) {
        return null;
    }

    return {
        width: maxX - minX + 1,
        height: maxY - minY + 1
    };
}

async function getMedianArea(gifPath) {

    const frames = await gifFrames({
        url: gifPath,
        frames: "all",
        outputType: "png",
        cumulative: true
    });

    const areas = [];

    for (const frame of frames) {

        const bbox =
            await getFrameBoundingBox(frame);

        if (!bbox) continue;

        areas.push(
            bbox.width * bbox.height
        );
    }

    return median(areas);
}

async function main() {

    const files =
        fs.readdirSync(SPRITES_FOLDER)
            .filter(file =>
                file.endsWith(".gif")
            );

    console.log(
        "Calcul de la référence..."
    );

    const referenceArea =
        await getMedianArea(
            path.join(
                SPRITES_FOLDER,
                REFERENCE_POKEMON
            )
        );

    console.log(
        "Raichu reference area:",
        referenceArea
    );

    const result = {};

    let processed = 0;

    for (const file of files) {

        try {

            const pokemonNumber =
                path.basename(
                    file,
                    ".gif"
                );

            const medianArea =
                await getMedianArea(
                    path.join(
                        SPRITES_FOLDER,
                        file
                    )
                );

            let scale =
                Math.sqrt(
                    referenceArea /
                    medianArea
                );

            // Limites de sécurité
            scale = Math.max(
                0.50,
                Math.min(
                    2.00,
                    scale
                )
            );

            result[pokemonNumber] = {
                medianArea,
                scale: Number(
                    scale.toFixed(3)
                )
            };

            processed++;

            console.log(
                `${processed}/${files.length}`,
                pokemonNumber,
                "area:",
                medianArea,
                "scale:",
                scale.toFixed(3)
            );

        } catch (err) {

            console.error(
                file,
                err.message
            );
        }
    }

    fs.mkdirSync(
        path.dirname(
            OUTPUT_FILE
        ),
        { recursive: true }
    );

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            result,
            null,
            2
        )
    );

    console.log(
        "Terminé !"
    );

    console.log(
        "Fichier généré :",
        OUTPUT_FILE
    );
}

main();