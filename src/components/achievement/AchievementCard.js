function AchievementCard({
    achievement,
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

    const icons = {
        normal: "📖",
        shiny: "✨",
        shadow: "🌑"
    };

    return (

        <div
            className={
                `achievementCard ${type} ${completed
                    ? "completed"
                    : ""
                }`
            }
        >

            <div className="achievementTop">

                <span className="achievementIcon">
                    {icons[type]}
                </span>

                <div>

                    <h4 className="achievementName">
                        {achievement}
                    </h4>

                    <p className="achievementReward">

                        🏅 {rewardTitle}

                    </p>

                </div>

            </div>

            <div className="achievementBar">

                <div
                    className="achievementBarFill"
                    style={{
                        width:
                            `${percent}%`
                    }}
                />

            </div>

            <div className="achievementFooter">

                <span>
                    {owned} / {total}
                </span>

                <span>
                    {Math.floor(percent)}%
                </span>

            </div>

            {completed && (

                <div
                    className="achievementUnlocked"
                >

                    ✓ Débloqué

                </div>

            )}

        </div>

    );

}

export default AchievementCard;