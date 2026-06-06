import Axios from "axios";
import React, { useState, useEffect } from 'react';

function ProfileTitles({ profileData, reload, isOwner }) {
    const [loadSkin, setLoadSkin] = useState(false);
    const [openingSkin, setOpeningSkin] = useState(null);
    const profile =
        profileData.profile;
    const titles =
        profileData.titles;   

    return (
        <>
            <div className="skinContainer">
                {titles.map((item) => (
                    <div loading={"lazy"} style={{ backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundImage: `url("/Skins/Trainer${item.skin}.png")`, backgroundSize: "contain", backgroundPosition: "center" }} className={`title${(item.rarity)}`}>
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