export default function ShadowSmoke() {
    return (
        <svg
            className="shadowSmoke"
            viewBox="0 0 600 600"
            preserveAspectRatio="none"
        >
            <defs>
                <filter id="smoke">
                    <feGaussianBlur stdDeviation="18" />
                </filter>

                <radialGradient id="blackSmoke">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="redSmoke">
                    <stop offset="0%" stopColor="#cc0000" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#cc0000" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Volute 1 */}
            <g filter="url(#smoke)">
                <ellipse
                    cx="300"
                    cy="420"
                    rx="45"
                    ry="75"
                    fill="url(#blackSmoke)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="
                            0 0;
                            -20 -60;
                            15 -140;
                            -10 -220
                        "
                        dur="4.5s"
                        repeatCount="indefinite"
                    />

                    <animate
                        attributeName="opacity"
                        values="0;0.55;0.4;0"
                        dur="4.5s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </g>

            {/* Volute 2 */}
            <g filter="url(#smoke)">
                <ellipse
                    cx="260"
                    cy="430"
                    rx="35"
                    ry="60"
                    fill="url(#blackSmoke)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="
                            0 0;
                            25 -80;
                            -15 -170;
                            20 -260
                        "
                        dur="5.2s"
                        begin="0.8s"
                        repeatCount="indefinite"
                    />

                    <animate
                        attributeName="opacity"
                        values="0;0.45;0.25;0"
                        dur="5.2s"
                        begin="0.8s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </g>

            {/* Volute 3 */}
            <g filter="url(#smoke)">
                <ellipse
                    cx="340"
                    cy="425"
                    rx="40"
                    ry="65"
                    fill="url(#blackSmoke)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="
                            0 0;
                            -15 -70;
                            30 -160;
                            -20 -250
                        "
                        dur="4.8s"
                        begin="1.4s"
                        repeatCount="indefinite"
                    />

                    <animate
                        attributeName="opacity"
                        values="0;0.5;0.35;0"
                        dur="4.8s"
                        begin="1.4s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </g>

            {/* Volute rouge 1 */}
            <g filter="url(#smoke)">
                <ellipse
                    cx="290"
                    cy="410"
                    rx="30"
                    ry="50"
                    fill="url(#redSmoke)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="
                            0 0;
                            10 -50;
                            -15 -120;
                            5 -180
                        "
                        dur="3.8s"
                        begin="0.4s"
                        repeatCount="indefinite"
                    />

                    <animate
                        attributeName="opacity"
                        values="0;0.35;0.2;0"
                        dur="3.8s"
                        begin="0.4s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </g>

            {/* Volute rouge 2 */}
            <g filter="url(#smoke)">
                <ellipse
                    cx="330"
                    cy="430"
                    rx="25"
                    ry="45"
                    fill="url(#redSmoke)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="
                            0 0;
                            -20 -40;
                            10 -110;
                            -5 -170
                        "
                        dur="4.2s"
                        begin="2s"
                        repeatCount="indefinite"
                    />

                    <animate
                        attributeName="opacity"
                        values="0;0.25;0.15;0"
                        dur="4.2s"
                        begin="2s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </g>
        </svg>
    );
}