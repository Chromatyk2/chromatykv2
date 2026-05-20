import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Profil() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [maxPokedex, setMaxPokedex] = useState(1198);
    const [images, setImages] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
    const [imagesShiny, setImagesShiny] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]);
    const [index, setIndex] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data);
                setIndex();

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
                <div className={"filterProfil"}>
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
                    <p style={{width: "100%",textAlign:"left",fontSize:"15px"}}>Progression</p>
                    {pokedex &&
                        <>
                            {pokedex.length > 0 &&
                                <div className={"boxProfilLarge"}>
                                    <div className={"profilHeader"}>
                                        <div className={"profilDex"}>
                                            <p>Pokédex Classique</p>
                                            <p className={"levelProfil"}>{pokedex.length} / {maxPokedex}</p>
                                        </div>
                                        <img src={"/Badge/lv" + images[Math.min(images.length - 1, Math.floor((pokedex.length / maxPokedex) * images.length))] + ".png"} />
                                    </div>
                                </div>
                        }
                        {pokedex.filter(item => (item.shiny === 1)).length > 0 &&
                            <div className={"boxProfilLarge"}>
                                <div className={"profilHeader"}>
                                    <div className={"profilDex"}>
                                        <p>Pokédex Shiny</p>
                                        <p className={"levelProfil"}>{pokedex.filter(item => (item.shiny === 1)).length} / {maxPokedex}</p>
                                    </div>
                                    <img src={"/Badge/lv" + imagesShiny[Math.min(imagesShiny.length - 1, Math.floor((pokedex.filter(item => (item.shiny === 1)).length / maxPokedex) * imagesShiny.length))] + "s.png"} />
                                </div>
                            </div>                            
                        }
                        {pokedex.filter(item => (item.negative === 1)).length > 0 &&
                            <>
                                <div className={"boxProfilLarge"}>
                                    <div className={"profilHeader"}>
                                        <div className={"profilDex"}>
                                            <p>Pokédex Négatif</p>
                                            <p className={"levelProfil"}>{pokedex.filter(item => (item.negative === 1)).length}  / {maxPokedex}</p>
                                        </div>
                                        <img src={"/Badge/lv" + imagesShiny[Math.min(imagesShiny.length - 1, Math.floor((pokedex.filter(item => (item.negative === 1)).length / maxPokedex) * imagesShiny.length))] + "n.png"} />
                                    </div>
                                </div>
                                <div className={"boxProfilLarge"}>
                                </div>
                            </>
                        }
                    </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profil;
