import Axios from "axios";

function ProfileSkins({profileData,reload, isOwner}) {
    const profile =
        profileData.profile;
    const skins =
        profileData.skins;
    async function changeSkin(skin) {
        if (!isOwner) {
            return;
        }
        try {
            await Axios.post(
                "/api/changeSkin",
                {
                    skin
                }
            );
            reload();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="skinContainer">
            {skins.map((item) => (
                <div onClick={() => changeSkin(item.skin)} loading={"lazy"} style={{ backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundImage: `url("/Skins/Trainer${item.skin}.png")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                </div>
            ))}
        </div>
    );
}

export default ProfileSkins;