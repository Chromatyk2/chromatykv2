export default function ShadowSmokefront({
    scale = 1,
    width = { 160 * scale }
height = { 200 * scale }
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
            className="shadowSmokeFront"
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
                <radialGradient id="shadowBlack">
                    <stop offset="0%" stopColor="#4d1f82" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#000" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4d1f82" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Couche noire */}
            <g filter="url(#shadowDistort)">
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="-15 300 300"
                        to="15 300 300"
                        dur="4s"
                        repeatCount="indefinite"
                    />

                    <ellipse
                        cx={cx}
                        cy={cy * 0.9}
                        rx={width * 0.43}
                        ry={height * 0.52}
                        fill="url(#shadowBlack)"
                    />

                    <ellipse
                        cx={cx - width * 0.20}
                        cy={cy + height * 0.10}
                        rx={width * 0.30}
                        ry={height * 0.33}
                        fill="url(#shadowBlack)"
                    />

                    <ellipse
                        cx={cx + width * 0.20}
                        cy={cy + height * 0.10}
                        rx={width * 0.26}
                        ry={height * 0.35}
                        fill="url(#shadowBlack)"
                    />
                </g>
            </g>
        </svg>
    );
}