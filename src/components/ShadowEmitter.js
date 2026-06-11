import { useEffect, useState } from "react";

export default function ShadowEmitter() {

    const [particles, setParticles] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {

        const img = new Image();

        img.src = "/Masks/37.png";

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
        };

    }, []);

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

            }, 80);

        return () =>
            clearInterval(
                interval
            );

    }, [points]);

    return (

        <>
            {particles.map(
                particle => (

                    <div
                        key={
                            particle.id
                        }
                        style={{

                            position:
                                "absolute",

                            left:
                                particle.x,

                            top:
                                particle.y,

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

                            opacity:
                                0.7,

                            pointerEvents:
                                "none",

                            animation:
                                "shadowSmokeParticle 1.5s linear forwards"
                        }}
                    />
                )
            )}
        </>

    );
}