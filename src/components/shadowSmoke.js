import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
    await loadSlim(engine);
};

export default function ShadowSmoke() {
    return (
        <Particles
            id="shadowSmoke"
            init={particlesInit}
            options={{
                fullScreen: false,
                background: {
                    color: "transparent",
                },

                particles: {
                    number: {
                        value: 0,
                    },

                    color: {
                        value: [
                            "#000000",
                            "#120000",
                            "#330000",
                            "#660000",
                            "#aa0000",
                        ],
                    },

                    shape: {
                        type: "circle",
                    },

                    opacity: {
                        value: {
                            min: 0.05,
                            max: 0.3,
                        },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            startValue: "max",
                            destroy: "min",
                        },
                    },

                    size: {
                        value: {
                            min: 15,
                            max: 50,
                        },
                        animation: {
                            enable: true,
                            speed: 4,
                            startValue: "min",
                            destroy: "max",
                        },
                    },

                    move: {
                        enable: true,

                        speed: {
                            min: 0.5,
                            max: 2,
                        },

                        random: true,

                        direction: "none",

                        outModes: {
                            default: "destroy",
                        },

                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200,
                        },

                        trail: {
                            enable: false,
                        },
                    },

                    life: {
                        duration: {
                            value: 3,
                        },
                    },
                },

                emitters: [
                    {
                        position: {
                            x: 20,
                            y: 70,
                        },

                        rate: {
                            quantity: 2,
                            delay: 0.05,
                        },
                    },

                    {
                        position: {
                            x: 80,
                            y: 70,
                        },

                        rate: {
                            quantity: 2,
                            delay: 0.05,
                        },
                    },

                    {
                        position: {
                            x: 50,
                            y: 50,
                        },

                        rate: {
                            quantity: 3,
                            delay: 0.08,
                        },
                    },
                ],

                detectRetina: true,
            }}
        />
    );
}