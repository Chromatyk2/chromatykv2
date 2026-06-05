import Axios from "axios";

function ProfileSkins({
    profileData,
    reload, isOwner
}) {
    const profile =
        profileData.profile;
    const skins =
        profileData.skins;
    async function changeSkin(skin) {
        if (!isOwner) {
            return;
        } {
            return;
        }
        try {
            await Axios.post(
                "/api/changeSkin",
                {
                    user: profile.user,
                    skin
                }
            );
            reload();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="skinsContainer">
            {skins.map((item) => (
                <div
                    key={item.skin}
                    className={
                        item.skin === profile.skin
                            ? "skinCard active"
                            : "skinCard"
                    }
                >
                    <div
                        className="skinPreview"
                        style={{
                            backgroundColor: "transparent",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url("/Skins/Trainer$item.skins}.png")`,
                            backgroundSize: "contain",
                            backgroundPosition: "center"
                        }} className={"profilPicture"}
                    />
                    <button
                        onClick={() =>
                            changeSkin(item.skin)
                        }
                        disabled={
                            item.skin === profile.skin
                        }
                    >
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProfileSkins;