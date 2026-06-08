import Axios from "axios";
import ShadowSmokeFrontDex from "../shadowSmokeFrontDex";
import ShadowSmokeBackDex from "../shadowSmokeBackDex";
import { useState, useRef } from "react";

function ProfileCompanions({ profileData, reload, isOwner }) {
    const pokemonContainerRef = useRef(null);
    const profile =
        profileData.profile;
    const companions =
        profileData.maxLevelCompanions || [];
    const activeCompagnon =
        profileData.activeCompanion;
    async function selectCompanion(number) {
        if (!isOwner) {
            return;
        }
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
            <div style={{position:"relative"}} className="skinContainer">
                {companions.map((val, key) => {
                    return (
                        <div style={{position:"relative"}} onClick={() => selectCompanion(val.number, val.color)} loading={"lazy"} className={"profilPicture"}>
                                {val.negative === 1 && <ShadowSmokeBackDex targetRef={pokemonContainerRef} />}
                                {val.negative === 1 && <ShadowSmokeFrontDex targetRef={pokemonContainerRef} />}
                                <img style={{ maxHeight: "63px", width: "auto", maxWidth: "100%",
                                position: "absolute",
                                left: 0,
                                right: 0,
                                margin: "auto",
                                top: 0,
                                bottom: 0
                                }}
                                    className={val.negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                    src={`/Sprites/${val.negative === 1 ? "shiny" : "normal"}/${val.number}.gif`}
                                    alt=""
                                />
                            </div>
                        )
                    })
                }
            </div>            
        </div>
    );
}

export default ProfileCompanions;