import Axios from "axios";
import React, { useState, useEffect } from 'react';

function ProfileSkins({ profileData, reload, isOwner }) {
    const [loadSkin, setLoadSkin] = useState(false);
    const [openingSkin, setOpeningSkin] = useState(null);
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
            const response = await Axios.post("/api/addSkin");
            setOpeningSkin(response.data.skin.id);
            setTimeout(() => {
                setOpeningSkin(null);
                await reload();
            }, 4000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadSkin(false);
        }

    }
    
    return (
        <>
            {
                openingSkin && (
                    <div className="skinRevealOverlay">
                        <div className="skinRevealCard">
                            <div
                                className="skinRevealImage"
                                style={{
                                    backgroundImage: `url("/SkinsCentered/Trainer${openingSkin}.png")`
                                }}
                            />
                            <div className="skinBurst" />
                        </div>
                    </div>
                )
            }
            {skins.length < profile.level &&
                 (
                    <div
                        className="openSkinDiv"
                        onClick={addSkin}
                    >
                        <div className="skinChest">
                        <img style={{ width: "100%" }} src={"/case.png" }/>
                        </div>

                        <div className="skinBadge">
                            {profile.level - skins.length}
                        </div>
                    </div>
                )
            }
            <div className="skinContainer">
                {skins.map((item) => (
                    <div onClick={() => changeSkin(item.skin)} loading={"lazy"} style={{ backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundImage: `url("/SkinsCentered/Trainer${item.skin}.png")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProfileSkins;