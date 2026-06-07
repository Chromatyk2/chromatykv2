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

                <div className="avatarZone">
                    <div
                        className="trainerSprite"
                        style={{
                            backgroundImage: `url("/Skins/Trainer${profile.skin}.png")`
                        }}
                    />
                    <div className="avatarHalo" />
                </div>

                <div className="centerZone">

                    <h1>{profile.login}</h1>

                    <h2>Niveau {profile.level}</h2>

                    <div className={`titleBadge ${profile.title_rarity}`}>
                        {profile.title_name}
                    </div>

                    <div className="expInfos">
                        <span>EXP</span>
                        <span>{profile.xp}/{nextLevelXp}</span>
                    </div>

                    <div className="xpBar">
                        <div
                            className="xpFill"
                            style={{
                                width: `${progress}%`
                            }}
                        />
                    </div>

                </div>

                {companion && (
                    <div className="pokemonZone">

                        <div className="pokemonHalo" />

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
                            <span>{companion.pokemon}</span>

                            <small>
                                {
                                    companion.shiny
                                        ? "✨ Shiny"
                                        : companion.negative
                                            ? "🌑 Obscur"
                                            : "Classique"
                                }
                            </small>
                        </div>

                    </div>
                )}

            </div>
        </>
    );
}
export default ProfileHeader;