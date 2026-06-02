export default function ShadowSmoke() {
    return (
        <svg
            className="shadowSmoke"
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
                        baseFrequency="0.01"
                        numOctaves="4"
                        seed="8"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            values="0.01;0.02;0.015;0.01"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>

                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="70"
                    />
                </filter>

                <radialGradient id="shadowRed">
                    <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.7" />
                    <stop offset="40%" stopColor="#880000" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="shadowBlack">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#111111" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
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

            {/* Couche rouge */}
            <g filter="url(#shadowDistort)">
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 300 300"
                        to="0 300 300"
                        dur="12s"
                        repeatCount="indefinite"
                    />

                    <ellipse
                        cx="300"
                        cy="260"
                        rx="130"
                        ry="190"
                        fill="url(#shadowRed)"
                    />

                    <ellipse
                        cx="240"
                        cy="330"
                        rx="90"
                        ry="120"
                        fill="url(#shadowRed)"
                    />

                    <ellipse
                        cx="370"
                        cy="340"
                        rx="80"
                        ry="130"
                        fill="url(#shadowRed)"
                    />
                </g>
            </g>

            {/* Noyau central */}
            <circle
                cx="300"
                cy="300"
                r="90"
                fill="rgba(0,0,0,0.35)"
            >
                <animate
                    attributeName="r"
                    values="90;105;90"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}