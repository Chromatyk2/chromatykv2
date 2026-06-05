import Axios from "axios";

function ProfileSkins({
    profileData,
    reload
}) {
    const profile =
        profileData.profile;
    const skins =
        profileData.skins;
    async function changeSkin(skin) {
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
                            backgroundImage:
                                `url("/Skins/Trainer${item.skin}.png")`
                        }}
                    />
                    <button
                        onClick={() =>
                            changeSkin(item.skin)
                        }
                        disabled={
                            item.skin === profile.skin
                        }
                    >
                        {
                            item.skin === profile.skin
                                ? "Équipé"
                                : "Équiper"
                        }
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProfileSkins;