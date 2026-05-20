import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Profil() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data);
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
                    {pokedex &&
                        <>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Classique</p>
                                        <p className={"levelProfil"}>{pokedex.length} / 1198</p>
                                    </div>
                                    <img src={"/Badge/lv1.png"} />
                                </div>
                            </div>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Shiny</p>
                                    <p className={"levelProfil"}>{pokedex.filter(item => (item.shiny === 1)).length} / 1198</p>
                                    </div>
                                    <img src={"/Badge/lv1.png"} />
                                </div>
                            </div>
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilInfos"}>
                                        <p>Pokédex Négatif</p>
                                    <p className={"levelProfil"}>{pokedex.filter(item => (item.negative === 1)).length}  / 1198</p>
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
