import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import ProgressBarFight from '../components/progressBarFight.js';

function Fight() {
    //Cookies
    const [cookies, setCookie] = useCookies();
    //Safari
    const [onCatch, setOnCatch] = useState(false);
    const [maxLove, setMaxLove] = useState(0);
    const [currentLove, setCurrentLove] = useState(0);
    //Pokemon
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getSafari/" + cookies.user.data[0].id)
            .then(function (response) {
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
                                    setPokemon({ name: response.data[0].name, number: response.data[0].pokemon, tier: response.data[0].tier })
                                    if (response.data[0].tier == 1) {
                                        setMaxLove(50);
                                    } else if (response.data[0].tier == 2) {
                                        setMaxLove(100);
                                    } else if (response.data[0].tier == 3) {
                                        setMaxLove(150);
                                    } else {
                                        setMaxLove(250);
                                    }
                                }
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
                        })
                })
        }
    }
    function catchPokemon(e, f, ball) {
        if (inventory.find((item) => item.slug === ball).quantity - 1 >= 0) {
            Axios.post('/api/removeItem', {
                user: cookies.user.data[0].id,
                slug: ball
            })
                .then(function (response) {
                    Axios
                        .get("/api/getInventory/" + cookies.user.data[0].id)
                        .then(function (response) {
                            setInventory(response.data);
                            setCurrentLove(currentLove + e);
                            if (e == 0) {
                                document.getElementById("ball").style.background = "background: radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, red 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)";
                            } else if (e == 1) {
                                document.getElementById("ball").style.background = "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, #0089ff 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)";
                            } else if (e == 2) {
                                document.getElementById("ball").style.background = "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#000000 0px, #e3c805 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)";
                            } else if (e == 3) {
                                document.getElementById("ball").style.background = "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#ff00f7 0px, #300c51 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)";
                            }
                            setOnCatch(true);
                            var rate = (f + 1) - e;
                            const tryCatch = Math.floor(Math.random() * rate);
                            setTimeout(function () {
                                if (tryCatch == 0 || e == 3) {
                                    setTimeout(function () {
                                        document.getElementById("validCatchText").style.display = "block";
                                        Axios.post('/api/addPokemon', {
                                            user: cookies.user.data[0].id,
                                            pokemon: pokemon.number,
                                            shiny: shiny,
                                            negative: negative,
                                            date: moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')
                                        })
                                        setCurrentLove(0);
                                        Axios.delete('/api/deleteSafari/' + cookies.user.data[0].id)
                                        setTimeout(function () {
                                            setPokemon(null);
                                            setOnCatch(false);
                                        }, 2000);
                                    }, 300);
                                }
                                else {
                                    setOnCatch(false);
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
        const tierRoll =  Math.random() * 100;
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50);
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100);
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150);
        } else {
            var tier = 4;
            setMaxLove(250);
        }
        Axios.get("/api/getRandomPokemon/"+tier)
        .then(function (response) {
            setPokemon(response.data[0]);
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
    function getLegendaryPokemon() {
        setMaxLove(250)
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
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50)
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100)
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150)
        } else {
            var tier = 4;
            setMaxLove(250)
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
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50)
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100)
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150)
        } else {
            var tier = 4;
            setMaxLove(250)
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0])
                setShiny(0);
                setNegative(1);
            })
    }
    return (
        <div className={"fightContainer"}>
            {!pokemon &&
                <>
                    <div className={"honeyActionsContainer"}>
                    {inventory &&
                        inventory.filter(item => (item.slug === "honey" && item.quantity > 0) || (item.slug === "legendary" && item.quantity > 0) || (item.slug === "shiny" && item.quantity > 0) || (item.slug === "negative" && item.quantity > 0)).length < 1 ?
                        <div className={"emptyInventory"}>
                            <p className="pseudoProfil">Tu n'as pas de miel, récupère en sur les streams de Chromatyk</p>
                            <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>                        
                        </div>:
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
                <p className={"fightName"}>{pokemon.name}</p>
                <div style={{ backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                    <div className={"progressBarFightExternal"}>
                    <div style={{ width: +parseFloat(currentLove/maxLove*100).toFixed(2) + "%" }} className={"progressBarFightInternal"}>
                        <p>{currentLove + "/" + maxLove}</p>
                        <div class="heart">
                            <div style={{backgroundColor:"#rgb(115, 0, 9)"}} class="heartInt">
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ filter: negative === 1 && "invert(1)", backgroundSize: onCatch ? "0" : "contain", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)` }} className={"fightSpriteCard"}>
                    <div id={"ball"} style={{display:onCatch ? "block" : "none"}} class="pokeball"></div>  
                </div>
                </>
            }
            {pokemon &&
                    <div className={"fightActionsContainer"}>
                    {onCatch === false &&
                        currentLove < maxLove ?
                        <>
                            {inventory.filter(item => (item.slug === "exps" && item.quantity > 0) || (item.slug === "expm" && item.quantity > 0) || (item.slug === "expl" && item.quantity > 0)).length < 1 &&
                                <div style={{background:"none"}} className={"emptyInventory"}>
                                    <p className="pseudoProfil">Tu n'as pas de bonbons, récupère en sur les streams de Chromatyk <span style={{ fontSize: "10px" }}>Pense à sauvegarder en haut à droite</span></p>
                                    <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                </div>
                            }
                            {inventory.filter(item => item.slug === "exps" && item.quantity > 0).length > 0 &&
                                <div onClick={() => addLove(10, "exps")} className={"fightActions"}>
                                    < img src={"/exps.png"} />
                                    <p>Bonbon S</p>
                                    <p>x {inventory.find((item) => item.slug === "exps").quantity}</p>
                                </div>
                            }
                            {inventory.filter(item => item.slug === "expm" && item.quantity > 0).length > 0 &&
                                <div onClick={() => addLove(25, "expm")} className={"fightActions"}>
                                    < img src={"/expm.png"} />
                                    <p>Bonbon M</p>
                                    <p>x {inventory.find((item) => item.slug === "expm").quantity}</p>
                                </div>
                            }
                            {inventory.filter(item => item.slug === "expl" && item.quantity > 0).length > 0 &&
                                <div onClick={() => addLove(50, "expl")} className={"fightActions"}>
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
                                        <p className="pseudoProfil">Tu n'as pas de balls, récupère en sur les streams de Chromatyk <span style={{fontSize:"10px"}}>Pense à sauvegarder en haut à droite</span></p>
                                        <a className={"twitchLink"} href="https://twitch.tv/chromatyk" target="blank_">Twitch</a>
                                    </div>
                                }
                                {inventory.filter(item => item.slug === "ball" && item.quantity > 0).length > 0 &&
                                    <div onClick={() => catchPokemon(0, pokemon.tier,"ball")} className={"fightActions"}>
                                        < img src={"/ball.png"} />
                                        <p>Pokéball</p>
                                        <p>x {inventory.find((item) => item.slug === "ball").quantity}</p>
                                    </div>
                                }
                                {inventory.filter(item => item.slug === "great" && item.quantity > 0).length > 0 &&
                                    <div onClick={() => catchPokemon(1, pokemon.tier,"great")} className={"fightActions"}>
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
                                <p id={"validCatchText"} style={{display:"none"}}>Et Hop !<br />{pokemon.name} est attrapé !</p>
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
        </div>
    )
}

export default Fight
