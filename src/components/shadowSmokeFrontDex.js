export default function ShadowSmokeFrontDex() {
    return (
        <svg
            className="shadowSmokeFront"
            viewBox="0 0 600 600"
            preserveAspectRatio="none"
            style={{
                maxHeight: "200px",
                maxWidth: "100%",
                width: "auto",
                left: 0,
                right: 0,
                margin: "auto",
                top: 0,
                bottom: 0
            }}
        >
            <defs>
                <filter
                    id="shadowDistort"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.015"
                        numOctaves="4"
                        seed="8"
                        result="noise"
                    />

                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="70"
                    />
                </filter>
                <radialGradient id="shadowBlack">
                    <stop offset="0%" stop-color="#621f77" stop-opacity="1"></stop>
                    <stop offset="60%" stop-color="black" stop-opacity="1"></stop>
                    <stop offset="100%" stop-color="#af4fcd " stop-opacity="0" style={{ opacity: 1, zIndex: 10 }}></stop>
                </radialGradient>
            </defs>

            {/* Couche noire */}
            <g filter="url(#shadowDistort)">
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 300 300"
                        to="360 300 300"
                        dur="18s"
                        repeatCount="indefinite"
                    />

                    <ellipse
                        cx="300"
                        cy="300"
                        rx="160"
                        ry="230"
                        fill="url(#shadowBlack)"
                    />

                    <ellipse
                        cx="220"
                        cy="250"
                        rx="100"
                        ry="180"
                        fill="url(#shadowBlack)"
                    />

                    <ellipse
                        cx="380"
                        cy="260"
                        rx="110"
                        ry="170"
                        fill="url(#shadowBlack)"
                    />
                </g>
            </g>
        </svg>
    );
}