import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import moment from "moment";
import { useCookies } from 'react-cookie';

function Fight() {
    //Cookies
    const [cookies, setCookie] = useCookies();
    //Safari
    const [pokedex, setPokedex] = useState(false);
    const [onCatch, setOnCatch] = useState(false);
    const [maxLove, setMaxLove] = useState(0);
    const [currentLove, setCurrentLove] = useState(0);
    //Pokemon
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [profil, setProfil] = useState(null);
    const [ballStyle, setBallStyle] = useState(null);
    const [onLoad, setOnload] = useState(true);
    useEffect(() => {
        Axios
            .get("/api/getUser/" + cookies.user.data[0].id)
            .then(function (response) {
                setProfil(response.data);
                Axios
                    .get("/api/getPokedex/" + cookies.user.data[0].id)
                    .then(function (response) {
                        setPokedex(response.data)
                        Axios
                            .get("/api/getInventory/" + cookies.user.data[0].id)
                            .then(function (response) {
                                setInventory(response.data);
                                Axios
                                    .get("/api/getSafari/" + cookies.user.data[0].id)
                                    .then(function (response) {
                                        if (response.data.length > 0) {
                                            setCurrentLove(response.data[0].love)
                                            setShiny(response.data[0].shiny)
                                            setNegative(response.data[0].negative)
                                            setPokemon({ name: response.data[0].name, number: response.data[0].pokemon, tier: response.data[0].tier, gen: response.data[0].gen })
                                            if (response.data[0].tier == 1) {
                                                setMaxLove(125);
                                            } else if (response.data[0].tier == 2) {
                                                setMaxLove(375);
                                            } else if (response.data[0].tier == 3) {
                                                setMaxLove(650);
                                            } else {
                                                setMaxLove(1000);
                                            }
                                            setOnload(false);
                                        }
                                        setOnload(false);
                                    })
                            })
                    })

            })
    }, []);
    function fleeFight() {
        setOnCatch(false);
        setPokemon(null);
        setCurrentLove(0);
        Axios.delete('/api/deleteSafari/' + cookies.user.data[0].id)
    }
    function saveFight() {
        Axios.post('/api/addSafari', {
            user: cookies.user.data[0].id,
            pokemon: pokemon.number,
            love: currentLove,
            shiny: shiny,
            negative: negative,
            tier: pokemon.tier
        })
    }

    
    function addLove(e, candy) {
        if (inventory.find((item) => item.slug === candy).quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: candy
            })
                .then(function (response) {
                    Axios
                        .get("/api/getInventory/" + cookies.user.data[0].id)
                        .then(function (response) {
                            setInventory(response.data);
                            setCurrentLove(currentLove + e);
                            const love = currentLove + e;
                            Axios.post('/api/addSafari', {
                                user: cookies.user.data[0].id,
                                pokemon: pokemon.number,
                                love: love,
                                shiny: shiny,
                                negative: negative,
                                tier: pokemon.tier
                            })
                        })
                })
        }
    }
    function catchPokemon(e, f, g) {
        if (inventory.find((item) => item.slug === g).quantity - 1 >= 0) {
            const styles = {
                ball: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, red 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
                great: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, #0089ff 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
                ultra: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#000000 0px, #e3c805 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
                master: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#ff00f7 0px, #300c51 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)"
            };
            setBallStyle(styles[g]);
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: g
            })
                .then(function (response) {
                    Axios
                        .get("/api/getInventory/" + cookies.user.data[0].id)
                        .then(function (response) {
                            setInventory(response.data);
                            setOnCatch(true);
                            const catchRates = {
                                1: { 0: 0.50, 1: 0.75, 2: 0.95 },
                                2: { 0: 0.30, 1: 0.65, 2: 0.85 },
                                3: { 0: 0.20, 1: 0.50, 2: 0.75 },
                                4: { 0: 0.10, 1: 0.35, 2: 0.60 },
                            }
                            const rate = catchRates[f][e]
                            setTimeout(function () {
                                if (Math.random() < rate || e == 3) {
                                    setTimeout(function () {
                                        document.getElementById("validCatchText").style.display = "block";
                                        Axios.post('/api/addPokemon', {
                                            user: cookies.user.data[0].id,
                                            pokemon: pokemon.number,
                                            gen: pokemon.gen,
                                            shiny: shiny,
                                            negative: negative,
                                            date: moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')
                                        })
                                        setCurrentLove(0);
                                        Axios.delete('/api/deleteSafari/' + cookies.user.data[0].id)
                                        setTimeout(function () {
                                            let bonusXP = 0;
                                            if (shiny === 1) {
                                                bonusXP = 100;
                                            } else if (negative === 1) {
                                                bonusXP = 500;
                                            }                                         
                                            Axios.post('/api/updateXp', {
                                                user: cookies.user.data[0].id,
                                                xp: Math.floor(Math.random() * (pokemon.tier * 50 + 1)) + (pokemon.tier * 100) + bonusXP
                                            })
                                            .then(function (response) {
                                                setPokemon(null);
                                                setOnCatch(false);
                                            })
                                        }, 2000);
                                    }, 300);
                                }
                                else {
                                    const fleeRate = Math.floor((Math.random() * 10) + 1);
                                    if (fleeRate == 1) {
                                        document.getElementById("fleeFightText").style.display = "block";
                                        document.getElementById("ball").style.display = "none";
                                        setTimeout(function () {
                                            fleeFight();
                                        }, 2000);
                                    } else {
                                        setBallStyle("");
                                        setOnCatch(false);
                                    }
                                }
                            }, 5300);
                        })
                })
        }
    }
    function consomeHoney(e) {
        if (inventory.find((item) => item.slug === e).quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: e
            })
            .then(function (response) {
                Axios
                    .get("/api/getInventory/" + cookies.user.data[0].id)
                    .then(function (response) {
                        setInventory(response.data);
                        const expr = e;
                        if (expr == "honey") {
                            getRandomPokemon();
                        } else if (expr == "legendary") {
                            getLegendaryPokemon();
                        } else if (expr == "shiny") {
                            getShinyPokemon();
                        } else {
                            getNegativePokemon();
                        }
                    })
            })
        }
    }
    function getRandomPokemon() {
        Axios.get("/api/getPokedex/" + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
                const tierRoll = Math.random();
                if (tierRoll < 0.01) {
                    var tier = 4;
                    setMaxLove(1000);
                } else if (tierRoll < 0.11) {
                    var tier = 3;
                    setMaxLove(650);
                } else if (tierRoll < 0.41) {
                    var tier = 2;
                    setMaxLove(375);
                } else {
                    var tier = 1;
                    setMaxLove(125);
                }
                Axios.get("/api/getRandomPokemon/" + tier)
                    .then(function (response) {
                        setPokemon(response.data[0]);
                        const shiny = Math.floor((Math.random() * 4096) + 1);
                        const negative = Math.floor((Math.random() * 8192) + 1);
                        let isNegative;
                        let isShiny;
                        if (negative == 16) {
                            setShiny(0);
                            setNegative(1);
                            isNegative = 1;
                            isShiny = 0;
                        } else if (shiny == 16) {
                            setShiny(1);
                            setNegative(0);
                            isNegative = 0;
                            isShiny = 1;
                        } else {
                            setShiny(0);
                            setNegative(0);
                            isNegative = 0;
                            isShiny = 0;
                        }
                        Axios.post('/api/addSafari', {
                            user: cookies.user.data[0].id,
                            pokemon: response.data[0].number,
                            love: 0,
                            shiny: isShiny,
                            negative: isNegative,
                            tier: response.data[0].tier
                        })
                    })
            })
    }
    function getLegendaryPokemon() {
        setMaxLove(1000)
        Axios.get("/api/getRandomPokemon/4")
            .then(function (response) {
                setPokemon(response.data[0])
                const shiny = Math.floor((Math.random() * 4096) + 1);
                const negative = Math.floor((Math.random() * 8192) + 1);
                if (negative == 16) {
                    setShiny(0);
                    setNegative(1);
                } else if (shiny == 16) {
                    setShiny(1);
                    setNegative(0);
                } else {
                    setShiny(0);
                    setNegative(0);
                }
            })
    }
    function getShinyPokemon() {
        const tierRoll = Math.random() * 100;
        if (tierRoll < 0.01) {
            var tier = 4;
            setMaxLove(1000)
        } else if (tierRoll < 0.11) {
            var tier = 3;
            setMaxLove(650)
        } else if (tierRoll < 0.41) {
            var tier = 2;
            setMaxLove(375)
        } else {
            var tier = 1;
            setMaxLove(125)
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0]);
                setShiny(1);
                setNegative(0);
            })
    }
    function getNegativePokemon() {
        const tierRoll = Math.random() * 100;
        if (tierRoll < 0.01) {
            var tier = 4;
            setMaxLove(1000)
        } else if (tierRoll < 0.11) {
            var tier = 3;
            setMaxLove(650)
        } else if (tierRoll < 0.41) {
            var tier = 2;
            setMaxLove(375)
        } else {
            var tier = 1;
            setMaxLove(125)
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0])
                setShiny(0);
                setNegative(1);
            })
    }
    return (
        <div className={"globalContainerCenter"}>
        <p>Safari</p>
            <div style={{ backgroundImage: `url(/safariBack.png)`}}  className={"fightContainer"}>
                {onLoad === false &&
                    <>
                        {!pokemon &&
                            <>
                                <div className={"honeyActionsContainer"}>
                                    {inventory &&
                                        inventory.filter(item => (item.slug === "honey" && item.quantity > 0) || (item.slug === "legendary" && item.quantity > 0) || (item.slug === "shiny" && item.quantity > 0) || (item.slug === "negative" && item.quantity > 0)).length < 1 ?
                                        <div className={"emptyInventory"}>
                                            <p className="pseudoProfil">Tu n'as pas de miel, récupère en sur les streams de Chromatyk</p>
                                            <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                        </div> :
                                        inventory &&
                                        inventory.filter(item => item.slug === "honey" || item.slug === "legendary" || item.slug === "shiny" || item.slug === "negative").map((val, key) => {
                                            return (
                                                val.quantity > 0 && (
                                                    <div onClick={() => consomeHoney(val.slug)} className={"honeyActions"}>
                                                        <img style={{ filter: val.slug == "honey" ? "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" : val.slug == "shiny" ? "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)" : val.slug == "legendary" ? "drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" : val.slug == "negative" && "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)" }} src={"/" + val.slug == "honey" || val.slug == "shiny" || val.slug == "legendary" || val.slug == "negative" ? "honey.png" : val.slug + ".png"} />
                                                        <p>{val.item}</p>
                                                        <p>x {val.quantity}</p>
                                                    </div>

                                                )
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        {pokemon &&
                            onCatch === false &&
                            <>
                                <div id={"fightActionsSave"} style={{ top: "10px" }} onClick={saveFight} className={"fightActionsFlee"}>
                                    < img src={"/disc.png"} />
                                    <p>Save</p>
                                </div>
                                <div style={{ top: "85px" }} onClick={fleeFight} className={"fightActionsFlee"}>
                                    < img src={"/boot.png"} />
                                    <p>Partir</p>
                                </div>
                            </>
                        }
                        {pokemon &&
                            <>
                                <p className={"fightName"}>
                                    {
                                        shiny === 1 ?
                                            pokedex.filter(item => item.pokemon === pokemon.number && item.shiny === shiny).length > 0 && <img style={{ width: "30px" }} src={"/ball.png"} alt={"Catched"} />
                                            :
                                            negative === 1 ?
                                                pokedex.filter(item => item.pokemon === pokemon.number && item.negative === negative).length > 0 && <img style={{ width: "30px" }} src={"/ball.png"} alt={"Catched"} />
                                                :
                                                pokedex.filter(item => item.pokemon === pokemon.number).length > 0 && <img style={{ width: "30px" }} src={"/ball.png"} alt={"Catched"} />
                                    }
                                    {(shiny === 1 || negative === 1) && <img style={{ width: "30px", filter: negative === 1 ? "invert(1)" : "invert(0)" }} src={"/star.png"} alt={"Shiny"} />} {pokemon.name}</p>
                                <div style={{ backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        <div className="loveBarContainer">

                            <div
                                className="loveBar"
                                style={{
                                    width: `${(currentLove / maxLove) * 100}%`,
                                    maxWidth:'100%'
                                }}
                            />

                            <span className="loveText">
                                {currentLove}/{maxLove}
                            </span>

                            <div className="heart">
                                <div
                                    className="heartInt"
                                    style={{
                                        background:
                                            (currentLove / maxLove) * 100 < 30
                                                ? "#ff5c8a"
                                                : (currentLove / maxLove) * 100 < 70
                                                    ? "#ff2d95"
                                                    : "#ff1493"
                                    }}
                                />
                            </div>

                        </div>
                        <div style={{ visibility: onCatch ? "hidden" : "visible" }} className={`fightSpriteCard ${negative === 1 ? "shadowPokemon" : ""}`}>
                            {negative === 1 && (
                                <>
                                    <div className="shadowAura" />
                                    <div className="redCloudsBack">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </>
                            )}
                            <img src={`/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif`} alt="" />

                        </div>
                        <div id={"ball"} style={{ display: onCatch ? "block" : "none", background: ballStyle }} class="pokeball"></div>
                            </>
                        }
                        {pokemon &&
                            <div className={"fightActionsContainer"}>
                                {onCatch === false &&
                                    currentLove < maxLove ?
                                    <>
                                        {inventory.filter(item => (item.slug === "exps" && item.quantity > 0) || (item.slug === "expm" && item.quantity > 0) || (item.slug === "expl" && item.quantity > 0)).length < 1 &&
                                            <div style={{ background: "none" }} className={"emptyInventory"}>
                                                <p style={{ fontSize: "18px" }} className="pseudoProfil">Tu n'as pas de bonbons, récupère en sur les streams de Chromatyk <span style={{ fontSize: "10px" }}>Pense à sauvegarder en haut à droite</span></p>
                                                <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                            </div>
                                        }
                                        {inventory.filter(item => item.slug === "exps" && item.quantity > 0).length > 0 &&
                                            <div onClick={() => addLove(25, "exps")} className={"fightActions"}>
                                                < img src={"/exps.png"} />
                                                <p>Bonbon S</p>
                                                <p>x {inventory.find((item) => item.slug === "exps").quantity}</p>
                                            </div>
                                        }
                                        {inventory.filter(item => item.slug === "expm" && item.quantity > 0).length > 0 &&
                                            <div onClick={() => addLove(75, "expm")} className={"fightActions"}>
                                                < img src={"/expm.png"} />
                                                <p>Bonbon M</p>
                                                <p>x {inventory.find((item) => item.slug === "expm").quantity}</p>
                                            </div>
                                        }
                                        {inventory.filter(item => item.slug === "expl" && item.quantity > 0).length > 0 &&
                                            <div onClick={() => addLove(200, "expl")} className={"fightActions"}>
                                                < img src={"/expl.png"} />
                                                <p>Bonbon L</p>
                                                <p>x {inventory.find((item) => item.slug === "expl").quantity}</p>
                                            </div>
                                        }
                                    </>
                                    :
                                    onCatch === false ?
                                        <>
                                            {inventory.filter(item => (item.slug === "ball" && item.quantity > 0) || (item.slug === "great" && item.quantity > 0) || (item.slug === "ultra" && item.quantity > 0) || (item.slug === "master" && item.quantity > 0)).length < 1 &&
                                                <div style={{ background: "none" }} className={"emptyInventory"}>
                                                    <p style={{ fontSize: "18px" }} className="pseudoProfil">Tu n'as pas de balls, récupère en sur les streams de Chromatyk <span style={{ fontSize: "10px" }}>Pense à sauvegarder en haut à droite</span></p>
                                                    <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                                </div>
                                            }
                                            {inventory.filter(item => item.slug === "ball" && item.quantity > 0).length > 0 &&
                                                <div onClick={() => catchPokemon(0, pokemon.tier, "ball")} className={"fightActions"}>
                                                    < img src={"/ball.png"} />
                                                    <p>Pokéball</p>
                                                    <p>x {inventory.find((item) => item.slug === "ball").quantity}</p>
                                                </div>
                                            }
                                            {inventory.filter(item => item.slug === "great" && item.quantity > 0).length > 0 &&
                                                <div onClick={() => catchPokemon(1, pokemon.tier, "great")} className={"fightActions"}>
                                                    < img src={"/great.png"} />
                                                    <p>Super Ball</p>
                                                    <p>x {inventory.find((item) => item.slug === "great").quantity}</p>
                                                </div>
                                            }
                                            {inventory.filter(item => item.slug === "ultra" && item.quantity > 0).length > 0 &&
                                                <div onClick={() => catchPokemon(2, pokemon.tier, "ultra")} className={"fightActions"}>
                                                    < img src={"/ultra.png"} />
                                                    <p>Hyper Ball</p>
                                                    <p>x {inventory.find((item) => item.slug === "ultra").quantity}</p>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            <p id={"validCatchText"} style={{ display: "none" }}>Et Hop !<br />{pokemon.name} est attrapé !</p>
                                            <p id={"fleeFightText"} style={{ display: "none" }}>Oh non !<br />{pokemon.name} s'est enfui !</p>
                                        </>
                                }
                                {onCatch === false &&
                                    inventory.filter(item => item.slug === "master" && item.quantity > 0).length > 0 &&
                                    <div onClick={() => catchPokemon(3, pokemon.tier, "master")} className={"fightActions"}>
                                        < img src={"/master.png"} />
                                        <p>Master Ball</p>
                                        <p>x {inventory.find((item) => item.slug === "master").quantity}</p>
                                    </div>
                                }
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Fight
