const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = path.join(
    __dirname,
    "../public/Skins"
);

const OUTPUT_DIR = path.join(
    __dirname,
    "../public/SkinsCentered"
);

const ANIMATED_DIR = path.join(
    __dirname,
    "../public/Animated"
);

const TOP_MARGIN = 12;
const BOTTOM_MARGIN = 12;

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(
        OUTPUT_DIR,
        { recursive: true }
    );
}

if (!fs.existsSync(ANIMATED_DIR)) {
    fs.mkdirSync(
        ANIMATED_DIR,
        { recursive: true }
    );
}

function isAnimatedPng(filePath) {

    const buffer =
        fs.readFileSync(filePath);

    return (
        buffer.includes(Buffer.from("acTL")) ||
        buffer.includes(Buffer.from("fcTL")) ||
        buffer.includes(Buffer.from("fdAT"))
    );

}

async function centerSprite(file) {

    const input =
        path.join(INPUT_DIR, file);

    const output =
        path.join(OUTPUT_DIR, file);

    const image =
        sharp(input);

    const {
        data,
        info
    } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({
            resolveWithObject: true
        });

    let minX = info.width;
    let minY = info.height;
    let maxX = 0;
    let maxY = 0;

    for (
        let y = 0;
        y < info.height;
        y++
    ) {

        for (
            let x = 0;
            x < info.width;
            x++
        ) {

            const alpha =
                data[
                (
                    y *
                    info.width +
                    x
                ) * 4 + 3
                ];

            if (alpha > 0) {

                minX =
                    Math.min(
                        minX,
                        x
                    );

                minY =
                    Math.min(
                        minY,
                        y
                    );

                maxX =
                    Math.max(
                        maxX,
                        x
                    );

                maxY =
                    Math.max(
                        maxY,
                        y
                    );

            }

        }

    }

    const cropWidth =
        maxX - minX + 1;

    const cropHeight =
        maxY - minY + 1;

    const finalWidth =
        info.width;

    const finalHeight =
        info.height +
        TOP_MARGIN +
        BOTTOM_MARGIN;

    const maxAllowedHeight =
        finalHeight -
        TOP_MARGIN -
        BOTTOM_MARGIN;

    let sprite =
        image.extract({
            left: minX,
            top: minY,
            width: cropWidth,
            height: cropHeight
        });

    if (
        cropHeight >
        maxAllowedHeight
    ) {

        const ratio =
            maxAllowedHeight /
            cropHeight;

        sprite =
            sprite.resize({
                width: Math.round(
                    cropWidth *
                    ratio
                ),
                height: Math.round(
                    cropHeight *
                    ratio
                )
            });

    }

    const spriteBuffer =
        await sprite
            .png()
            .toBuffer();

    const spriteMeta =
        await sharp(
            spriteBuffer
        ).metadata();

    const spriteWidth =
        spriteMeta.width;

    const spriteHeight =
        spriteMeta.height;

    const left =
        Math.floor(
            (
                finalWidth -
                spriteWidth
            ) / 2
        );

    const top =
        Math.floor(
            (
                finalHeight -
                spriteHeight
            ) / 2
        );

    await sharp({
        create: {
            width: finalWidth,
            height: finalHeight,
            channels: 4,
            background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
            }
        }
    })
        .composite([
            {
                input: spriteBuffer,
                left,
                top
            }
        ])
        .png()
        .toFile(output);

}

async function run() {

    const files =
        fs.readdirSync(
            INPUT_DIR
        )
            .filter(
                file =>
                    file.endsWith(
                        ".png"
                    )
            );

    let centered = 0;
    let animated = 0;
    let errors = 0;

    for (
        const file of files
    ) {

        const input =
            path.join(
                INPUT_DIR,
                file
            );

        try {

            if (
                isAnimatedPng(
                    input
                )
            ) {

                fs.copyFileSync(
                    input,
                    path.join(
                        ANIMATED_DIR,
                        file
                    )
                );

                animated++;

                console.log(
                    `🎞️ ${file}`
                );

                continue;

            }

            await centerSprite(
                file
            );

            centered++;

            console.log(
                `✓ ${file}`
            );

        } catch (err) {

            errors++;

            console.error(
                `✗ ${file} : ${err.message}`
            );

        }

    }

    console.log("");
    console.log(
        "========================="
    );
    console.log(
        `Recentrés : ${centered}`
    );
    console.log(
        `Animés : ${animated}`
    );
    console.log(
        `Erreurs : ${errors}`
    );
    console.log(
        "========================="
    );

}

run();