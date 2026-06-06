function AchievementCard({
    icon,
    title,
    reward,
    current,
    total
}) {
    const completed =
        current >= total;
    const percent =
        Math.min(
            100,
            current /
            total *
            100
        );
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
                    {icon}
                </span>
                <div>
                    <h4>
                        {title}
                    </h4>
                    <p>
                        {reward}
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
                {current}
                {" / "}
                {total}
            </p>
        </div>
    );
}
export default AchievementCard;