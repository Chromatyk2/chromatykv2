import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { useCookies } from 'react-cookie';

function Inventory(props) {
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        Axios.post('/api/createInventory', {
            user: cookies.user.data[0].id
        })
        .then(function (response) {
            Axios
            .get("/api/getInventory/" + cookies.user.data[0].id)
            .then(function (response) {
                console.log(response);
            })
        })
    }, []);
    return (
        <>
            <p className="pseudoProfil">Inventaire</p>
            <div className={"fightActionsContainer"}>
                <div className={"fightActions"}>
                    < img src={"/exps.png"} />
                    <p>Bonbon S</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/expm.png"} />
                    <p>Bonbon M</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/expl.png"} />
                    <p>Bonbon L</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/ball.png"} />
                    <p>Pokéball</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/great.png"} />
                    <p>Super Ball</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/ultra.png"} />
                    <p>Hyper Ball</p>
                    <p>x 1</p>
                </div>
                <div className={"fightActions"}>
                    < img src={"/master.png"} />
                    <p>Master Ball</p>
                    <p>x 1</p>
                </div>
            </div>
        </>
    )
}

export default Inventory
