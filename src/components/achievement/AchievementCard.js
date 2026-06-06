function AchievementCard({
    title,
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
                `achievementCard ${completed
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
                    <h4>
                        {title}
                    </h4>
                    <p>
                        {
                            completed
                                ? "Complété"
                                : "En cours"
                        }
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
            <p className="achievementCount">
                {owned}
                {" / "}
                {total}
            </p>
        </div>
    );
}
export default AchievementCard;