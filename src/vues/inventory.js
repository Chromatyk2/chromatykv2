import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { useCookies } from 'react-cookie';

function Inventory(props) {
    const [cookies, setCookie] = useCookies();
    const [inventory, setInventory] = useCookies(null);
    useEffect(() => {
        Axios.post('/api/createInventory', {
            user: cookies.user.data[0].id
        })
        .then(function (response) {
            Axios
            .get("/api/getInventory/" + cookies.user.data[0].id)
            .then(function (response) {
                setInventory(response.data[0]);
                console.log(response.data[0].box);
            })
        })
    }, []);
    return (
        <>
            <p className="pseudoProfil">Inventaire</p>
            <div className={"inventoryContainer"}>
                <div className={"honeyActions"}>
                    <img style={{ filter: "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" }} src={"/honey.png"} />
                    <p>Miel<br />Classique</p>
                    <p>x {inventory.honey}</p>
                </div>
                <div className={"honeyActions"}>
                    <img style={{ filter: "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" }} src={"/honey.png"} />
                    <p>Miel<br />Légendaire</p>
                    <p>x {inventory.legendary}</p>
                </div>
                <div className={"honeyActions"}>
                    <img style={{ filter: "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)" }} src={"/honey.png"} />
                    <p>Miel<br />Chromatique</p>
                    <p>x {inventory.shiny}</p>
                </div>
                <div class="honeyActions">
                    <img src="/honey.png" style={{ filter: "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)" }} />
                    <p>Miel<br />Négatif</p>
                    <p>x {inventory.negative}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/exps.png"} />
                    <p>Bonbon S</p>
                    <p>x {inventory.samall}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/expm.png"} />
                    <p>Bonbon M</p>
                    <p>x {inventory.medium}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/expl.png"} />
                    <p>Bonbon L</p>
                    <p>x {inventory.large}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/ball.png"} />
                    <p>Pokéball</p>
                    <p>x {inventory.pokeball}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/great.png"} />
                    <p>Super Ball</p>
                    <p>x {inventory.greatball}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/ultra.png"} />
                    <p>Hyper Ball</p>
                    <p>x {inventory.ultraball}</p>
                </div>
                <div className={"honeyActions"}>
                    < img src={"/master.png"} />
                    <p>Master Ball</p>
                    <p>x {inventory.msterball}</p>
                </div>
            </div>
        </>
    )
}

export default Inventory
