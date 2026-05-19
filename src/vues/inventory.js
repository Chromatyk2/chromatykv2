import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { useCookies } from 'react-cookie';

function Inventory(props) {
    const [cookies, setCookie] = useCookies();
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        Axios
        .get("/api/getInventory/" + cookies.user.data[0].id)
        .then(function (response) {
            setInventory(response.data);
        })
    }, []);
    function openLootbox() {
        if (inventory.find((item) => item.slug == "box").quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: "box"
            }).then(function (response) {

                const honeyTier = Math.random() * 100;
                if (honeyTier < 0.1) {
                    var item = "Miel Négatif";
                    var slug = "negative";
                } else if (honeyTier < 1) {
                    var item = "Miel Chromatique";
                    var slug = "shiny";
                } else if (honeyTier < 6) {
                    var item = "Miel Légendaire";
                    var slug = "legendary";
                } else {
                    var item = "Miel Ordinaire";
                    var slug = "honey";
                }
                Axios.post('/api/addItem', {
                    user: cookies.user.data[0].id,
                    item: item,
                    slug: slug
                }).then(function (response) {
                    const ballTier = Math.random() * 100;
                    if (ballTier < 1) {
                        var item = "Master Ball";
                        var slug = "master";
                    } else if (ballTier < 6) {
                        var item = "Hyper Ball";
                        var slug = "ultra";
                    } else if (ballTier < 36) {
                        var item = "Super Ball";
                        var slug = "great";
                    } else {
                        var item = "Poke Ball";
                        var slug = "ball";
                    }
                    Axios.post('/api/addItem', {
                        user: cookies.user.data[0].id,
                        item: item,
                        slug: slug
                    }).then(function (response) {
                        const candyTier = Math.random() * 100;
                        if (candyTier < 1) {
                            var item = "Bonbon L";
                            var slug = "expl";
                        } else if (candyTier < 40) {
                            var item = "Bonbon M";
                            var slug = "expm";
                        } else {
                            var item = "Bonbon S";
                            var slug = "exps";
                        }
                        Axios.post('/api/addItem', {
                            user: cookies.user.data[0].id,
                            item: item,
                            slug: slug
                        }).then(function (response) {
                            Axios
                                .get("/api/getInventory/" + cookies.user.data[0].id)
                                .then(function (response) {
                                    setInventory(response.data);
                                })
                        })
                    })
                })
            })
        }
    }
    return (
        <>
            {inventory &&
                inventory.filter(item => item.quantity > 0).length > 0 ? 
                <>
                    <p className="pseudoProfil">Inventaire</p>
                    <div className={"inventoryContainer"}>
                        {inventory &&
                            inventory.filter(item => item.slug === "box").map((val, key) => {
                                return (
                                    val.slug === "box" ?
                                        val.quantity > 0 &&
                                        <div onClick={openLootbox} style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", filter: "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" }} className={"honeyActions"}>
                                            <img src={"/" + val.slug + ".png"} />
                                            <p>{val.item}</p>
                                            <p>x {val.quantity}</p>
                                        </div>
                                        :
                                        val.quantity > 0 &&
                                        <div className={"honeyActions"}>
                                            <img style={{ filter: val.slug == "honey" ? "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" : val.slug == "shiny" ? "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)" : val.slug == "legendary" ? "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" : val.slug == "negative" && "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)" }} src={"/" + val.slug == "honey" || val.slug == "shiny" || val.slug == "legendary" || val.slug == "negative" ? "honey.png" : val.slug + ".png"} />
                                            <p>{val.item}</p>
                                            <p>x {val.quantity}</p>
                                        </div>

                                )
                            })
                        }
                        {inventory &&
                            inventory.filter(item => item.slug !== "box").map((val, key) => {
                                return (
                                    val.slug === "box" ?
                                        val.quantity > 0 &&
                                        <div onClick={openLootbox} style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", filter: "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" }} className={"honeyActions"}>
                                            <img src={"/" + val.slug + ".png"} />
                                            <p>{val.item}</p>
                                            <p>x {val.quantity}</p>
                                        </div>
                                        :
                                        val.quantity > 0 &&
                                        <div className={"honeyActions"}>
                                            <img style={{ filter: val.slug == "honey" ? "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" : val.slug == "shiny" ? "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)" : val.slug == "legendary" ? "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" : val.slug == "negative" && "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)" }} src={"/" + val.slug == "honey" || val.slug == "shiny" || val.slug == "legendary" || val.slug == "negative" ? "honey.png" : val.slug + ".png"} />
                                            <p>{val.item}</p>
                                            <p>x {val.quantity}</p>
                                        </div>

                                )
                            })
                        }
                    </div>
                </>
                :
                <>
                    <p className="pseudoProfil">Ton inventire est vide, récupère des objets et des boosters sur les stream de Chromatyk</p>
                    <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                </>
            }
         </>
    )
}

export default Inventory
