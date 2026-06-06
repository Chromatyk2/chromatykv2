import Axios from "axios";
import React, { useState, useEffect } from 'react';

function ProfileTitles({ profileData, reload, isOwner }) {
    const [loadSkin, setLoadSkin] = useState(false);
    const [openingSkin, setOpeningSkin] = useState(null);
    const profile =
        profileData.profile;
    const titles =
        profileData.titles;   
    async function changeTitle(code) {
        if (!isOwner) {
            return;
        }
        try {
            await Axios.post(
                "/api/changeTitle",
                {
                    code
                }
            );
            reload();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div style={{justifyContent:"center"}} className="skinContainer">
                {titles.map((item) => (
                    <div onClick={() => changeTitle(item.code)} loading={"lazy"} className={`title${(item.rarity)}`}>
                        {item.rarity === "legendary" && "⭐ "}
                        {item.rarity === "mythic" && "👑 "}
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProfileTitles;