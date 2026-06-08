export default function ShadowSmokeBackDex() {
    return (
        <svg
            className="shadowSmokeBack"
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

                <radialGradient id="shadowRed">
                    <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
                    <stop offset="40%" stopColor="#4d1f82" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
            </defs>
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
        </svg>
    );
}