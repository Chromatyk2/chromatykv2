import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import ProgressBarFight from '../components/progressBarFight.js';

function Compagnon() {
    //Cookies
    const [cookies, setCookie] = useCookies();
    //Compagnon
    const [pokedex, setPokedex] = useState(false);
    //Pokemon
    const [haveCompagnon, setHaveCompagnon] = useState(false);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [profil, setProfil] = useState(null);
    useEffect(() => {
        Axios.get('/api/getCurrentCompagnon/'cookies.user.data[0].id)
            .then(function (response) {
                if (response.data.length < 1) {
                    setHaveCompagnon(false)
                } else {
                    setHaveCompagnon(true)

                }
            })
    }, []);
    return (
        <div className={"globalContainerCenter"}>
            <p>Compagnon</p>
            <div className={"fightContainer"}>
                {!haveCompagnon &&
                    <>
                        <div className={"honeyActionsContainer"}>
                            <div className={"honeyActions"}>
                                <img src={"/doll.png"} />
                                <p>Choisis ton premier compagnon</p>
                            </div>                            
                        </div>
                    </>
                }                
            </div>
        </div>
    )
}

export default Compagnon
