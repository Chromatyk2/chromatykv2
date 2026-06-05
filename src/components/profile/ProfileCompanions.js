import Axios from "axios";

function ProfileCompanions({
    profileData,
    reload
}) {
    const profile =
        profileData.profile;
    const companions =
        profileData.maxLevelCompagnons || [];
    const activeCompagnon =
        profileData.activeCompagnon;
    async function selectCompanion(number) {
        try {
            await Axios.post(
                "/api/changeCompagnon",
                {
                    user: profile.user,
                    compagnon: number
                }
            );
            reload();
        } catch (err) {
            console.error(err);
        }
    }
    if (companions.length === 0) {
        return (
            <p>
                Aucun compagnon niveau 100.
            </p>
        );
    }
    return (
        <div className="compagnonsContainer">
            {companions.map((companion) => (
                <div
                    key={companion.number}
                    className={
                        activeCompagnon &&
                            activeCompagnon.number === companion.number
                            ? "compagnonCard active"
                            : "compagnonCard"
                    }
                >
                    <img
                        className="compagnonSprite"
                        src={
                            companion.shiny === 1
                                ? `/Sprites/Shiny/${companion.number}.gif`
                                : `/Sprites/Normal/${companion.number}.gif`
                        }
                        style={{
                            filter:
                                companion.negative === 1
                                    ? "invert(1)"
                                    : "none"
                        }}
                        alt={companion.pokemon}
                    />
                    <div>
                        <p>
                            {companion.pokemon}
                        </p>
                        <p
                            className="levelProfil"
                        >
                            Niveau {companion.level}
                        </p>
                    </div>
                    <button
                        onClick={() =>
                            selectCompanion(
                                companion.number
                            )
                        }
                        disabled={
                            activeCompagnon &&
                            activeCompagnon.number === companion.number
                        }
                    >

                        {
                            activeCompagnon &&
                                activeCompagnon.number === companion.number
                                ? "Actif"
                                : "Choisir"
                        }
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProfileCompanions;