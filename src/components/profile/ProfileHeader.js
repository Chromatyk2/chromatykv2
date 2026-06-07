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
            <div className="profilHero">

                <div className="heroAvatar">

                    <div
                        className="profilPicture"
                        style={{
                            backgroundImage: `url("/Skins/Trainer${profile.skin}.png")`
                        }}
                    />

                    {companion && (
                        <div
                            className="miniCompanion"
                            style={{
                                filter: companion.negative ? "invert(1)" : "",
                                backgroundImage: `url("/Sprites/${companion.shiny ? "Shiny" : "Normal"
                                    }/${companion.number}.gif)`
                            }}
                        />
                    )}

                </div>

                <div className="profilInfos">

                    <p className="profilLogin">
                        {profile.login}
                    </p>

                    <p className="levelProfil">
                        Niveau {profile.level}
                    </p>

                    <div className={`title${profile.title_rarity}`}>
                        {profile.title_rarity === "legendary" && "⭐ "}
                        {profile.title_rarity === "mythic" && "👑 "}
                        {profile.title_name}
                    </div>

                    {companion && (
                        <div className="companionText">
                            {companion.pokemon}
                            {" · "}
                            {companion.shiny
                                ? "✨ Shiny"
                                : companion.negative
                                    ? "🌑 Obscur"
                                    : "Classique"}
                        </div>
                    )}

                </div>

            </div>
        </>
    );
}
export default ProfileHeader;