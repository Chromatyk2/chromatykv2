import Axios from "axios";

function ProfileCompanions({profileData,reload}) {
    const profile =
        profileData.profile;
    const companions =
        profileData.maxLevelCompanions || [];
    const activeCompagnon =
        profileData.activeCompanion;
    async function selectCompanion(number) {
        try {
            await Axios.post(
                "/api/changeCompagnon",
                {
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
            <div className="skinContainer">
                {companions.map((val, key) => {
                        return (
                            <div onClick={() => selectCompanion(val.number, val.color)} loading={"lazy"} style={{ filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                            </div>
                        )
                    })
                }
            </div>            
        </div>
    );
}

export default ProfileCompanions;