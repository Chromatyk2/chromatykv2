import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Pokedex() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [filteredPokedex, setFilteredPokedex] = useState(null);
    const [gen, setGen] = useState(0);
    const [isShiny, setIsShiny] = useState(0);
    const [isNegative, setIsNegative] = useState(0);
    const [genList, setGenList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [searchParams] = useSearchParams();
    const param = searchParams.get("user");
    const [onLoad, setOnload] = useState(true);
    useEffect(() => {
        initPage();
    }, [param]);
    useEffect(() => {
        initPage();
    }, []);
    function initPage() {
        let user;
        if (new URLSearchParams(window.location.search).has("user")) {
            user = new URLSearchParams(window.location.search).get("user");
        } else {
            user = cookies.user.data[0].id;
        }
        Axios
            .get("/api/getPokedex/" + user)
            .then(function (response) {
                setPokedex(response.data)
                setFilteredPokedex(response.data)
                setOnload(false);
            })
    }
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
    return (
        <div className={"globalContainer"}>
            <div className={"dexContainer"}>
                {onLoad === false &&
                    <>
                        <p>Pokédex</p>
                        <div className={"genFilter"}>
                            <button className={isShiny === 0 && isNegative === 0 && "active"} onClick={() => filterForm(0)}>Normal</button>
                            <button className={isShiny === 1 && "active"} onClick={() => filterForm("Shiny")}>Shiny</button>
                            <button className={isNegative === 1 && "active"} onClick={() => filterForm(1)}>Obscur</button>
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
                    </>
                }                
            </div>
        </div>
    );
}

export default Pokedex;
