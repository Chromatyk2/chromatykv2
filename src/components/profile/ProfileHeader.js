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
           <div className="profilHeader">

    <div className="trainerContainer">

        <img
            src={`/Skins/Trainer${profile.skin}.png`}
            alt={profile.login}
            className="trainerSprite"
        />

        {companion && (
            <img
                src={`/Sprites/${
                    companion.shiny === 1 ? "Shiny" : "Normal"
                }/${companion.number}.gif`}
                alt={companion.pokemon}
                className={`companionSprite ${
                    companion.negative === 1 ? "shadowPokemon" : ""
                }`}
            />
        )}

    </div>

    <div className="profilInfos">

        <p className="trainerName">
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
            <p className="companionName">
                {companion.pokemon}
                {" • "}
                {companion.shiny === 1
                    ? "Shiny"
                    : companion.negative === 1
                        ? "Obscur"
                        : "Classique"}
            </p>
        )}

    </div>

</div>
        </>
    );
}
export default ProfileHeader;