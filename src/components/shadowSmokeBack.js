export default function ShadowSmokeBack({
    scale = 1,
    width = 300,
    height = 365
}) {
    const cx = width / 2;
    const cy = height / 2;

    const bigRx = width * 0.45;
    const bigRy = height * 0.52;

    const leftRx = width * 0.28;
    const leftRy = height * 0.33;

    const rightRx = width * 0.25;
    const rightRy = height * 0.35;
    return (
        <svg
            className="shadowSmokeBack"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            style={{
                width: `${300 * scale}px`,
                height: `${365 * scale}px`,
                left: `${-50 * scale}px`,
                top: `${-80 * scale}px`
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
                    <animate
                    attributeName="baseFrequency"
                    dur="6s"
                    values="
                        0.015;
                        0.020;
                        0.012;
                        0.018;
                        0.015
                    "
                    repeatCount="indefinite"
                />

                    <ellipse
                        cx={cx}
                        cy={cy * 0.9}
                        rx={width * 0.43}
                        ry={height * 0.52}
                        fill="url(#shadowRed)"
                    />

                    <ellipse
                        cx={cx - width * 0.20}
                        cy={cy + height * 0.10}
                        rx={width * 0.30}
                        ry={height * 0.33}
                        fill="url(#shadowRed)"
                    />

                    <ellipse
                        cx={cx + width * 0.20}
                        cy={cy + height * 0.10}
                        rx={width * 0.26}
                        ry={height * 0.35}
                        fill="url(#shadowRed)"
                    />
                </g>
            </g>
        </svg>
    );
}