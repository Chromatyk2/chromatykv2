function ProfileHeader({
    profile,
    companion,
    color
}) {
    const currentLevelXp =
        25 *
        profile.level *
        (profile.level - 1);

    const nextLevelXp =
        25 *
        (profile.level + 1) *
        profile.level;

    const progress =
        (
            (
                profile.xp -
                currentLevelXp
            ) /
            (
                nextLevelXp -
                currentLevelXp
            )
        ) * 100;
    return (
        <>
            <div className="profileCard">

                <div
                    className="trainerSprite"
                    style={{
                        backgroundImage: `url("/Skins/Trainer${profile.skin}.png")`
                    }}
                />

                <div className="profileCenter">

                    <div className="profileName">
                        {profile.login}
                    </div>

                    <div className="profileLevel">
                        Niveau {profile.level}
                    </div>

                    <div className={`titleBadge ${profile.title_rarity}`}>
                        {profile.title_rarity === "legendary" && "⭐ "}
                        {profile.title_rarity === "mythic" && "👑 "}
                        {profile.title_name}
                    </div>

                </div>

                {companion && (
                    <div className="pokemonContainer">

                        <div
                            className="pokemonSprite"
                            style={{
                                filter: companion.negative ? "invert(1)" : "",
                                backgroundImage:
                                    `url("/Sprites/${companion.shiny
                                        ? "Shiny"
                                        : "Normal"
                                    }/${companion.number}.gif")`
                            }}
                        />

                        <div className="pokemonInfos">
                            <div>{companion.pokemon}</div>

                            <span>
                                {
                                    companion.shiny
                                        ? "✨ Shiny"
                                        : companion.negative
                                            ? "🌑 Obscur"
                                            : "Classique"
                                }
                            </span>
                        </div>

                    </div>
                )}

            </div>

            <div className="xpInfos">
                <span>EXP</span>
                <span>{profile.xp}/{nextLevelXp}</span>
            </div>

            <div className="xpBar">
                <div
                    className="xpFill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </>
    );
}
export default ProfileHeader;