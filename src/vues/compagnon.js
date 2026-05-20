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
    const [compagnon, setCompagnon] = useState(false);
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
                setFilteredPokedex(response.data)
                Axios.get('/api/getCurrentCompagnon/' + cookies.user.data[0].id)
                    .then(function (response) {
                        if (response.data.length < 1) {
                            setHaveCompagnon(false)
                            setCompagnon(response.data);
                        } else {
                            Axios
                                .get("/api/getInventory/" + cookies.user.data[0].id)
                                .then(function (response) {
                                    setInventory(response.data);
                                    setHaveCompagnon(true)
                                })
                        }
                    })
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
    function chooseCompgnon() {
        setChooseCompagnon(true)
    }
    function changeCompagnon(e, f, g, h) {
        Axios.post('/api/updateCurrentCompagnon', {
            user: cookies.user.data[0].id
        })
            .then(function (response) {
                Axios.post('/api/newCompagnon', {
                    user: cookies.user.data[0].id,
                    number: e,
                    pokemon: f,
                    shiny: g,
                    negative: h,
                    level: 1,
                    xp: 0,
                    active: 1
                }).then(function (response) {
                    Axios.get('/api/getCurrentCompagnon/' + cookies.user.data[0].id)
                        .then(function (response) {
                            setHaveCompagnon(true)
                            setChooseCompagnon(false)
                            setCompagnon(response.data);
                        })
                })
            })
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
                                            <div onClick={() => changeCompagnon(val.pokemon, val.name, isShiny, isNegative)} className={"dexCardCompagnon"}>
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
                {haveCompagnon &&
                    compagnon &&
                    compagnon.length > 0 &&
                    !chooseCompagnon && (
                        <>
                            <p className="fightName">{compagnon[0].pokemon}</p>

                            <div className="tierFight">
                                Nv.{compagnon[0].level}
                            </div>

                            <div
                                className="fightSpriteCard"
                                style={{
                                    filter: compagnon[0].negative === 1 ? "invert(1)" : "none",
                                    backgroundSize: "contain",
                                    backgroundImage: `url(/Sprites/${compagnon[0].shiny === 1 ? "shiny" : "normal"
                                        }/${compagnon[0].number}.gif)`
                                }}
                            />
                        </>
                    )}
                {inventory &&
                    compagnon &&
                    compagnon.length > 0 &&
                    inventory.some(item => item.slug === "rarecandy" && item.quantity > 0) &&
                    compagnon[0].level < 100 && (
                        <div className="fightActionsContainer">
                            <div className="fightActions">
                                <img src="/rarecandy.png" />
                                <p>Super Bonbon</p>
                                <p>
                                    x {inventory.find(item => item.slug === "rarecandy")?.quantity}
                                </p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Compagnon
