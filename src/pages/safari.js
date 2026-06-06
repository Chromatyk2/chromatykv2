import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import ShadowSmokeFront from "../components/shadowSmokeFront";
import ShadowSmokeBack from "../components/shadowSmokeBack";
import { useAuth } from "../context/AuthContext";

function Fight() {
    //Cookies
    const { user, loading } = useAuth();
    const pokemonContainerRef = useRef(null);
    //Safari
    const [pokedex, setPokedex] = useState(false);
    const [onCatch, setOnCatch] = useState(false);
    const [maxLove, setMaxLove] = useState(0);
    const [currentLove, setCurrentLove] = useState(0);
    const [catchResult, setCatchResult] = useState(null);
    //Pokemon
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [profil, setProfil] = useState(null);
    const [ballStyle, setBallStyle] = useState(null);
    const [onLoad, setOnload] = useState(true);
    useEffect(() => {
        loadSafari();
    }, []);
    async function loadSafari() {
        try {

            const response =
                await Axios.get(
                    "/api/safari"
                );
            setProfil(
                response.data.profile
            );
            setPokedex(
                response.data.pokedex
            );
            setInventory(
                response.data.inventory
            );
            if (
                response.data.safari
            ) {

                const safari =
                    response.data.safari;

                setCurrentLove(
                    safari.love
                );

                setShiny(
                    safari.shiny
                );

                setNegative(
                    safari.negative
                );

                setPokemon({
                    name:
                        safari.name,
                    number:
                        safari.pokemon,
                    tier:
                        safari.tier,
                    gen:
                        safari.gen
                });

                switch (
                safari.tier
                ) {
                    case 1:
                        setMaxLove(
                            125
                        );
                        break;
                    case 2:
                        setMaxLove(
                            250
                        );
                        break;
                    case 3:
                        setMaxLove(
                            500
                        );
                        break;
                    default:
                        setMaxLove(
                            1000
                        );
                }
            }
        } catch (err) {
            console.error(
                err
            );
        } finally {
            setOnload(
                false
            );
        }
    }
    async function consumeHoney(
        honey
    ) {
        const response =
            await Axios.post(
                "/api/safari/useHoney",
                {
                    honey
                }
            );
        setPokemon(
            response.data.pokemon
        );
        setShiny(
            response.data.shiny
        );
        setNegative(
            response.data.negative
        );
        setMaxLove(
            response.data.maxLove
        );
    }
    async function addLove(
        candy
    ) {
        try {
            const response =
                await Axios.post(
                    "/api/safari/addLove",
                    {
                        candy
                    }
                );
            setCurrentLove(
                response.data.love
            );
            loadSafari();
        } catch (err) {
            console.error(err);
        }
    }

    
    
    async function catchPokemon(
        ball
    ) {
        const styles = {
            ball: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, red 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
            great: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(red 0px, #0089ff 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
            ultra: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#000000 0px, #e3c805 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)",
            master: "radial-gradient(rgb(255, 255, 255) 16px, rgb(0, 0, 0) 17px, rgb(0, 0, 0) 18px, rgb(255, 255, 255) 19px, rgb(255, 255, 255) 24px, rgb(0, 0, 0) 25px, rgb(0, 0, 0) 32px, rgba(0, 0, 0, 0) 33px), linear-gradient(#ff00f7 0px, #300c51 80px, rgb(0, 0, 0) 81px, rgb(0, 0, 0) 96px, rgb(255, 255, 255) 97px, rgb(255, 255, 255) 100%)"
        };
        setBallStyle(styles[ball]);
        setOnCatch(
            true
        );
        const response =
            await Axios.post(
                "/api/safari/catch",
                {
                    ball
                }
            );
        if (
            response.data.success
        ) {
            setTimeout(() => {
                setCatchResult(
                    "caught"
                );
                setTimeout(() => {
                    setPokemon(
                        null
                    );
                    setCurrentLove(
                        0
                    );
                    setShiny(
                        0
                    );
                    setNegative(
                        0
                    );
                    setOnCatch(
                        false
                    );
                    setCatchResult(
                        null
                    );
                    loadSafari();
                }, 1000);
            }, 5750);
        } else {
            setTimeout(() => {
                if (
                    response.data.flee
                ) {
                    setCatchResult(
                        "fled"
                    );
                    setTimeout(() => {
                        setPokemon(
                            null
                        );
                        setCurrentLove(
                            0
                        );
                        setShiny(
                            0
                        );
                        setNegative(
                            0
                        );
                        setOnCatch(
                            false
                        );
                        setCatchResult(
                            null
                        );
                        loadSafari();
                    }, 1000);
                } else {
                    setCatchResult(
                        "failed"
                    );
                    setOnCatch(
                        false
                    );
                }
            }, 4500);
        }
    }
    async function fleeFight() {
        try {
            await Axios.delete(
                "/api/safari/flee"
            );
            setOnCatch(
                false
            );
            setPokemon(
                null
            );
            setCurrentLove(
                0
            );
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={"globalContainerCenter"}>
            <h2 class="wood-sign">Parc Safari</h2>
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
                                                    <div onClick={() => consumeHoney(val.slug)} className={"honeyActions"}>
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
                                <div style={{ top: "10px" }} onClick={fleeFight} className={"fightActionsFlee"}>
                                    < img src={"/boot.png"} />
                                    <p>Partir</p>
                                </div>
                            </>
                        }
                        {pokemon &&
                            <>
                                <p className={"fightName"}>
                                {
                                    pokedex.some(item => item.pokemon === pokemon.number && item.shiny === shiny && item.negative === negative) &&
                                    (
                                        <img style={{ width: "30px" }} src="/ball.png" alt="Catched"/>
                                    )
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
                                <div ref={pokemonContainerRef} style={{ visibility: onCatch ? "hidden" : "visible" }} className={`fightSpriteCard`}>
                                    {negative === 1 && <ShadowSmokeBack targetRef={pokemonContainerRef} />}
                                    {negative === 1 && <ShadowSmokeFront targetRef={pokemonContainerRef} />}
                                    <img className={negative === 1 ? " shadowPokemon" : ""}
                                        src={`/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif`}
                                        alt=""
                                    />
                                </div>
                        <div id={"ball"} style={{ display: onCatch ? "block" : "none", background: ballStyle }} className="pokeball"></div>
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
                                            <div onClick={() => addLove("exps")} className={"fightActions"}>
                                                < img src={"/exps.png"} />
                                                <p>Bonbon S</p>
                                                <p>x {inventory.find((item) => item.slug === "exps").quantity}</p>
                                            </div>
                                        }
                                        {inventory.filter(item => item.slug === "expm" && item.quantity > 0).length > 0 &&
                                            <div onClick={() => addLove("expm")} className={"fightActions"}>
                                                < img src={"/expm.png"} />
                                                <p>Bonbon M</p>
                                                <p>x {inventory.find((item) => item.slug === "expm").quantity}</p>
                                            </div>
                                        }
                                        {inventory.filter(item => item.slug === "expl" && item.quantity > 0).length > 0 &&
                                            <div onClick={() => addLove("expl")} className={"fightActions"}>
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
                                                <div onClick={() => catchPokemon("ball")} className={"fightActions"}>
                                                    < img src={"/ball.png"} />
                                                    <p>Pokéball</p>
                                                    <p>x {inventory.find((item) => item.slug === "ball").quantity}</p>
                                                </div>
                                            }
                                            {inventory.filter(item => item.slug === "great" && item.quantity > 0).length > 0 &&
                                                <div onClick={() => catchPokemon("great")} className={"fightActions"}>
                                                    < img src={"/great.png"} />
                                                    <p>Super Ball</p>
                                                    <p>x {inventory.find((item) => item.slug === "great").quantity}</p>
                                                </div>
                                            }
                                            {inventory.filter(item => item.slug === "ultra" && item.quantity > 0).length > 0 &&
                                                <div onClick={() => catchPokemon("ultra")} className={"fightActions"}>
                                                    < img src={"/ultra.png"} />
                                                    <p>Hyper Ball</p>
                                                    <p>x {inventory.find((item) => item.slug === "ultra").quantity}</p>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                        {catchResult === "caught" && (<p>Et Hop !<br />{pokemon.name}est attrapé !</p>)}
                                        {catchResult === "fled" && (<p>Oh non !<br />{pokemon.name} s'est enfui !</p>)}
                                        </>
                                }
                                {onCatch === false &&
                                    inventory.filter(item => item.slug === "master" && item.quantity > 0).length > 0 &&
                                    <div onClick={() => catchPokemon("master")} className={"fightActions"}>
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
