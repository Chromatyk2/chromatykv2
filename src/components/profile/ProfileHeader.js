function ProfileHeader({
    profile,
    companion,
    color
}) {
    const nextLevelXp =
        (100 * ((profile.level + 1) * (profile.level + 2))) / 4;
    const progress =
        ((profile.xp / nextLevelXp) * 100)
            .toFixed(2);
    return (
        <>
            <div className="profilHeaderContainer">
                <div className="profilHeader">
                    <div
                        className="profilPicture"
                        style={{
                            backgroundColor: color,
                            backgroundImage:
                                `url("/Skins/Trainer${profile.skin}.png")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center"
                        }}
                    />
                    <div className="profilInfos">
                        <p>{profile.login}</p>
                        <p className="levelProfil">
                            Niveau {profile.level}
                        </p>
                    </div>
                </div>
                {profile.activeCompanion && (
                    <div className="profilHeader">
                        <div className="profilInfos">
                            <p
                                style={{
                                    textAlign: "end"
                                }}
                            >
                                {profile.activeCompanion.pokemon}
                            </p>
                            <p
                                className="levelProfil"
                                style={{
                                    textAlign: "end"
                                }}
                            >
                                {
                                    profile.activeCompanion.shiny === 1
                                        ? "Shiny"
                                        : profile.activeCompanion.negative === 1
                                            ? "Obscur"
                                            : "Classique"
                                }
                            </p>

                        </div>
                        <div
                            className="compagnonPicture"
                            style={{
                                filter:
                                    profile.activeCompanion.negative === 1
                                        ? "invert(1)"
                                        : "invert(0)",

                                backgroundColor: color,

                                backgroundImage:
                                    `url("/Sprites/${profile.activeCompanion.shiny === 1
                                        ? "Shiny"
                                        : "Normal"
                                    }/${profile.activeCompanion.number
                                    }.gif")`,

                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center"
                            }}
                        />
                    </div>
                )}
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