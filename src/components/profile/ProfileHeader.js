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
                {companion && (                    
                    <div className={"profilHeader"}>
                        <div className={"profilInfos"}>
                            <p style={{ textAlign: "end" }}>{companion.pokemon}</p>
                            <p style={{ textAlign: "end" }} className={"levelProfil"}>{companion.shiny === 1 ? "Shiny" : companion.negative === 1 ? "Obscur" : "Classique"}</p>
                        </div>
                        <div style={{ filter: companion.negative === 1 ? "invert(1)" : "invert(0)", backgroundColor: color, backgroundImage: `url("/Sprites/${companion.shiny === 1 ? "Shiny" : "Normal"}/${companion.number}.gif")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"compagnonPicture"}>
                        </div>
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