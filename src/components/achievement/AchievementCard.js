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
            <div className="achievementHeader">
                <img
                    className="achievementBadge"
                    src={"/case.png"}
                    alt={achievement}
                />
                <div className="achievementInfo">
                    <h4 className="achievementName">
                        {achievement}
                    </h4>
                    <p className="achievementReward">
                        🏅 {rewardTitle}
                    </p>
                </div>
                {completed && (
                    <div className="achievementUnlocked">✓</div>
                )}
            </div>
            <div className="achievementProgress">
                <div className="achievementBar">
                    <div
                        className="achievementBarFill"
                        style={{
                            width:
                                `${percent}%`
                        }}
                    />
                </div>
                <div className="achievementStats">
                    <span>
                        {owned} / {total}
                    </span>
                    <span>
                        {Math.floor(percent)}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AchievementCard;