import { useEffect, useState } from "react";

export default function ShadowEmitter({ targetRef, mask }) {

    const [particles, setParticles] = useState([]);
    const [points, setPoints] = useState([]);
    const [maskSize, setMaskSize] = useState(null);

    useEffect(() => {

        const img = new Image();

        img.src = mask;

        img.onload = () => {

            const canvas =
                document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            const imageData =
                ctx.getImageData(
                    0,
                    0,
                    img.width,
                    img.height
                );

            const visiblePoints = [];

            for (
                let y = 0;
                y < img.height;
                y++
            ) {

                for (
                    let x = 0;
                    x < img.width;
                    x++
                ) {

                    const index =
                        (
                            y * img.width +
                            x
                        ) * 4;

                    const alpha =
                        imageData.data[
                        index + 3
                        ];

                    if (alpha > 0) {

                        visiblePoints.push({
                            x,
                            y
                        });
                    }
                }
            }

            setPoints(
                visiblePoints
            );

            setMaskSize({
                width: img.width,
                height: img.height
            });
        };

    }, [mask]);

    useEffect(() => {

        if (
            points.length === 0
        ) {
            return;
        }

        const interval =
            setInterval(() => {

                const point =
                    points[
                    Math.floor(
                        Math.random() *
                        points.length
                    )
                    ];

                const particle = {

                    id:
                        Date.now() +
                        Math.random(),

                    x: point.x,
                    y: point.y
                };

                setParticles(
                    prev => [
                        ...prev,
                        particle
                    ]
                );

                setTimeout(() => {

                    setParticles(
                        prev =>
                            prev.filter(
                                p =>
                                    p.id !==
                                    particle.id
                            )
                    );

                }, 1500);

            }, 50);

        return () =>
            clearInterval(
                interval
            );

    }, [points]);

    const rect =
        targetRef?.current
            ?.getBoundingClientRect();

    const scaleX =
        rect && maskSize
            ? rect.width /
            maskSize.width
            : 1;

    const scaleY =
        rect && maskSize
            ? rect.height /
            maskSize.height
            : 1;

    return (
        <>
            {particles.map(
                particle => (

                    <div
                        key={
                            particle.id
                        }
                        className="shadowParticle"
                        style={{

                            position:
                                "absolute",

                            left:
                                particle.x *
                                scaleX,

                            top:
                                particle.y *
                                scaleY,

                            width:
                                "12px",

                            height:
                                "12px",

                            borderRadius:
                                "50%",

                            background:
                                "#5f2ea8",

                            filter:
                                "blur(8px)",

                            pointerEvents:
                                "none"
                        }}
                    />
                )
            )}
        </>
    );
}