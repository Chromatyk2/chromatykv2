import Axios from "axios";
import React, { useState, useEffect } from 'react';

function ProfileSkins({ profileData, reload, isOwner }) {
    const [loadSkin, setLoadSkin] = useState(false);
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
    async function addSkin() {
        if (!isOwner) {
            return;
        }
        if (
            profileData.skins.length >=
            profileData.profile.level
        ) {
            return;
        }
        try {
            setLoadSkin(true);
            await Axios.post(
                "/api/addSkin"
            );
            await reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadSkin(false);
        }

    }
    return (
        <>
            {skins.length < profile.level &&
                loadSkin === false &&
                <div class={"openSkinDiv"} onClick={addSkin}>
                    <p className={"openSkinText"}>{profile.level - skins.length}</p>
                </div>
            }
            <div className="skinContainer">
                {skins.map((item) => (
                    <div onClick={() => changeSkin(item.skin)} loading={"lazy"} style={{ backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundImage: `url("/Skins/Trainer${item.skin}.png")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProfileSkins;