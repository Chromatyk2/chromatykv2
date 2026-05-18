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
        const honeyTier = Math.random() * 100;
        if (honeyTier < 98) {
            var item = "Miel Ordinaire";
            var slug = "honey";
        } else if (honeyTier < 99) {
            var item = "Miel Légendaire";
            var slug = "legendary";
        } else if (honeyTier < 100) {
            var item = "Miel Chromatique";
            var slug = "shiny";
        } else {
            var item = "Miel Négatif";
            var slug = "negative";
        }
        Axios.post('/api/addItem', {
            user: cookies.user.data[0].id,
            item: item,
            slug: slug
        }).then(function (response) {
                const ballTier = Math.random() * 100;
            if (ballTier < 98) {
                    var item = "Poke Ball";
                    var slug = "ball";
            } else if (ballTier < 99) {
                    var item = "Super Ball";
                    var slug = "great";
            } else if (ballTier < 100) {
                    var item = "Hyper Ball";
                    var slug = "ultra";
                } else {
                    var item = "Master Ball";
                    var slug = "master";
                }
                Axios.post('/api/addItem', {
                    user: cookies.user.data[0].id,
                    item: item,
                    slug: slug
                }).then(function (response) {
                        const candyTier = Math.random() * 100;
                        if (candyTier < 50) {
                                var item = "Bonbon S";
                                var slug = "exps";
                        } else if (candyTier < 90) {
                            var item = "Bonbon M";
                            var slug = "expm";
                        } else {
                            var item = "Bonbon L";
                            var slug = "expl";
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
    }
    return (
        <>
            <p className="pseudoProfil">Inventaire</p>
            <div className={"inventoryContainer"}>
                {inventory &&
                    inventory.map((val, key) => {
                        return (
                            val.slug === "box" ?
                                val.quantity > 0 &&
                                <div onClick={openLootbox} style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", filter: "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" }} className={"honeyActions"}>
                                    <img src={"/"+val.slug+".png"} />
                                    <p>{val.item}</p>
                                    <p>x {val.quantity}</p>
                                </div>
                                :
                                val.quantity > 0 &&
                                <div className={"honeyActions"}>
                                        <img style={{ filter: val.slug == "honey" ? "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" : val.slug == "shiny" ? "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)" : val.slug == "legendary" ? "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" : val.slug == "negative" && "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)" }} src={"/" + val.slug == "honey" || val.slug == "shiny" || val.slug == "legendary" || val.slug == "negative"  ? "honey" : val.slug + ".png"} />
                                    <p>{val.item}</p>
                                    <p>x {val.quantity}</p>
                                </div>
                            
                        )
                    })
                }
            </div>
         </>
    )
}

export default Inventory
