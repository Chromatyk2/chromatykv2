export default function ShadowSmokeFront() {
    return (
        <svg
            className="shadowSmokeFront"
            viewBox="0 0 600 600"
            preserveAspectRatio="none"
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
                    <stop offset="0%" stopColor="#4d1f82" stopOpacity="1" />
                    <stop offset="60%" stopColor="#000" stopOpacity="1" />
                    <stop offset="100%" stopColor="#4d1f82" stopOpacity="0" />
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