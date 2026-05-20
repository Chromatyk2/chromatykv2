import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Profil() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [uniqueDex, setUniqueDex] = useState([]);
    const [uniqueDexShiny, setUniqueDexShiny] = useState([]);
    const [uniqueDexNegative, setUniqueDexNegative] = useState([]);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data);
                response.data.map(item => {
                    if (uniqueDex.indexOf(item.pokemon) === -1) {
                        setUniqueDex(oldArray => [...oldArray, item.pokemon]);
                    }
                });
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
                <div className={"textProgressProfil"}>
                    <p>EXP</p>
                    <p>100000/1000000</p>
                </div>
                <div className={"progressBarProfilExternal"}>
                    <div style={{ width: "50%" }} className={"progressBarProfilInternal"}>
                    </div>
                </div>
                <div className={"profilBody"}>
                    {uniqueDex.length > 0 &&
                        <>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Classique</p>
                                        <p className={"levelProfil"}>{uniqueDex.length} / 1198</p>
                                    </div>
                                    <img src={"/Badge/lv1.png"} />
                                </div>
                            </div>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Shiny</p>
                                        <p className={"levelProfil"}>{1198} / 1198</p>
                                    </div>
                                    <img src={"/Badge/lv1.png"} />
                                </div>
                            </div>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Négatif</p>
                                        <p className={"levelProfil"}>1198 / 1198</p>
                                    </div>
                                    <img src={"/Badge/lv1.png"} />
                                </div>
                            </div>
                            <div className={"boxProfilLarge"}>
                            </div>
                    </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profil;
