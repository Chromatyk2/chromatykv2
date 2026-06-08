import Axios from "axios";
import { useState } from "react";
import useExpeditionTimer from "../../hooks/useExpeditionTimer";
import moment from "moment";

function ProfileExpeditions({
    profileData,
    reload, isOwner
}) {
    const [reward, setReward] =
        useState(null);
    const expedition =
        profileData.expeditions?.find(
            item => item.active === 1
        );
    const companions =
        profileData.maxLevelCompanions || [];
    const {
        progress,
        remainingTime,
        finished
    } = useExpeditionTimer(
        expedition
        );
    async function runExpedition(
        number
    ) {
        if (!isOwner) {
            return;
        }        
        try {
            await Axios.post(
                "/api/newExpedition",
                {
                    number
                }
            );
            const timeout =
                setTimeout(() => {
                    reload();
                }, 1500);
            return () =>
                clearTimeout(timeout);
        } catch (err) {
            console.error(err);
        }
    }
    async function recoverReward() {
        try {
            const response =
                await Axios.post(
                    `/api/recoverExpeditionReward/${expedition.number}`
                );
            setReward(response.data.reward);
            setTimeout(() => {
                reload();
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    }
    const expeditionNumbers =
        new Set(
            profileData.expeditions.map(
                expedition =>
                    expedition.number
            )
        );

    const availableCompanions =
        companions.filter(
            companion =>
                !expeditionNumbers.has(
                    companion.number
                )
        );
    if (!expedition) {
        return (
            <div className="compagnonsContainer">
                <div className="skinContainer">
                    {availableCompanions.map((val, key) => {
                        return (
                            <div onClick={() => runExpedition(val.number, val.tier, val.negative, val.shiny)} loading={"lazy"} style={{ filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
    return (
        <div style={{ width: "100%", justifyContent: "center" }} className={"skinContainer"}>
            <div
                className="fightContainer"
                style={{
                    backgroundImage:
                        "url(/expeditionBack.png)"
                }}
            >
                <p>
                    {expedition.pokemon}
                </p>
                <div
                    className={
                        `fightSpriteCard ${
                            expedition.negative === 1
                                ? "shadowPokemon"
                                : ""
                        }`
                    }
                >
                    <img className={"pokemonSprite"}
                        src={
                            `/Sprites/${
                            expedition.shiny === 1
                                ? "shiny"
                                : "normal"
                            }/${
                            expedition.number
                            }.gif`
                        }
                        alt=""
                    />
                    <div className={"pokemon-shadow"}></div>
                </div>
                <div style={{width:"70%"}} className="hpBarContainer">
                    <div
                        className="hpBar"
                        style={{
                            width:
                                `${progress}%`,
                            background:
                                "linear-gradient(90deg,#2446ab 0%,#02c2e8 100%)"
                        }}
                    />
                </div>
                {!finished && (
                    <p>
                        {remainingTime}
                    </p>
                )}
                {finished &&
                    !reward && (

                        <button
                            className="validExpeditionButton"
                            onClick={
                                recoverReward
                            }
                        >
                            Récupérer
                        </button>

                    )}
                {reward && (
                    <>
                        <p>
                            Le compagnon a trouvé
                            <span
                                style={{
                                    color:
                                        "#ffc312"
                                }}
                            >
                                {" "}
                                {reward}
                            </span>
                            {" "}fragments !
                        </p>
                        {reward.boosters > 0 && (
                            <p>
                                🎁 {reward.boosters} booster
                                {reward.boosters > 1 ? "s" : ""}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default ProfileExpeditions;