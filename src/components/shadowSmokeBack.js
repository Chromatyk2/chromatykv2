export default function ShadowSmokeBack() {
    return (
        <svg
            className="shadowSmokeBack"
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
                        baseFrequency="0.02"
                        numOctaves="4"
                        seed="8"
                        result="noise"
                    />

                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="80"
                    />
                </filter>

                <linearGradient id="shadowSmoke">
                    <stop
                        offset="0%"
                        stopColor="#000"
                        stopOpacity="0.8"
                    />

                    <stop
                        offset="40%"
                        stopColor="#3e216b"
                        stopOpacity="0.5"
                    />

                    <stop
                        offset="100%"
                        stopColor="#3e216b"
                        stopOpacity="0"
                    />
                </linearGradient>

            </defs>

            <g filter="url(#shadowDistort)">

                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="
                        0 0;
                        -15 -120;
                        15 -240;
                        0 -320
                    "
                    dur="8s"
                    repeatCount="indefinite"
                />

                <ellipse
                    cx="260"
                    cy="500"
                    rx="55"
                    ry="180"
                    fill="url(#shadowSmoke)"
                />

                <ellipse
                    cx="340"
                    cy="520"
                    rx="50"
                    ry="220"
                    fill="url(#shadowSmoke)"
                />

                <ellipse
                    cx="300"
                    cy="470"
                    rx="70"
                    ry="260"
                    fill="url(#shadowSmoke)"
                />

            </g>
        </svg>
    );