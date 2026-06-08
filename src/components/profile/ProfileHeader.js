import ShadowSmokeFrontDex from "../shadowSmokeFrontDex";
import ShadowSmokeBackDex from "../shadowSmokeBackDex";
import { useState, useRef } from "react";
function ProfileHeader({
    profile,
    companion,
    color
}) {
    const pokemonContainerRef = useRef(null);
    const animatedSkins = new Set([
        // 1337 -> 1452
        ...Array.from(
            { length: 1452 - 1337 + 1 },
            (_, i) => 1337 + i
        ),

        1635,
        1636,
        1637,

        1639,

        1642,
        1643,
        1644,

        1646,
        1647,
        1648,
        1649,
        1650,
        1651,

        1653,
        1654,
        1655,
        1656,
        1657,
        1658,
        1659,

        1662,
        1663,

        1672,

        1679,
        1680,

        1683,

        1687,

        1690,
        1691,

        1694,
        1695,

        1698,

        1702,

        1704,
        1705,

        1707,

        1709,

        1711,
        1712,

        // 2040 -> 2070
        ...Array.from(
            { length: 2070 - 2040 + 1 },
            (_, i) => 2040 + i
        )
    ]);
    const isAnimated =
        animatedSkins.has(
            profile.skin
        );
    const currentLevelXp =
        25 *
        profile.level *
        (profile.level - 1);

    const nextLevelXp =
        25 *
        (profile.level + 1) *
        profile.level;

    const progress =
        (
            (
                profile.xp -
                currentLevelXp
            ) /
            (
                nextLevelXp -
                currentLevelXp
            )
        ) * 100;
    return (
        <>
            <div className="profilHeader trainerCard">

    <div className="trainerContainer">

            <img style={{top: isAnimated ? "-10px" : "-29px"}} src={`/SkinsCentered/Trainer${profile.skin}.png`}
            alt={profile.login}
            className="trainerSprite"
        />

        {companion && (
                        <div className="pokemonSprite" style={{position:"absolute",right:"-240px",top:"10px"}}>
                            {companion.negative === 1 && <ShadowSmokeBackDex targetRef={pokemonContainerRef} />}
                            {companion.negative === 1 && <ShadowSmokeFrontDex targetRef={pokemonContainerRef} />}
                            <img style={{ maxHeight: "63px", width: "auto", maxWidth: "100%" }} className={companion.negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                src={`/Sprites/${companion.shiny === 1 ? "shiny" : "normal"}/${companion.number}.gif`}
                                alt=""
                            />

            </div>
        )}

    </div>

    <div className="profilInfos">

        <p className="trainerName">
            {profile.login}
        </p>

        <p className="levelProfil">
            Niveau {profile.level}
        </p>

        <div className={`title${profile.title_rarity}`}>
            {profile.title_rarity === "legendary" && "⭐ "}
            {profile.title_rarity === "mythic" && "👑 "}
            {profile.title_name}
        </div>
    </div>

</div>
            <div className="textProgressProfil">
                <p>EXP</p>
                <p>
                    {profile.xp}
                    /
                    {nextLevelXp}
                </p>
            </div>
            <div
                className="hpBarContainer"
                style={{
                    width: "100%"
                }}
            >
                <div
                    className="hpBar"
                    style={{
                        width: `${progress}%`
                    }}
                />
            </div>
        </>
    );
}
export default ProfileHeader;