const fs = require("fs");
const path = require("path");
const gifFrames = require("gif-frames");
const sharp = require("sharp");

const SPRITES_FOLDER =
    path.join(
        __dirname,
        "../public/Sprites/normal"
    );

const OUTPUT_FOLDER =
    path.join(
        __dirname,
        "../public/Masks"
    );

function streamToBuffer(stream) {

    return new Promise((resolve, reject) => {

        const chunks = [];

        stream.on(
            "data",
            chunk => chunks.push(chunk)
        );

        stream.on(
            "end",
            () => resolve(
                Buffer.concat(chunks)
            )
        );

        stream.on(
            "error",
            reject
        );
    });
}

async function generateMask(gifPath, outputPath) {

    const frames =
        await gifFrames({
            url: gifPath,
            frames: "all",
            outputType: "png",
            cumulative: true
        });

    let width = 0;
    let height = 0;

    let finalMask = null;

    for (const frame of frames) {

        const pngBuffer =
            await streamToBuffer(
                frame.getImage()
            );

        const {
            data,
            info
        } =
            await sharp(pngBuffer)
                .ensureAlpha()
                .raw()
                .toBuffer({
                    resolveWithObject: true
                });

        width = info.width;
        height = info.height;

        if (!finalMask) {

            finalMask =
                new Uint8Array(
                    width *
                    height
                );
        }

        for (
            let i = 0;
            i < width * height;
            i++
        ) {

            const alpha =
                data[i * 4 + 3];

            if (alpha > 0) {

                finalMask[i] = 255;
            }
        }
    }

    const png =
        Buffer.alloc(
            width *
            height *
            4
        );

    for (
        let i = 0;
        i < width * height;
        i++
    ) {

        const value =
            finalMask[i];

        png[i * 4] = value;
        png[i * 4 + 1] = value;
        png[i * 4 + 2] = value;
        png[i * 4 + 3] = value;
    }

    await sharp(
        png,
        {
            raw: {
                width,
                height,
                channels: 4
            }
        }
    ).png()
     .toFile(outputPath);
}

async function main() {

    fs.mkdirSync(
        OUTPUT_FOLDER,
        {
            recursive: true
        }
    );

    //const files =
      //  fs.readdirSync(
            //SPRITES_FOLDER
        //)
        //.filter(
          //  file =>
            //    file.endsWith(".gif")
        //);
        const files = [
    "37.gif"
];
    let count = 0;

    for (const file of files) {

        const number =
            path.basename(
                file,
                ".gif"
            );

        await generateMask(
            path.join(
                SPRITES_FOLDER,
                file
            ),
            path.join(
                OUTPUT_FOLDER,
                `${number}.png`
            )
        );

        count++;

        console.log(
            `${count}/${files.length}`,
            number
        );
    }
}

main();