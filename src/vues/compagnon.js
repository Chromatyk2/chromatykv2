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
    //Pokedex
    const [pokedex, setPokedex] = useState(null);
    const [filteredPokedex, setFilteredPokedex] = useState(null);
    const [gen, setGen] = useState(0);
    const [isShiny, setIsShiny] = useState(0);
    const [isNegative, setIsNegative] = useState(0);
    const [genList, setGenList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    //Pokemon
    const [haveCompagnon, setHaveCompagnon] = useState(false);
    const [chooseCompagnon, setChooseCompagnon] = useState(false);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
                setFilteredPokedex(response.data)
            })
    }, []);
    function filterGen(e) {
        setGen(e);
        if (e > 0) {
            setFilteredPokedex(pokedex.filter(item => item.gen === e))
        } else {
            setFilteredPokedex(pokedex)
        }
    }
    function filterForm(e) {
        if (e === "Shiny") {
            setIsShiny(1);
            setIsNegative(0);
        }
        if (e === 1) {
            setIsNegative(1);
            setIsShiny(0);
        }
        if (e === 0) {
            setIsShiny(0);
            setIsNegative(0);
        }

    }
    useEffect(() => {
        Axios.get('/api/getCurrentCompagnon/'+cookies.user.data[0].id)
            .then(function (response) {
                if (response.data.length < 1) {
                    setHaveCompagnon(false)
                } else {
                    setHaveCompagnon(true)

                }
            })
    }, []);
    function chooseCompgnon() {
        setChooseCompagnon(true)
    }
    return (
        <div className={"globalContainerCenter"}>
            <p>Compagnon</p>
            <div className={"fightContainer"}>
                {!haveCompagnon &&
                    !chooseCompagnon &&
                    <>
                    <div onClick={chooseCompgnon} className={"honeyActionsContainer"}>
                            <div className={"honeyActions"}>
                                <img src={"/doll.png"} />
                                <p>Choisis ton premier compagnon</p>
                            </div>                            
                        </div>
                    </>
                }
                {chooseCompagnon &&
                    <>
                    <div style={{position:"absolute", top: "-100px",justifyContent:"center"}} className={"dexContainer"}>
                            <div className={"genFilter"}>
                                <button className={isShiny === 0 && isNegative === 0 && "active"} onClick={() => filterForm(0)}>Normal</button>
                                <button className={isShiny === 1 && "active"} onClick={() => filterForm("Shiny")}>Shiny</button>
                                <button className={isNegative === 1 && "active"} onClick={() => filterForm(1)}>Négatif</button>
                            </div>
                            <div className={"genFilter"}>
                                <button className={gen === 0 && "active"} onClick={() => filterGen(0)} value={0}>Toutes</button>
                                {genList.map((val, key) => {
                                    return (
                                        <button className={gen === val && "active"} onClick={() => filterGen(val)} value={val}>Gen {val}</button>
                                    )
                                })}

                            </div>
                            {filteredPokedex &&
                                filteredPokedex.filter(item => (item.shiny === isShiny && item.negative === isNegative)).map((val, key) => {
                                    return (
                                        <>
                                            <div className={"dexCard"}>
                                                <div className={"dexSpriteContainer"}>
                                                    <span className={"dexNumber"}>#{val.pokemon}</span>
                                                    <div>
                                                        <img style={{ filter: isNegative === 1 ? "invert(1)" : "invert(0)" }} loading="lazy" className={"dexSprite"} src={isShiny === 1 ? "/Sprites/Shiny/" + val.pokemon + ".gif" : "/Sprites/Normal/" + val.pokemon + ".gif"} />
                                                    </div>
                                                </div>
                                                <div className={"dexDescription"}>
                                                    <p className={"dexName"}>{val.name}</p>
                                                    <p className={"dexDate"}>{moment(val.date).utc().format('DD/MM/YYYY')}</p>
                                                </div>
                                            </div>
                                        </>

                                    )
                                })
                            }
                        </div>
                    </>
                } 
            </div>
        </div>
    )
}

export default Compagnon
