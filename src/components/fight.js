import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios'


function ProgressBarFight(props) {
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [isAttacking, setIsAttacking] = useState(false);
    const [hasAppeared, setHasAppeared] = useState(false);
    const [baseAttack, setBaseAttack] = useState(null);
    const [currentHp, setCurrentHp] = useState(null);
    const [currentXp, setCurrentXp] = useState(0);
    const [maxHp, setMaxHp] = useState(null);
    const [damageText, setDamageText] = useState(null);
    const [isKO, setIsKO] = useState(false);
    const [curentLevel, setCurrentLevel] = useState(props.compagnon[0].level);

    useEffect(() => {
        startFight();
        const interval = setInterval(() => {

                setIsAttacking(true);
                const baseAttack =
                    props.compagnon[0].tier === 4 ? 40 :
                        props.compagnon[0].tier === 3 ? 20 :
                            props.compagnon[0].tier === 2 ? 10 :
                                5;
                const attack =
                    baseAttack + Math.floor(props.compagnon[0].level / 4);
                const minDamage = Math.floor(attack * 0.8);
                const maxDamage = Math.floor(attack * 1.2);

                let damage = Math.floor(
                    Math.random() * (maxDamage - minDamage + 1)
                ) + minDamage;
                const critical = Math.random() < 0.05;
                if (critical) {
                    damage *= 2;
                }
                setDamageText({
                    value: damage,
                    critical
                });
                setCurrentHp(prevHp => Math.max(0, prevHp - damage));
                setTimeout(() => {
                    setTimeout(() => {
                        setDamageText(null);
                    }, 1000);
                    setIsAttacking(false);
                }, 300); // durée de l'animation
            }, 2000);
            return () => clearInterval(interval);

    }, []);
    useEffect(() => {
        if (currentHp !== null &&
            currentHp <= 0 &&
            !isKO &&
            pokemon) {
            setIsAttacking(false);
            setIsKO(true);
            let formMultiplier;
            if (props.compagnon[0].shiny === 1) {
                formMultiplier = 1.5;
            } else if (props.compagnon[0].negative === 1) {
                formMultiplier = 2;
            } else {
                formMultiplier = 1;

            }
            const tierMultiplier = {
                1: 1,
                2: 2,
                3: 4,
                4: 8
            };
            const xpToNextLevel =
                Math.floor((20 + curentLevel * curentLevel * 2) * tierMultiplier[props.compagnon[0].tier] * formMultiplier);
            const xpGain =
                Math.floor(maxHp / 8);
            const newXp = currentXp + xpGain;
            if (newXp >= xpToNextLevel) {
                Axios.post('/api/levelupCompagnon', {
                    id: props.compagnon[0].id
                })
                setCurrentLevel(prev => prev + 1);
                setCurrentXp(0);
            } else {
                setCurrentXp(newXp);
            }
            setTimeout(() => {
                startFight();
                setIsKO(false);
            }, 1500); // durée animation KO
        }
    }, [currentHp]);
    useEffect(() => {
        const tierMultiplier = {
            1: 1,
            2: 2,
            3: 4,
            4: 8
        };
        let formMultiplier;
        if (props.compagnon[0].shiny === 1) {
            formMultiplier = 1.5;
        } else if (props.compagnon[0].negative === 1) {
            formMultiplier = 2;
        } else {
            formMultiplier = 1;

        }
    }, [curentLevel]);
    function startFight() {
        setHasAppeared(false)
        const tierMultiplier = {
            1: 1,
            2: 2,
            3: 4,
            4: 8
        };
        let formMultiplier;
        if (props.compagnon[0].shiny === 1) {
            formMultiplier = 1.5;
        } else if (props.compagnon[0].negative === 1) {
            formMultiplier = 2;
        } else {
            formMultiplier = 1;

        }
        const tierRoll = Math.random();
        if (tierRoll < 0.01) {
            var tier = 4;
            setCurrentHp(1200)
            setMaxHp(1200)
        } else if (tierRoll < 0.11) {
            var tier = 3;
            setCurrentHp(600)
            setMaxHp(600)
        } else if (tierRoll < 0.41) {
            var tier = 2;
            setCurrentHp(300)
            setMaxHp(300)
        } else {
            var tier = 1;
            setCurrentHp(150)
            setMaxHp(150)
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
                    setHasAppeared(true);
                    isNegative = 1;
                    isShiny = 0;
                } else if (shiny == 16) {
                    setHasAppeared(true);
                    setShiny(1);
                    setNegative(0);
                    isNegative = 0;
                    isShiny = 1;
                } else {
                    setHasAppeared(true);
                    setShiny(0);
                    setNegative(0);
                    isNegative = 0;
                    isShiny = 0;
                }
            })

    }
    const tierMultiplier = {
        1: 1,
        2: 2,
        3: 4,
        4: 8
    };

    const formMultiplier =
        props.compagnon[0].negative === 1
            ? 2
            : props.compagnon[0].shiny === 1
                ? 1.5
                : 1;

    const xpToNextLevel = Math.floor(
        (20 + curentLevel * curentLevel * 2) *
        tierMultiplier[props.compagnon[0].tier] *
        formMultiplier
    );
    const exitFight = () => {
        props.setOnFight(false);
    };
    return (            
        <div className={"globalContainerCenter"}>
            {pokemon &&
                <>
                    <p>Combat</p>
                <div style={{ flexDirection: "row", flexWrap: "wrap", backgroundImage: `url(/gym.png)`, overflow: "hidden" }} className={"fightContainer"}>
                    <div style={{ top: "10px" }} onClick={exitFight} className={"fightActionsFlee"}>
                        < img src={"/doll.png"} />
                        <p>Partir</p>
                    </div>
                    <div className="hpBarContainer">
                        <div
                            className="hpBar"
                            style={{
                                width: `${(currentHp / maxHp) * 100}%`,
                                background:
                                    (currentHp / maxHp) * 100 < 20
                                        ? "linear-gradient(90deg,#ff0000,#ff4d4d)"
                                        : (currentHp / maxHp) * 100 < 50
                                            ? "linear-gradient(90deg,#ff8c00,#ffd000)"
                                            : "linear-gradient(90deg,#00b83f,#42ff87)"
                            }}
                        />
                        <span className="hpText">
                            {currentHp}/{maxHp} PV
                        </span>
                    </div>
                        <div style={{ width: "30%" }}>
                            <p className="fightName">{props.compagnon[0].pokemon}</p>
                            <div className="tierFight">
                            Nv.{curentLevel}
                            </div>
                        <div className={`fightSpriteCardInvert ${!hasAppeared ? "spawnInvert" : ""} ${isAttacking && !isKO ? "fightAttack" : ""}`} style={{ height: "200px", width: "100%", filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
                        </div>
                        <div style={{ width: "33%" }}>
                            <div className="fightSpriteCard" style={{ width: "100%", backgroundSize: "contain", backgroundImage: `url(/versus.png)` }} />
                        </div>
                        <div style={{ width: "30%" }}>
                        <p className="fightName">{pokemon.name}</p>
                        <div style={{display:"block",margin:"auto", backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        {damageText && (
                            <div className={`damageText ${damageText.critical ? "critical" : ""}`}>
                                -{damageText.value}
                            </div>
                        )}
                        <div className={`fightSpriteCardEnemy ${isKO ? "koAnimation" : ""} ${!hasAppeared ? "spawn" : ""} ${isAttacking ? "hit" : ""}`} style={{ height: "200px", width: "100%", filter: negative === 1 && "invert(1)", backgroundSize: "contain", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)` }}>
                            
                        </div>
                    </div>
                    <div className="hpBarContainer">
                        <div
                            className="hpBar"
                            style={{
                                width: `${(currentXp / xpToNextLevel) * 100}%`,
                                background:"linear-gradient(90deg,rgba(36, 70, 171, 1) 0%, rgba(2, 194, 232, 1) 100%)"
                            }}
                        />
                        <span className="hpText">
                            <p>{parseFloat((currentXp / xpToNextLevel) * 100).toFixed(2) + " %"}</p>
                        </span>
                    </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProgressBarFight
