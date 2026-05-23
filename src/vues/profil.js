import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { getColorSync, getPaletteSync } from 'colorthief';
import moment from "moment";




function Profil() {
    const [cookies, setCookie] = useCookies();
    const [profil, setProfil] = useState(null);
    const [maxPokedex, setMaxPokedex] = useState(1198);
    const [images, setImages] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
    const [imagesShiny, setImagesShiny] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]);
    const [index, setIndex] = useState(null);
    const [body, setBody] = useState(1);
    const [color, setColor] = useState(1);
    const [colorList, setColorList] = useState(1);
    const [colorShiny, setColorShiny] = useState(1);
    const [skins, setSkins] = useState([]);
    const [loadSkin, setLoadSkin] = useState(false);
    const [compagnon, setCompagnon] = useState(null);
    const [expedition, setExpedition] = useState(null);
    const [allExpedition, setAllExpedition] = useState(null);
    const [compagnonList, setCompagnonList] = useState(null);
    const [progresseExpedition, setProgressExpedition] = useState(null);
    const [searchParams] = useSearchParams();
    const [remainingTime, setRemainingTime] = useState("");
    const param = searchParams.get("user");
    const [finished, setFinished] = useState(false);
    const [validatedExpedition, setValidatedExpedition] = useState(false);
    const [fragementToWin, setFragementToWin] = useState(null);
    useEffect(() => {
        initPage();
    }, [param]);
    useEffect(() => {

        if (!expedition) return;

        const interval = setInterval(() => {

            const startDate = new Date(expedition.date);
            const endDate = new Date(expedition.endDate);

            const now = new Date();

            const totalDuration = endDate - startDate;
            const elapsed = now - startDate;

            let percent = (elapsed / totalDuration) * 100;

            // limite 0 → 100
            percent = Math.max(0, Math.min(100, percent));

            setProgressExpedition(percent);

            // temps restant
            const remaining = endDate - now;

            if (remaining <= 0) {
                setFinished(true);
                setRemainingTime("");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(remaining / 1000 / 60 / 60);
            const minutes = Math.floor((remaining / 1000 / 60) % 60);
            const seconds = Math.floor((remaining / 1000) % 60);

            setRemainingTime(
                `${hours}h ${minutes}m ${seconds}s`
            );

        }, 1000);

        return () => clearInterval(interval);

    }, [expedition]);
    function initPage() {
        let user;
        if (new URLSearchParams(window.location.search).has("user")) {
            user = new URLSearchParams(window.location.search).get("user");
        } else {
            user = cookies.user.data[0].id;
        }

        Axios
            .get("/api/getTrainers/" + user)
            .then(async (response) => {
                setSkins(response.data);
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
                                        const palette = getPaletteSync(img, { colorCount: 8 });
                                        setColor(palette[Math.floor(Math.random() * palette.length)].hex());
                                    };
                                    Axios
                                        .get("/api/getActiveCompagnon/" + user + "/" + response.data[0].compagnon)
                                        .then(function (response) {
                                            setCompagnon(response.data);
                                        })
                                })
                        })
                    })
            });
    }
    function changeSkin(e,f) {
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
                            setColor(f);
                        })
                })
        }
    }
    function changeActiveCompagnon(e,f) {
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
                            setColor(f);
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
        if (e === 4) {
            Axios.get("/api/getMaxLevelCompagnon/" + user)
                .then((response) => {
                    setCompagnonList(response.data);
                    Axios.get("/api/getAllExpedition/" + user)
                        .then((response) => {
                            setExpedition(response.data.find((item) => item.active === 1))
                            setAllExpedition(response.data);
                            if (response.data.some((item) => item.active === 1)) {
                                let progress = 0;
                                const startDate = new Date(response.data.find((item) => item.active === 1).date);
                                const endDate = new Date(response.data.find((item) => item.active === 1).endDate.getTime() + 4 * 60 * 60 * 1000);
                                const now = new Date();
                                const totalDuration = endDate - startDate;
                                const elapsed = now - startDate;
                                progress = (elapsed / totalDuration) * 100;
                                progress = Math.max(0, Math.min(100, progress));
                                setProgressExpedition(progress);
                            }
                            setBody(e);
                        })
                })
        }else if (e === 3) {
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

                                const palette = getPaletteSync(img, { colorCount: 8 });
                                const color = palette[Math.floor(Math.random() * palette.length)].hex();
                                setColorList(color);
                                const colorList = color;
                                newSkins.push({
                                    skins: val.skin,
                                    color: colorList
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
    function runExpedition(e,f, negative, shiny) {
        if (!new URLSearchParams(window.location.search).has("user")) {
            let endDate = 0;
            if (negative === 1) {
                endDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss').getTime() + (3 + f) * 60 * 60 * 1000);

            } else if (shiny === 1) {
                endDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss').getTime() + (2 + f) * 60 * 60 * 1000);

            } else {
                endDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss').getTime() + (1 + f) * 60 * 60 * 1000);
            }
            Axios.post('/api/newExpedition', {
                user: cookies.user.data[0].id,
                number: e,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                tier: f,
                endDate:endDate
            })
            .then(function (response) {
                let user;
                if (new URLSearchParams(window.location.search).has("user")) {
                    user = new URLSearchParams(window.location.search).get("user");
                } else {
                    user = cookies.user.data[0].id;
                }
                Axios.get("/api/getAllExpedition/" + user)
                    .then((response) => {
                        setExpedition(response.data.find((item) => item.active === 1));
                        setAllExpedition(response.data);
                        if (response.data.some((item) => item.active === 1)) {
                            let progress = 0;
                            const startDate = new Date(response.data.find((item) => item.active === 1).date);
                            const now = new Date();
                            const totalDuration = endDate - startDate;
                            const elapsed = now - startDate;
                            progress = (elapsed / totalDuration) * 100;
                            progress = Math.max(0, Math.min(100, progress));
                            setProgressExpedition(progress);
                        }
                        setBody(4);
                    })
            })
        }
    }
    function recoverExpedition(id, shiny, negative, tier, number) {
        if (!new URLSearchParams(window.location.search).has("user")) {
            if (expedition.active === 1) {
                Axios.post('/api/closeExpedition/' + number)
                    .then(function (response) {
                        let fragmentToWin = 0;
                        if (negative === 1) {
                            const min = 4 + tier;
                            const max = 6 + tier;
                            fragmentToWin =
                                Math.floor(Math.random() * (max - min + 1)) + min;

                        } else if (shiny === 1) {
                            const min = 3;
                            const max = 4 + tier;
                            fragmentToWin =
                                Math.floor(Math.random() * (max - min + 1)) + min;

                        } else {
                            const min = 1;
                            const max = 2 + tier;
                            fragmentToWin =
                                Math.floor(Math.random() * (max - min + 1)) + min;
                        }
                        Axios.post('/api/addCandy', {
                            user: cookies.user.data[0].id,
                            item: "Fragement de Pack",
                            slug: "fragement",
                            quantity: fragmentToWin
                        }).then(function (response) {
                            setFragementToWin(fragmentToWin)
                            setValidatedExpedition(true);
                            setTimeout(function () {
                                let user;
                                if (new URLSearchParams(window.location.search).has("user")) {
                                    user = new URLSearchParams(window.location.search).get("user");
                                } else {
                                    user = cookies.user.data[0].id;
                                }
                                Axios.get("/api/getAllExpedition/" + user)
                                    .then((response) => {
                                        setExpedition(response.data.find((item) => item.active === 1));
                                        setAllExpedition(response.data);
                                    })
                            }, 2000);
                        })
                    })
            }
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
                        <button style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" }} className={body === 2 && "active"} onClick={() => changePage(2)}>Skins {skins && profil[0].level - skins.length > 0 && <p style={{ margin: 0, marginLeft: "5px", fontSize: "15px", width: "1rem", height: "1rem" }} className={"rank"}>{skins && profil[0].level - skins.length}</p>}</button>
                        <button className={body === 3 && "active"} onClick={() => changePage(3)}>Compagnons N.100</button>
                        {<button className={body === 4 && "active"} onClick={() => changePage(4)}>Expédition</button>}
                    </div>         
                    <div className={"profilBody"}>
                        {body === 1 &&
                            <>
                            <p style={{alignItems:"center", display:"flex", gap:"15px", width: "100%", textAlign: "left", fontSize: "15px" }}>Progression <Link class="showPokedex leaderboardHeaderContainerLink" to={"/pokedex?user=" + profil[0].user}>Voir</Link></p>
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
                                            <div onClick={() => changeSkin(val.skins, val.color)} loading={"lazy"} style={{ backgroundColor: val.color, backgroundRepeat: "no-repeat", backgroundImage: `url("/Skins/Trainer${val.skins}.png")`, backgroundSize: "contain",backgroundPosition: "center"}} className={"profilPicture"}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {(body === 3) &&
                            <div className={"skinContainer"}>
                                {compagnonList &&
                                    compagnonList.map((val, key) => {
                                        return (
                                            <div onClick={() => changeActiveCompagnon(val.number, val.color)} loading={"lazy"} style={{ filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {body === 4 &&
                            <div style={{ width: "100%", justifyContent:"center" }} className={"skinContainer"}>
                                <>
                                    {expedition &&
                                        <div style={{backgroundImage: `url(/expeditionBack.jpg)`}} className={"fightContainer"}>
                                            <p>{expedition.pokemon}</p>
                                            <div loading={"lazy"} style={{ width: "250px", height: "250px", filter: expedition.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundImage: `url("/Sprites/${expedition.shiny === 1 ? "Shiny" : "Normal"}/${expedition.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }}></div>
                                            <div style={{ width: "300px"}} className={"progressBarProfilExternal"}>
                                                <div style={{ width: +progresseExpedition + "%" }} className={"progressBarProfilInternal"}>
                                                </div>
                                            </div>
                                            {!finished ? (

                                                <p>{remainingTime}</p>

                                            ) : !validatedExpedition ? (

                                                !new URLSearchParams(window.location.search).has("user") && (
                                                    <button
                                                        className={"validExpeditionButton"}
                                                        onClick={() => {
                                                            recoverExpedition(
                                                                expedition.id,
                                                                expedition.shiny,
                                                                expedition.negative,
                                                                expedition.tier,
                                                                expedition.number
                                                            );
                                                        }}
                                                    >
                                                        Récupérer
                                                    </button>
                                                )

                                            ) : (

                                                <p>
                                                    Le compagnon a trouvé{" "}
                                                    <span style={{ color: "#ffc312" }}>
                                                        {fragementToWin}
                                                    </span>{" "}
                                                    fragment !
                                                </p>

                                            )}
                                        </div>
                                    }
                                    {!new URLSearchParams(window.location.search).has("user") &&
                                        !expedition &&
                                        compagnonList &&
                                        compagnonList
                                            .filter(
                                                val =>
                                                    !allExpedition?.some(
                                                        expedition =>
                                                            expedition.number === val.number
                                                    )
                                            )
                                        .map((val, key) => {
                                            return (
                                                <div onClick={() => runExpedition(val.number, val.tier, val.negative, val.shiny)} loading={"lazy"} style={{ filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundRepeat: "no-repeat", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Profil;
