import Axios from "axios";
import React, { useState, useEffect } from 'react';

function ProfileTitles({ profileData, reload, isOwner }) {
    const [loadSkin, setLoadSkin] = useState(false);
    const [openingSkin, setOpeningSkin] = useState(null);
    const [rarityFilter, setRarityFilter] = useState("all");
    const rarities = [
        { code: "all", label: "Tous", className: "titlefilter" },
        { code: "common", label: "Commun", className: "titlefilter" },
        { code: "rare", label: "Rare", className: "titlefilter" },
        { code: "epic", label: "Epic", className: "titlefilter" },
        { code: "legendary", label: "⭐ Légendaire", className: "titlefilter" },
        { code: "mythic", label: "👑 Mythique", className: "titlefilter" },
        { code: "unique", label: "💎 Unique", className: "titlefilter" }
    ];
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
    const filteredTitles =
        rarityFilter === "all"
            ? titles
            : titles.filter(
                (title) =>
                    title.rarity.toLowerCase() === rarityFilter
            );
    return (
        <>
            <div style={{display: "flex",gap: "8px",flexWrap: "wrap",justifyContent: "center",marginBottom: "15px"}}>
                {rarities.map((rarity) => (
                    <div key={rarity.code} className={rarity.className} style={{cursor: "pointer",opacity:rarityFilter === rarity.code ? 1 : 0.65,transform:rarityFilter === rarity.code ? "scale(1.05)" : "scale(1)"}} onClick={() => setRarityFilter(rarity.code)}>
                        {rarity.label}
                    </div>
                ))}
            </div>
            <div style={{ justifyContent: "center" }} className="skinContainer">
                {filteredTitles.map((item) => (
                    <div key={item.code} onClick={() => changeTitle(item.code)} className={`title${item.rarity}`}>
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