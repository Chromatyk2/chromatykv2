import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Profil() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [filteredPokedex, setFilteredPokedex] = useState(null);
    const [gen, setGen] = useState(0);
    const [isShiny, setIsShiny] = useState(0);
    const [isNegative, setIsNegative] = useState(0);
    const [genList, setGenList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
                setFilteredPokedex(response.data)
            })
    }, []);
    return (
        <div className={"globalContainer"}>
            <div className={"profilContainer"}>
                <div className={"profilHeader"}>
                    <img src={"/Badge/Trainer2090.png"} />
                    <div className={"profilInfos"}>
                        <p>{cookies.user.data[0].login}</p>
                        <p className={"levelProfil"}>Niveau 1</p>
                    </div>
                </div>
                <div className={"genFilter"}>
                    <button>Profil</button>
                    <button>Shiny</button>
                    <button>Négatif</button>
                </div>
                <div className={"progressBarProfilExternal"}>
                    <div style={{ width: "50%" }} className={"progressBarProfilInternal"}>
                    </div>
                    <p>EXP</p>
                    <p>0/100</p>
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
        </div>
    );
}

export default Profil;
