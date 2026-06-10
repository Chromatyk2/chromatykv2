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

const TARGET_OCCUPATION = 0.50;
const COEFF = 1.5;
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

async function getMedianOccupation(gifPath) {

    const frames = await gifFrames({
        url: gifPath,
        frames: "all",
        outputType: "png",
        cumulative: true
    });

    const occupations = [];

    for (const frame of frames) {

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

        let visiblePixels = 0;

        for (let i = 3; i < data.length; i += 4) {

            if (data[i] > 0) {
                visiblePixels++;
            }
        }

        const canvasArea =
            info.width * info.height;

        occupations.push(
            visiblePixels / canvasArea
        );
    }

    return median(occupations);
}

async function main() {

    const files =
        fs.readdirSync(SPRITES_FOLDER)
            .filter(file =>
                file.endsWith(".gif")
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

            const occupation =
                await getMedianOccupation(
                    path.join(
                        SPRITES_FOLDER,
                        file
                    )
                );

            let scale =
                1 +
                (
                    TARGET_OCCUPATION -
                    occupation
                ) * COEFF;

            scale = Math.max(
                0.70,
                Math.min(
                    1.30,
                    scale
                )
            );

            result[pokemonNumber] = {
                occupation:
                    Number(
                        occupation.toFixed(4)
                    ),
                scale:
                    Number(
                        scale.toFixed(3)
                    )
            };

            processed++;

            console.log(
                `${processed}/${files.length}`,
                pokemonNumber,
                "occupation:",
                occupation.toFixed(4),
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
        "\nTerminé !"
    );

    console.log(
        "Fichier généré :",
        OUTPUT_FILE
    );
}

main();