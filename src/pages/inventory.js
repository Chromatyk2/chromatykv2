import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios'
import { useCookies } from 'react-cookie';
import { useAuth } from "../context/AuthContext";

function Inventory(props) {
    const { user, loading } = useAuth();
    const [onLoad, setOnload] = useState(true);
    const [inventory, setInventory] = useState([]);
    const itemOrder = [
        "box",
        "booster",
        "fragement",
        "honey",
        "legendary",
        "shiny",
        "negative",
        "ball",
        "great",
        "ultra",
        "master",
        "exps",
        "expm",
        "expl",
        "rarecandy",
        "megacandy"

    ];
    const getImage = (slug) => {
        const honeyVariants = [
            "honey",
            "shiny",
            "legendary",
            "negative"
        ];
        return honeyVariants.includes(slug)
            ? "/honey.png"
            : `/${slug}.png`;
    };
    const getStyle = (slug) => {
        switch (slug) {
            case "box":
                return {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    filter:
                        "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)"
                };
            case "megacandy":
                return {
                    filter: "hue-rotate(182deg)"
                };
            case "honey":
                return {
                    filter:
                        "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)"
                };
            case "shiny":
                return {
                    filter:
                        "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)"
                };
            case "legendary":
                return {
                    filter:
                        "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)"
                };
            case "negative":
                return {
                    filter:
                        "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)"
                };
            default:
                return {};
        }
    };
    const sortedInventory =
        useMemo(() => {
            return inventory
                .filter(
                    item =>
                        item.quantity > 0
                )
                .sort((a, b) => {
                    const indexA =
                        itemOrder.indexOf(
                            a.slug
                        );
                    const indexB =
                        itemOrder.indexOf(
                            b.slug
                        );
                    return (
                        (indexA === -1
                            ? 999
                            : indexA)
                        -
                        (indexB === -1
                            ? 999
                            : indexB)
                    );
                });
        }, [inventory]);

    useEffect(() => {
        if (loading) {
            return;
        }
        loadInventory();
    }, [loading]);

    async function loadInventory() {
        try {
            const response =
                await Axios.get(
                    "/api/inventory"
                );
            setInventory(
                response.data
            );
        } catch (err) {
            console.error(err);
        } finally {
            setOnload(false);
        }
    }
    
    async function createLootbox() {
        try {
            await Axios.post(
                "/api/createLootbox"
            );
            loadInventory();
        } catch (err) {
            console.error(
                err.response?.data || err
            );
        }
    }
    async function openLootbox() {
        try {
            const response =
                await Axios.post(
                    "/api/openLootbox"
                );
            console.log(
                response.data.rewards
            );
            loadInventory();
        } catch (err) {
            console.error(
                err.response?.data || err
            );
        }
    }
    return (
        <div className="globalContainerCenter">
            {onLoad === false &&
                <>
                    {sortedInventory.length > 0 ? (
                        <>
                        <h2 className="pseudoProfil wood-sign">Sac d'inventaire</h2>
                            <div className="inventoryContainer">
                                {sortedInventory.map((val) => (
                                    <div key={val.slug} className="honeyActions" style={val.slug === "box" ? getStyle(val.slug) : {}} onClick={val.slug === "box" ? openLootbox : val.slug === "fragement" ? createLootbox : undefined}>
                                        <img alt={val.slug} src={getImage(val.slug)} style={val.slug !== "box" ? getStyle(val.slug) : {}} />
                                        <p>{val.item}</p>
                                        {val.slug === "fragement" ? <p>{val.quantity} / 100</p>  : <p>x {val.quantity}</p>}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="pseudoProfil">
                                Ton inventaire est vide, récupère des objets et des boosters sur les streams de Chromatyk
                            </p>
                            <a className="twitchLink" href="https://twitch.tv/chromatyk" target="_blank" rel="noreferrer">
                                Twitch
                            </a>
                        </>
                    )}
                </>
            }
        </div>
    )
}

export default Inventory
