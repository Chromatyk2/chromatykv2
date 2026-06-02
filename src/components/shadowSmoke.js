import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ShadowSmoke() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="shadowSmoke"
            options={{
                fullScreen: false,
                fpsLimit: 60,

                particles: {
                    number: {
                        value: 40,
                    },

                    color: {
                        value: [
                            "#ff0000",
                            "#990000",
                            "#330000",
                            "#000000",
                        ],
                    },

                    opacity: {
                        value: {
                            min: 0.05,
                            max: 0.4,
                        },
                        animation: {
                            enable: true,
                            speed: 0.3,
                            minimumValue: 0,
                            sync: false,
                        },
                    },

                    size: {
                        value: {
                            min: 10,
                            max: 35,
                        },
                        animation: {
                            enable: true,
                            speed: 2,
                            minimumValue: 0,
                        },
                    },

                    move: {
                        enable: true,
                        direction: "top",
                        speed: {
                            min: 0.5,
                            max: 2,
                        },
                        random: true,
                        straight: false,
                        outModes: {
                            default: "destroy",
                        },
                    },

                    shape: {
                        type: "circle",
                    },

                    blur: {
                        value: 8,
                    },
                },

                emitters: {
                    position: {
                        x: 50,
                        y: 75,
                    },

                    rate: {
                        quantity: 5,
                        delay: 0.08,
                    },

                    size: {
                        width: 40,
                        height: 10,
                    },
                },

                detectRetina: true,
            }}
        />
    );
}