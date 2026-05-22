import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { useCookies } from 'react-cookie';

function Inventory(props) {
    const [cookies, setCookie] = useCookies();
    const [inventory, setInventory] = useState([]);
    const [onLoad, setOnload] = useState(true);
    useEffect(() => {
        Axios
        .get("/api/getInventory/" + cookies.user.data[0].id)
        .then(function (response) {
            setInventory(response.data);
            setOnload(false);
        })
    }, []);
    const itemOrder = [
        "box",
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
    const visibleInventory = inventory.filter(item => item.quantity > 0);
    const sortedInventory = [...visibleInventory].sort((a, b) => {
        const indexA = itemOrder.indexOf(a.slug);
        const indexB = itemOrder.indexOf(b.slug);
        // les items non trouvés vont à la fin
        const safeIndexA = indexA === -1 ? 999 : indexA;
        const safeIndexB = indexB === -1 ? 999 : indexB;
        return safeIndexA - safeIndexB;
    });
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
    function openLootbox() {
        if (inventory.find((item) => item.slug === "box").quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: "box"
            }).then(function (response) {
                const candyTier = Math.random();
                if (candyTier < 0.10) {
                    var item = "Bonbon L";
                    var slug = "expl";
                    var quantity = Math.floor((Math.random() * 5) + 1);
                } else if (candyTier < 0.40) {
                    var item = "Bonbon M";
                    var slug = "expm";
                    var quantity = Math.floor((Math.random() * 10) + 1);
                } else {
                    var item = "Bonbon S";
                    var slug = "exps";
                    var quantity = Math.floor((Math.random() * 10) + 1);
                }
                Axios.post('/api/addCandy', {
                    user: cookies.user.data[0].id,
                    item: item,
                    slug: slug,
                    quantity: quantity
                }).then(function (response) {
                    const ballTier = Math.random();
                    if (ballTier < 0.01) {
                        var item = "Master Ball";
                        var slug = "master";
                        var quantity = 1;
                    } else if (ballTier < 0.11) {
                        var item = "Hyper Ball";
                        var slug = "ultra";
                        var quantity = Math.floor((Math.random() * 5) + 1);
                    } else if (ballTier < 0.41) {
                        var item = "Super Ball";
                        var slug = "great";
                        var quantity = Math.floor((Math.random() * 5) + 1);
                    } else {
                        var item = "Poke Ball";
                        var slug = "ball";
                        var quantity = Math.floor((Math.random() * 5) + 1);
                    }
                    Axios.post('/api/addCandy', {
                        user: cookies.user.data[0].id,
                        item: item,
                        slug: slug,
                        quantity: quantity
                    }).then(function (response) {
                        const honeyTier = Math.random();
                        if (honeyTier < 0.0001) {
                            var item = "Miel Négatif";
                            var slug = "negative";
                        } else if (honeyTier < 0.011) {
                            var item = "Miel Chromatique";
                            var slug = "shiny";
                        } else if (honeyTier <0.0111) {
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
                            Axios.post('/api/addCandy', {
                                user: cookies.user.data[0].id,
                                item: "Super Bonbon",
                                slug: "rarecandy",
                                quantity: Math.floor((Math.random() * 5) + 1)
                            }).then(function (response) {
                                const megaCanduTier = Math.random();
                                if (megaCanduTier < 0.001) {
                                    Axios.post('/api/addItem', {
                                        user: cookies.user.data[0].id,
                                        item: "Mega Bonbon",
                                        slug: "megacandy"
                                    }).then(function (response) {
                                        Axios
                                            .get("/api/getInventory/" + cookies.user.data[0].id)
                                            .then(function (response) {
                                                setInventory(response.data);
                                            })
                                    })
                                } else {
                                    Axios
                                        .get("/api/getInventory/" + cookies.user.data[0].id)
                                        .then(function (response) {
                                            setInventory(response.data);
                                        })
                                }
                            })
                        })
                    })
                })
            })
        }
    }
    return (
        <div className="globalContainerCenter">
            {onLoad === false &&
                <>
                    {sortedInventory.length > 0 ? (
                        <>
                            <p className="pseudoProfil">Inventaire</p>
                            <div className="inventoryContainer">
                                {sortedInventory.map((val) => (
                                    <div key={val.slug} className="honeyActions" style={val.slug === "box" ? getStyle(val.slug) : {}} onClick={val.slug === "box" ? openLootbox : undefined}>
                                        <img alt={val.slug} src={getImage(val.slug)} style={val.slug !== "box" ? getStyle(val.slug) : {}} />
                                        <p>{val.item}</p>
                                        <p>x {val.quantity}</p>
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
