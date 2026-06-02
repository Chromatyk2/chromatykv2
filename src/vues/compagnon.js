import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Fight from "../components/fight";
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
    const [haveCompagnon, setHaveCompagnon] = useState(null);
    const [chooseCompagnon, setChooseCompagnon] = useState(null);
    const [compagnon, setCompagnon] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [onLoad, setOnload] = useState(true);
    const [allCompagon, setAllcompagnon] = useState(null);
    //Combat
    const [onFight, setOnFight] = useState(false);


    useEffect(() => {
    const userId = cookies.user.data[0].id;

    Promise.all([
        Axios.get("/api/getPokedex/" + userId),
        Axios.get("/api/getCurrentCompagnon/" + userId),
        Axios.get("/api/getAllCompagnon/" + userId)
    ])
        .then(([pokedexRes, compagnonRes, allCompagnonRes]) => {
            setPokedex(pokedexRes.data);
            setFilteredPokedex(pokedexRes.data);
            setAllcompagnon(allCompagnonRes.data)

            if (compagnonRes.data.length < 1) {
                setHaveCompagnon(false);
                return;
            }

            setHaveCompagnon(true);
            setChooseCompagnon(false);
            setCompagnon(compagnonRes.data);

            return Axios.get("/api/getInventory/" + userId);
        })
        .then((inventoryRes) => {
            if (inventoryRes) {
                setInventory(inventoryRes.data);
            }
        })
        .catch(console.error)
        .finally(() => setOnload(false));
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
    function startFight() {
        setOnFight(true);
    }
    function changeCompagnon(e, f, g, h, i) {
        const currentLevel =
            allCompagon.find(
                (item) => item.number === e && item.shiny === g && item.negative === h
            )?.level ?? 1;
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
                    level: currentLevel,
                    xp: 0,
                    active: 1,
                    tier: i
                }).then(function (response) {
                    Axios.get('/api/getCurrentCompagnon/' + cookies.user.data[0].id)
                        .then(function (response) {
                            setHaveCompagnon(true)
                            setChooseCompagnon(false)
                            setCompagnon(response.data);
                            Axios
                                .get("/api/getInventory/" + cookies.user.data[0].id)
                                .then(function (response) {
                                    setInventory(response.data);
                                    setHaveCompagnon(true)
                                })
                        })
                })
            })
    }
    function levelupCompagnon(e) {
        if (inventory.find((item) => item.slug === e).quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: e
            })
                .then(function (response) {
                    Axios.post('/api/levelupCompagnon', {
                        id: compagnon[0].id
                    }).then(function (response) {
                        Axios.get('/api/getCurrentCompagnon/' + cookies.user.data[0].id)
                            .then(function (response) {
                                setHaveCompagnon(true)
                                setChooseCompagnon(false)
                                setCompagnon(response.data);
                                Axios
                                    .get("/api/getInventory/" + cookies.user.data[0].id)
                                    .then(function (response) {
                                        setInventory(response.data);
                                        setHaveCompagnon(true)
                                    })
                            })
                    })
            })
        }
    }
    function levelMaxCompagnon(e) {
        if (inventory.find((item) => item.slug === e).quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: e
            })
                .then(function (response) {
                    Axios.post('/api/levelMaxCompagnon', {
                        id: compagnon[0].id
                    }).then(function (response) {
                        Axios.get('/api/getCurrentCompagnon/' + cookies.user.data[0].id)
                            .then(function (response) {
                                setHaveCompagnon(true)
                                setChooseCompagnon(false)
                                setCompagnon(response.data);
                                Axios
                                    .get("/api/getInventory/" + cookies.user.data[0].id)
                                    .then(function (response) {
                                        setInventory(response.data);
                                        setHaveCompagnon(true)
                                    })
                            })
                    })
                })
        }
    }
    const rareCandy = inventory?.find(
        item => item.slug === "rarecandy"
    );
    const megaCandy = inventory?.find(
        item => item.slug === "megacandy"
    );
    const canShow =
        haveCompagnon &&
        compagnon &&
        compagnon.length > 0 &&
        compagnon[0].level < 100 &&
        !chooseCompagnon &&
        inventory &&
        inventory.length > 0 &&
        rareCandy;

    return (
        onFight === false ?
            (
                <div className={"globalContainerCenter"}>
                    <p>Compagnon</p>
                    <div style={{ backgroundImage: `url(/compagnonBack.png)`, overflow: "overlay" }} className={"fightContainer"}>
                        {onLoad === false &&
                            <>
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
                                        <div style={{ position: "absolute", top: "-100px", justifyContent: "center" }} className={"dexContainer"}>
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
                                                            <div onClick={() => changeCompagnon(val.pokemon, val.name, isShiny, isNegative, val.tier)} className={"dexCardCompagnon"}>
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
                                            <div style={{ top: "10px" }} onClick={chooseCompgnon} className={"fightActionsFlee"}>
                                                < img src={"/doll.png"} />
                                                <p>Changer</p>
                                    </div>
                                        <div style={{ top: "80px" }} onClick={startFight} className={"fightActionsFlee"}>
                                            < img src={"/exp.png"} />
                                            <p>XP</p>
                                        </div>
                                            <p className="fightName">{compagnon[0].pokemon}</p>
                                            <div className="tierFight">
                                                Nv.{compagnon[0].level}
                                            </div>
                                    <div className={`fightSpriteCard ${compagnon[0].negative === 1 ? "shadowPokemon" : ""}`}>
                                        <img
                                            src={`/Sprites/${compagnon[0].shiny === 1 ? "shiny" : "normal"}/${compagnon[0].number}.gif`}
                                            alt=""
                                            style={{
                                                filter: compagnon[0].negative === 1 ? "invert(1)" : "none"
                                            }}
                                        />
                                    </div>                                        </>
                                    )}
                                {canShow && (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                                            {rareCandy?.quantity < 1 && megaCandy?.quantity < 1 && (
                                                <div style={{ background: "none" }} className={"emptyInventory"}>
                                                    <p style={{ fontSize: "18px" }} className="pseudoProfil">Tu n'as pas de Super Bonbon, récupère en sur les streams de Chromatyk</p>
                                                    <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                                </div>
                                            )}
                                            {rareCandy?.quantity > 0 &&
                                                (
                                                    <div onClick={() => levelupCompagnon(inventory.find(item => item.slug === "rarecandy").slug)} style={{ background: "none" }} className="fightActionsContainer">
                                                        <div className="fightActions">
                                                            <img src="/rarecandy.png" />
                                                            <p>Super Bonbon</p>
                                                            <p>
                                                                x {inventory.find(item => item.slug === "rarecandy")?.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {megaCandy?.quantity > 0 &&
                                                (
                                                    <div onClick={() => levelMaxCompagnon(inventory.find(item => item.slug === "megacandy").slug)} style={{ filter: "hue-rotate(182deg)", background: "none" }} className="fightActionsContainer">
                                                        <div className="fightActions">
                                                            <img src="/megacandy.png" />
                                                            <p>Mega Bonbon</p>
                                                            <p>
                                                                x {inventory.find(item => item.slug === "megacandy")?.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                )}
                            </>
                        }
                    </div>
                </div>
            )
            :
            (
                <Fight compagnon={compagnon} setOnFight={setOnFight} />
            )
    )
}

export default Compagnon
