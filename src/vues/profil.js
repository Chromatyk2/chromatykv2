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
                <div className={"textProgressProfil"}>
                    <p>EXP</p>
                    <p>100000/1000000</p>
                </div>
                <div className={"progressBarProfilExternal"}>
                    <div style={{ width: "50%" }} className={"progressBarProfilInternal"}>
                    </div>
                </div>
                <div className={"profilBody"}>
                    <div className={"boxProfilLarge"}>
                        <div className={"profilHeader"}>
                            <div className={"profilInfos"}>
                                <p>Pokédex Classique</p>
                                <p className={"levelProfil"}>1198 / 1198</p>
                            </div>
                            <img src={"/Badge/lv1.png"} />
                        </div>
                    </div>
                    <div className={"boxProfilLarge"}>
                        <div className={"profilHeader"}>
                            <div className={"profilInfos"}>
                                <p>Pokédex Shiny</p>
                                <p className={"levelProfil"}>1198 / 1198</p>
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
                </div>
            </div>
        </div>
    );
}

export default Profil;
