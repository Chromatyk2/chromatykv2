import Axios from "axios";
import { useState } from "react";
import useExpeditionTimer from "../../hooks/useExpeditionTimer";

function ProfileExpeditions({
    profileData,
    reload
}) {
    const [reward, setReward] =
        useState(null);
    const expedition =
        profileData.expeditions?.find(
            item => item.active === 1
        );
    const {
        progress,
        remainingTime,
        finished
    } = useExpeditionTimer(
        expedition
    );
    async function recoverReward() {
        try {
            await Axios.post(
                `/api/closeExpedition/${expedition.number}`
            );
            const rewards = {
                normal: {
                    1: [1, 3],
                    2: [2, 4],
                    3: [4, 6],
                    4: [6, 8]
                },
                shiny: {
                    1: [2, 4],
                    2: [4, 6],
                    3: [7, 10],
                    4: [11, 14]
                },
                negative: {
                    1: [3, 5],
                    2: [6, 8],
                    3: [11, 14],
                    4: [27, 31]
                }
            };
            const form =
                expedition.negative === 1
                    ? "negative"
                    : expedition.shiny === 1
                        ? "shiny"
                        : "normal";
            const [min, max] =
                rewards[form][
                expedition.tier
                ];
            const amount =
                Math.floor(
                    Math.random() *
                    (max - min + 1)
                ) + min;
            await Axios.post(
                "/api/addCandy",
                {
                    user:
                        profileData.profile.user,
                    item:
                        "Fragment de Pack",
                    slug:
                        "fragement",
                    quantity:
                        amount
                }
            );
            setReward(amount);
            reload();
        } catch (err) {
            console.error(err);
        }
    }
    if (!expedition) {
        return (
            <p>
                Aucune expédition en cours.
            </p>
        );
    }
    return (
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
                <img
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
            </div>
            <div className="hpBarContainer">
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
            )}
        </div>
    );
}
export default ProfileExpeditions;