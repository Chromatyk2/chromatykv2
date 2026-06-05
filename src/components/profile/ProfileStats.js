import { Link } from "react-router-dom";

function ProfileStats({ profileData }) {
    const MAX_POKEDEX = 1198;
    const BADGES_NORMAL = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"
    ];
    const BADGES_SPECIAL = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"
    ];
    const profile =
        profileData.profile;
    const globalProgress =
        profileData.globalProgress;
    const pokedexNormal =
        profileData.pokedexNormal || 0;
    const pokedexShiny =
        profileData.pokedexShiny || 0;
    const pokedexShadow =
        profileData.pokedexShadow || 0;
    return (
        <>
            <p
                style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "15px",
                    width: "100%",
                    textAlign: "left",
                    fontSize: "15px"
                }}
            >
                Progression
                <Link
                    className="showPokedex leaderboardHeaderContainerLink"
                    to={`/pokedex?user=${profile.user}`}
                >
                    Pokédex
                </Link>
                <Link
                    className="showPokedex leaderboardHeaderContainerLink"
                    to={`/cartes?user=${profile.user}`}
                >
                    Cartes
                </Link>
            </p>
            <div className="boxProfilLarge">
                <div className="profilHeader">
                    <div className="profilDex">
                        <p>Pokédex Classique</p>
                        <p className="levelProfil">
                            {pokedexNormal} / {MAX_POKEDEX}
                        </p>
                    </div>
                    <img
                        src={
                            "/Badge/lv" +
                            BADGES_NORMAL[
                            Math.min(
                                BADGES_NORMAL.length - 1,
                                Math.floor(
                                    (pokedexNormal / MAX_POKEDEX) *
                                    BADGES_NORMAL.length
                                )
                            )
                            ] +
                            ".png"
                        }
                    />
                </div>
            </div>
            {pokedexShiny > 0 && (
                <div className="boxProfilLarge">
                    <div className="profilHeader">
                        <div className="profilDex">
                            <p>Pokédex Shiny</p>
                            <p className="levelProfil">
                                {pokedexShiny} / {MAX_POKEDEX}
                            </p>
                        </div>
                        <img
                            src={
                                "/Badge/lv" +
                                BADGES_SPECIAL[
                                Math.min(
                                    BADGES_SPECIAL.length - 1,
                                    Math.floor(
                                        (pokedexShiny / MAX_POKEDEX) *
                                        BADGES_SPECIAL.length
                                    )
                                )
                                ] +
                                "s.png"
                            }
                        />
                    </div>
                </div>
            )}
            {pokedexShadow > 0 && (
                <div className="boxProfilLarge">
                    <div className="profilHeader">
                        <div className="profilDex">
                            <p>Pokédex Obscur</p>
                            <p className="levelProfil">
                                {pokedexShadow} / {MAX_POKEDEX}
                            </p>
                        </div>
                        <img
                            src={
                                "/Badge/lv" +
                                BADGES_SPECIAL[
                                Math.min(
                                    BADGES_SPECIAL.length - 1,
                                    Math.floor(
                                        (pokedexShadow / MAX_POKEDEX) *
                                        BADGES_SPECIAL.length
                                    )
                                )
                                ] +
                                "n.png"
                            }
                        />
                    </div>
                </div>
            )}
            {globalProgress.owned > 0 && (
                <div className="boxProfilLarge">
                    <div className="profilHeader">
                        <div className="profilDex">
                            <p>Collection de cartes</p>
                            <p className="levelProfil">
                                {globalProgress.owned}
                                {" / "}
                                {globalProgress.total}
                            </p>
                        </div>
                        <img
                            src={
                                "/Badge/lv" +
                                BADGES_NORMAL[
                                Math.min(
                                    BADGES_NORMAL.length - 1,
                                    Math.floor(
                                        (globalProgress.owned /
                                            globalProgress.total) *
                                        BADGES_NORMAL.length
                                    )
                                )
                                ] +
                                "c.png"
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
}
export default ProfileStats;