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
            console.log(response.data);
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
                                    <img src={"/" + val.slug + ".png"} />
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
