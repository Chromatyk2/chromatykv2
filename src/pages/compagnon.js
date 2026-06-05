import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import '../App.css'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Fight from "../components/fight";
import ShadowSmokeFront from "../components/shadowSmokeFront";
import ShadowSmokeBack from "../components/shadowSmokeBack";
import { useAuth } from "../context/AuthContext";
import PokedexSelector from "../components/compagnon/PokedexSelector";
function Compagnon() {
    //Cookies
    const { user, loading } = useAuth();
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
    const pokemonContainerRef = useRef(null);
    function chooseCompgnon() {
        setChooseCompagnon(true)
    }
    function startFight() {
        setOnFight(true);
    }

    useEffect(() => {
        loadCompanion();
    }, [onFight]);

    async function loadCompanion() {
        try {
            const response =
                await Axios.get(
                    "/api/compagnon"
                );
            setPokedex(
                response.data.pokedex
            );
            setFilteredPokedex(
                response.data.pokedex
            );
            setAllcompagnon(
                response.data.allCompanions
            );
            setInventory(
                response.data.inventory
            );
            if (
                response.data.activeCompanion.length < 1
            ) {
                setHaveCompagnon(
                    false
                );
                return;
            }
            setHaveCompagnon(
                true
            );
            setChooseCompagnon(
                false
            );
            setCompagnon(
                response.data.activeCompanion
            );
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
    async function changeCompagnon(
        pokemon
    ) {
        try {
            const response =
                await Axios.post(
                    "/api/compagnon/change",
                    {
                        pokemon:
                            pokemon.pokemon,
                        shiny:
                            pokemon.shiny,
                        negative:
                            pokemon.negative
                    }
                );
            setCompagnon([
                response.data
            ]);
            setHaveCompagnon(
                true
            );
            setChooseCompagnon(
                false
            );
        } catch (err) {
            console.error(
                err
            );
        }
    }

    async function consumeCandy(
        candy
    ) {
        try {
            const response =
                await Axios.post(
                    "/api/compagnon/useCandy",
                    {
                        candy
                    }
                );
            setCompagnon([
                response.data.companion
            ]);
            loadCompanion();
        } catch (err) {
            console.error(err);
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
                    <h2 class="wood-sign">Cloture du Compagnon</h2>
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
                                        <div style={{ position: "absolute", top: "20px", justifyContent: "space-evenly" }} className={"dexContainer"}>
                                            <div className={"genFilter"}>
                                                <button className={isShiny === 0 && isNegative === 0 && "active"} onClick={() => filterForm(0)}>Normal</button>
                                                <button className={isShiny === 1 && "active"} onClick={() => filterForm("Shiny")}>Shiny</button>
                                                <button className={isNegative === 1 && "active"} onClick={() => filterForm(1)}>Obscur</button>
                                            </div>
                                            <div className={"genFilter"}>
                                                <button className={gen === 0 && "active"} onClick={() => filterGen(0)} value={0}>Toutes</button>
                                                {genList.map((val, key) => {
                                                    return (
                                                        <button className={gen === val && "active"} onClick={() => filterGen(val)} value={val}>Gen {val}</button>
                                                    )
                                                })}

                                            </div>
                                            <PokedexSelector
                                                pokedex={
                                                    filteredPokedex.filter(
                                                        item =>
                                                            item.shiny === isShiny &&
                                                            item.negative === isNegative
                                                    )
                                                }
                                                companions={
                                                    allCompagon || []
                                                }
                                                onSelect={
                                                    changeCompagnon
                                                }
                                            />
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
                                            <div className={"wood-sign"} style={{padding:0,minWidth:"200px",position:"absolute",top:"10px"}}>
                                                <p style={{ margin: "5px" }} className="fightName">{compagnon[0].pokemon}</p>
                                             <div style={{margin:"5px"}} className="tierFight">
                                                    Nv.{compagnon[0].level}
                                                </div>
                                            </div>
                                            <div ref={pokemonContainerRef} className={`fightSpriteCard`}>
                                                {compagnon[0].negative === 1 && <ShadowSmokeBack targetRef={pokemonContainerRef} />}
                                                {compagnon[0].negative === 1 && <ShadowSmokeFront targetRef={pokemonContainerRef} />}
                                                <img className={compagnon[0].negative === 1 ? " shadowPokemon" : ""}
                                                src={`/Sprites/${compagnon[0].shiny === 1 ? "shiny" : "normal"}/${compagnon[0].number}.gif`}
                                                    alt=""
                                            />
                                            </div>
                                        </>
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
                                            <div onClick={() => consumeCandy("rarecandy")} style={{ background: "none" }} className="fightActionsContainer">
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
                                            <div onClick={() => consumeCandy("megacandy")} style={{ filter: "hue-rotate(182deg)", background: "none" }} className="fightActionsContainer">
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
