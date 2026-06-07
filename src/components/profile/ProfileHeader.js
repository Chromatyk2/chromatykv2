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
            <div className="profilHeader trainerCard">

    <div className="trainerContainer">

        <img
                        src={`/SkinsCentered/Trainer${profile.skin}.png`}
            alt={profile.login}
            className="trainerSprite"
        />

        {companion && (
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
    </div>

</div>
            <div className="textProgressProfil">
                <p>EXP</p>
                <p>
                    {profile.xp}
                    /
                    {nextLevelXp}
                </p>
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
                        width: `${progress}%`
                    }}
                />
            </div>
        </>
    );
}
export default ProfileHeader;