export default function ShadowSmoke() {
    const smoke = [];

    for (let i = 0; i < 15; i++) {
        const x = 280 + Math.random() * 40;
        const duration = 3 + Math.random() * 3;
        const delay = Math.random() * 5;

        const drift1 = (Math.random() - 0.5) * 30;
        const drift2 = (Math.random() - 0.5) * 60;
        const drift3 = (Math.random() - 0.5) * 80;

        const isRed = Math.random() < 0.2;

        smoke.push(
            <g key={i}>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`
                        0 0;
                        ${drift1} -40;
                        ${drift2} -100;
                        ${drift3} -180
                    `}
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />

                <animate
                    attributeName="opacity"
                    values="1;0.8;0.4;0"
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />

                <animateTransform
                    attributeName="transform"
                    additive="sum"
                    type="scale"
                    values="
                        0.5;
                        1;
                        1.5;
                        2
                    "
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />

                <ellipse
                    cx={x}
                    cy="320"
                    rx={isRed ? 18 : 25}
                    ry={isRed ? 25 : 35}
                    fill={isRed ? "#aa0000" : "#000000"}
                />
            </g>
        );
    }

    return (
        <svg
            className="shadowSmoke"
            viewBox="0 0 600 600"
            preserveAspectRatio="none"
        >
            <defs>
                <filter id="smokeBlur">
                    <feGaussianBlur stdDeviation="4" />
                </filter>
            </defs>

            <g filter="url(#smokeBlur)">
                {smoke}
            </g>
        </svg>
    );
}