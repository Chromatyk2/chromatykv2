import React, { useState, useEffect } from 'react';
import { useLocation, useParams} from "react-router-dom";
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
    const [colorShiny, setColorShiny] = useState(1);
    const [skins, setSkins] = useState([]);
    const [loadSkin, setLoadSkin] = useState(false);
    const [compagnon, setCompagnon] = useState(null);
    const [compagnonList, setCompagnonList] = useState(null);
    const { param } = useParams();
    useEffect(() => {
        initPage();
    }, []);
    useEffect(() => {
        initPage();

        // fetchUser(id)
    }, [param]);
    function initPage() {
        let user;
        if (new URLSearchParams(window.location.search).has("user")) {
            user = new URLSearchParams(window.location.search).get("user");
        } else {
            user = cookies.user.data[0].id;
        }
        Axios
            .get("/api/getUser/" + user)
            .then(function (response) {
                Axios.post('/api/updateLevel', {
                    user: user,
                    level: Math.floor((Math.sqrt(1 + (16 * response.data[0].xp) / 100) - 1) / 2 + 1)
                }).then(function (response) {
                    Axios
                        .get("/api/getUser/" + user)
                        .then(function (response) {
                            setProfil(response.data);
                            setIndex();
                            const img = new Image();
                            img.src = "/Skins/Trainer" + response.data[0].skin + ".png";
                            img.onload = () => {
                                setColor(getColorSync(img).hex());
                            };
                            Axios
                                .get("/api/getActiveCompagnon/" + user + "/" + response.data[0].compagnon)
                                .then(function (response) {
                                    setCompagnon(response.data);
                                })
                        })
                })
            })
    }
    function changeSkin(e) {
        if (!new URLSearchParams(window.location.search).has("user")) {
            Axios.post('/api/addProfil', {
                user: cookies.user.data[0].id,
                login: cookies.user.data[0].login,
                level: profil[0].level,
                xp: profil[0].xp,
                skin: e,
                compagnon: profil[0].compagnon
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
    }
    function changeActiveCompagnon(e) {
        if (!new URLSearchParams(window.location.search).has("user")) {
            Axios.post('/api/addProfil', {
                user: cookies.user.data[0].id,
                login: cookies.user.data[0].login,
                level: profil[0].level,
                xp: profil[0].xp,
                skin: profil[0].skin,
                compagnon: e
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
                            Axios
                                .get("/api/getActiveCompagnon/" + cookies.user.data[0].id + "/" + response.data[0].compagnon)
                                .then(function (response) {
                                    setCompagnon(response.data);
                                })
                        })
                })
        }
    }
    function addSkin() {
        if (!new URLSearchParams(window.location.search).has("user")) {
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
    }
    function changePage(e) {
        let user;
        if (new URLSearchParams(window.location.search).has("user")) {
            user = new URLSearchParams(window.location.search).get("user");
        } else {
            user = cookies.user.data[0].id;
        }
        if (e === 3) {
            Axios.get("/api/getMaxLevelCompagnon/" + user)
                    .then((response) => {
                        setCompagnonList(response.data);
                        setBody(e);
                    })
        } else if (e === 2) {
            Axios
                .get("/api/getTrainers/" + user)
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
        } else {
            setBody(e);
        }
    }
    return (
        <div className={"globalContainer"}>
            {compagnon &&
                <div className={"profilContainer"}>
                    <div class={"profilHeaderContainer"}>
                        <div className={"profilHeader"}>
                            <div style={{ backgroundColor: color, backgroundImage: `url("/Skins/Trainer${profil[0].skin}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                            </div>
                            {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                            <div className={"profilInfos"}>
                                <p>{profil[0].login}</p>
                                <p className={"levelProfil"}>Niveau {profil[0].level}</p>
                            </div>
                        </div>
                        {compagnon.length > 0 &&
                            <div className={"profilHeader"}>
                                <div className={"profilInfos"}>
                                    <p style={{ textAlign: "end" }}>{compagnon[0].pokemon}</p>
                                    <p style={{ textAlign: "end" }} className={"levelProfil"}>{compagnon[0].shiny === 1 ? "Shiny" : compagnon[0].negative === 1 ? "Négatif" : "Classique"}</p>
                                </div>
                                <div style={{ filter: compagnon[0].negative === 1 ? "invert(1)" : "invert(0)", backgroundColor: color, backgroundImage: `url("/Sprites/${compagnon[0].shiny === 1 ? "Shiny" : "Normal"}/${compagnon[0].number}.gif")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"compagnonPicture"}>
                                </div>
                                {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                            </div>
                         }
                    </div>
                    <div className={"textProgressProfil"}>
                        <p>EXP</p>
                        <p>{profil[0].xp}/{100 * ((profil[0].level + 1) * (profil[0].level + 2)) / 4}</p>
                    </div>
                    <div className={"progressBarProfilExternal"}>
                        <div style={{ width: +parseFloat(profil[0].xp / (100 * ((profil[0].level + 1) * (profil[0].level + 2)) / 4) * 100).toFixed(2) + "%" }} className={"progressBarProfilInternal"}>
                        </div>
                    </div>
                    <div className={"filterProfil"}>
                        <button className={body === 1 && "active"} onClick={() => changePage(1)}>Profil</button>
                        <button className={body === 2 && "active"} onClick={() => changePage(2)}>Skins</button>
                        <button className={body === 3 && "active"} onClick={() => changePage(3)}>Compagnons N.100</button>
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
                                                        <p className={"levelProfil"}>{profil.filter(item => (item.pokemon !== null)).length} / {maxPokedex}</p>
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
                            !new URLSearchParams(window.location.search).has("user") &&
                            <div class={"openSkinDiv"} onClick={addSkin}>
                                <p className={"openSkinText"}>{profil[0].level - skins.length}</p>
                            </div>
                        }
                        {body === 2 &&
                            <div className={"skinContainer"}>
                                {skins &&
                                    skins.map((val, key) => {
                                        return (                                            
                                            <div onClick={() => changeSkin(val.skins)} loading={"lazy"} style={{ backgroundColor: val.color, backgroundRepeat: "no-repeat", backgroundImage: `url("/Skins/Trainer${val.skins}.png")`, backgroundSize: "contain",backgroundPosition: "center"}} className={"profilPicture"}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {body === 3 &&
                            <div className={"skinContainer"}>
                                {compagnonList &&
                                    compagnonList.map((val, key) => {
                                        return (
                                            <div onClick={() => changeActiveCompagnon(val.number)} loading={"lazy"} style={{ filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
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
