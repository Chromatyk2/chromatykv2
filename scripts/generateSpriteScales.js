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

// Raichu référence
const REFERENCE_POKEMON = "26.gif";

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
        stream.on("end", () => resolve(Buffer.concat(chunks)));
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
        height: maxY - minY + 1,
        canvasWidth: info.width,
        canvasHeight: info.height
    };
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

        const bbox =
            await getFrameBoundingBox(frame);

        if (!bbox) continue;

        const bboxArea =
            bbox.width * bbox.height;

        const canvasArea =
            bbox.canvasWidth *
            bbox.canvasHeight;

        occupations.push(
            bboxArea / canvasArea
        );
    }

    return median(occupations);
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
    const referenceOccupation =
        await getMedianOccupation(
            path.join(
                SPRITES_FOLDER,
                REFERENCE_POKEMON
            )
        );

    console.log(
        "Reference occupation:",
        referenceOccupation
    );

    const result = {};

    let processed = 0;

    for (const file of files) {

        try {

            const occupation =
                await getMedianOccupation(
                    path.join(
                        SPRITES_FOLDER,
                        file
                    )
                );

            let scale =
                Math.sqrt(
                    referenceOccupation /
                    occupation
                );

            // correction légère seulement
            scale = Math.max(
                0.75,
                Math.min(
                    1.35,
                    scale
                )
            );

            const pokemonNumber =
                path.basename(
                    file,
                    ".gif"
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
                occupation.toFixed(4),
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