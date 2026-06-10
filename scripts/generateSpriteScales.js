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

// Ton Raichu de référence
const REFERENCE_POKEMON = "37.gif";

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

async function getMedianOpaquePixels(gifPath) {

    const frames = await gifFrames({
        url: gifPath,
        frames: "all",
        outputType: "png",
        cumulative: true
    });

    const pixelCounts = [];

    for (const frame of frames) {

        const pngBuffer =
            await streamToBuffer(
                frame.getImage()
            );

        const { data } =
            await sharp(pngBuffer)
                .ensureAlpha()
                .raw()
                .toBuffer({
                    resolveWithObject: true
                });

        let visiblePixels = 0;

        for (let i = 3; i < data.length; i += 4) {

            if (data[i] > 0) {
                visiblePixels++;
            }
        }

        pixelCounts.push(
            visiblePixels
        );
    }

    return median(pixelCounts);
}

async function main() {

    //const files =
    //    fs.readdirSync(SPRITES_FOLDER)
    //        .filter(file =>
    //            file.endsWith(".gif")
    //        );
    const files = [
        "37.gif",   // Raichu
        "418.gif",  // Dynavolt
        "656.gif",  // Grenousse
        "663.gif",  // Flambusard
        "201.gif",
        "418.gif"
    ];

    console.log(
        "Calcul de la référence..."
    );

    const referencePixels =
        await getMedianOpaquePixels(
            path.join(
                SPRITES_FOLDER,
                REFERENCE_POKEMON
            )
        );

    console.log(
        "Reference pixels:",
        referencePixels
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

            const medianPixels =
                await getMedianOpaquePixels(
                    path.join(
                        SPRITES_FOLDER,
                        file
                    )
                );

            let scale =
                Math.sqrt(
                    referencePixels /
                    medianPixels
                );

            // limites de sécurité
            scale = Math.max(
                0.6,
                Math.min(
                    1.6,
                    scale
                )
            );

            result[pokemonNumber] = {
                medianPixels,
                scale: Number(
                    scale.toFixed(3)
                )
            };

            processed++;

            console.log(
                `${processed}/${files.length}`,
                pokemonNumber,
                "pixels:",
                medianPixels,
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

    console.log("Terminé !");
}

main();