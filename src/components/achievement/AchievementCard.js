function AchievementCard({
    achievement,
    description,
    rewardTitle,
    owned,
    total,
    type
}) {

    const completed =
        owned >= total;

    const percent =
        Math.min(
            100,
            (owned / total) * 100
        );

    return (

        <div
            className={
                `achievementCard ${type}
                ${completed
                    ? "completed"
                    : "locked"
                }`
            }
        >

            <img
                className="achievementBadge"
                src="/case.png"
                alt={achievement}
            />

            <div
                className="achievementContent"
            >

                <div
                    className="achievementTop"
                >

                    <div>

                        <h4
                            className="achievementName"
                        >

                            {achievement}

                        </h4>

                        <p
                            className="achievementDescription"
                        >

                            {description}

                        </p>

                    </div>

                    {
                        completed && (

                            <div
                                className="achievementUnlocked"
                            >

                                ✓

                            </div>

                        )
                    }

                </div>


                <div
                    className="hpBarContainer"
                    style={{
                        width: "100%"
                    }}
                >
                    <div
                        className="hpBar"
                        style={{
                            width: `${percent}%`, maxWidth:"100%"
                        }}
                    />
                </div>

                <div
                    className="achievementFooter"
                >

                    <span>

                        {owned}
                        {" / "}
                        {total}

                    </span>

                    <span>

                        🏅 {
                            completed
                                ? rewardTitle
                                : "???????"
                        }

                    </span>

                </div>

            </div>

        </div>

    );

}
export default AchievementCard;