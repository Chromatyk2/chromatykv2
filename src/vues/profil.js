import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';
import Color from 'color-thief-react';
import { getColorSync } from 'colorthief';




function Profil() {
    const [cookies, setCookie] = useCookies();
    const [profil, setProfil] = useState(null);
    const [maxPokedex, setMaxPokedex] = useState(1198);
    const [images, setImages] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
    const [imagesShiny, setImagesShiny] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]);
    const [index, setIndex] = useState(null);
    const [body, setBody] = useState(1);
    const [color, setColor] = useState(1);
    const [skins, setSkins] = useState([]);
    const [loadSkin, setLoadSkin] = useState(false);
    useEffect(() => {
        Axios
            .get("/api/getUser/" + cookies.user.data[0].id)
            .then(function (response) {
                setProfil(response.data);
                setIndex();
                const img = new Image();
                img.src = "/Skins/Trainer"+response.data[0].skin+".png";

                img.onload = () => {
                    setColor(getColorSync(img).hex());
                };

            })
    }, []);
    function changeSkin(e) {
        Axios.post('/api/addProfil', {
            user:cookies.user.data[0].id,
            login:cookies.user.data[0].login,
            level:profil[0].level,
            xp: profil[0].xp,
            skin:e
        })
        .then(function (response) {
            Axios.get("/api/getUser/" + cookies.user.data[0].id)
            .then(function (response) {
                setProfil(response.data);
                setIndex();
                const img = new Image();
                img.src = "/Skins/Trainer" + response.data[0].skin + ".png";

                img.onload = () => {
                    setColor(getColorSync(img).hex());
                };
            })
        })
    }
    function addSkin() {
        setLoadSkin(true);
        if (skins.length < profil[0].level) {
            Axios.post('/api/addNewSkin', {
                user: cookies.user.data[0].id
            })
                .then(function (response) {
                    changePage(2);
            })
        }
    }
    function changePage(e) {
        if (e !== 2) {
            setBody(e);
        } else {
            Axios
                .get("/api/getTrainers/" + cookies.user.data[0].id)
                .then(async (response) => {

                    const newSkins = [];

                    for (const val of response.data) {

                        const img = new Image();

                        img.src = "/Skins/Trainer" + val.skin + ".png";

                        await new Promise((resolve) => {

                            img.onload = () => {

                                const color = getColorSync(img).hex();

                                newSkins.push({
                                    skins: val.skin,
                                    color: color
                                });

                                resolve();

                            };

                            img.onerror = () => {
                                console.log("Erreur image :", img.src);
                                resolve();
                            };

                        });

                    }

                    setSkins(newSkins);
                    setBody(e);
                    setLoadSkin(false);

                });
        }
    }
    return (
        <div className={"globalContainer"}>
            {profil &&
                <div className={"profilContainer"}>
                    <div className={"profilHeader"}>
                        <div style={{backgroundColor: color,backgroundImage: `url("/Skins/Trainer${profil[0].skin}.png")`,backgroundSize: "cover",backgroundPosition: "center"}} className={"profilPicture"}>
                        </div>
                        {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                        <div className={"profilInfos"}>
                            <p>{cookies.user.data[0].login}</p>
                            <p className={"levelProfil"}>Niveau {profil[0].level}</p>
                        </div>
                    </div>
                    <div className={"textProgressProfil"}>
                        <p>EXP</p>
                        <p>{profil[0].xp}/{profil[0].level * 10}</p>
                    </div>
                    <div className={"progressBarProfilExternal"}>
                        <div style={{ width: +parseFloat(profil[0].xp / (profil[0].level * 10) * 100).toFixed(2) + "%" }} className={"progressBarProfilInternal"}>
                        </div>
                    </div>
                    <div className={"filterProfil"}>
                        <button className={body === 1 && "active"} onClick={() => changePage(1)}>Profil</button>
                        <button className={body === 2 && "active"} onClick={() => changePage(2)}>Skins {profil[0].level - skins.length > 0 && ": "+profil[0].level - skins.length}</button>
                    </div>                    
                    <div className={"profilBody"}>
                        {body === 1 &&
                            <>
                                <p style={{ width: "100%", textAlign: "left", fontSize: "15px" }}>Progression</p>
                                {profil &&
                                    <>
                                        {profil.length > 0 &&
                                            <div className={"boxProfilLarge"}>
                                                <div className={"profilHeader"}>
                                                    <div className={"profilDex"}>
                                                        <p>Pokédex Classique</p>
                                                        <p className={"levelProfil"}>{profil.length} / {maxPokedex}</p>
                                                    </div>
                                                    <img src={"/Badge/lv" + images[Math.min(images.length - 1, Math.floor((profil.length / maxPokedex) * images.length))] + ".png"} />
                                                </div>
                                            </div>
                                        }
                                        {profil.filter(item => (item.shiny === 1)).length > 0 &&
                                            <div className={"boxProfilLarge"}>
                                                <div className={"profilHeader"}>
                                                    <div className={"profilDex"}>
                                                        <p>Pokédex Shiny</p>
                                                        <p className={"levelProfil"}>{profil.filter(item => (item.shiny === 1)).length} / {maxPokedex}</p>
                                                    </div>
                                                    <img src={"/Badge/lv" + imagesShiny[Math.min(imagesShiny.length - 1, Math.floor((profil.filter(item => (item.shiny === 1)).length / maxPokedex) * imagesShiny.length))] + "s.png"} />
                                                </div>
                                            </div>
                                        }
                                        {profil.filter(item => (item.negative === 1)).length > 0 &&
                                            <>
                                                <div className={"boxProfilLarge"}>
                                                    <div className={"profilHeader"}>
                                                        <div className={"profilDex"}>
                                                            <p>Pokédex Négatif</p>
                                                            <p className={"levelProfil"}>{profil.filter(item => (item.negative === 1)).length}  / {maxPokedex}</p>
                                                        </div>
                                                        <img src={"/Badge/lv" + imagesShiny[Math.min(imagesShiny.length - 1, Math.floor((profil.filter(item => (item.negative === 1)).length / maxPokedex) * imagesShiny.length))] + "n.png"} />
                                                    </div>
                                                </div>
                                                <div className={"boxProfilLarge"}>
                                                </div>
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                        {body === 2 &&
                            loadSkin === false &&
                            skins &&
                            skins.length < profil[0].level &&
                            <div class={"openSkinDiv"} onClick={addSkin}>
                                <p className={"openSkinText"}>{profil[0].level - skins.length}</p>
                            </div>
                        }
                        {body === 2 &&
                            <div className={"skinContainer"}>
                                {skins &&
                                    skins.map((val, key) => {
                                        return (                                            
                                            <div onClick={() => changeSkin(val.skins)} loading={"lazy"} style={{backgroundColor: val.color,backgroundImage: `url("/Skins/Trainer${val.skins}.png")`,backgroundSize: "cover",backgroundPosition: "center"}} className={"profilPicture"}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Profil;
