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
    const [xpToNextLevel, setXpToLevelUp] = useState(0);
    const [maxHp, setMaxHp] = useState(null);
    const [damageText, setDamageText] = useState(null);
    const [isKO, setIsKO] = useState(false);
    const [curentLevel, setCurrentLevel] = useState(props.compagnon[0].level);

    useEffect(() => {
        startFight();
        const interval = setInterval(() => {
            setIsAttacking(true);
            const attack =
                baseAttack +
                Math.floor(props.compagnon[0].level / 5);
            let damage = Math.floor(
                attack * (0.9 + Math.random() * 0.2)
            );
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
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (currentHp <= 0 && !isKO) {
            setIsAttacking(false);
            setIsKO(true);
            const tierMultiplier = {
                1: 1,
                2: 1.5,
                3: 2.5,
                4: 4
            };
            const xpToNextLevel =
                Math.floor((20 + curentLevel * curentLevel * 2) * tierMultiplier[props.compagnon[0].tier]);
            const xpGain =
                Math.floor(maxHp / 10);
            setCurrentXp(prevXp => Math.max(0, prevXp + xpGain));
            if (currentXp + xpGain >= xpToNextLevel) {
                setCurrentLevel(prevLevel => Math.max(0, prevLevel + 1));
                setXpToLevelUp(Math.floor((20 + curentLevel * curentLevel * 2) * tierMultiplier[props.compagnon[0].tier]))
            }
            setTimeout(() => {
                startFight();
                setIsKO(false);
            }, 1500); // durée animation KO
        }
    }, [currentHp]);
    function startFight() {
        setHasAppeared(false)
        const tierMultiplier = {
            1: 1,
            2: 1.5,
            3: 2.5,
            4: 4
        };
        setXpToLevelUp(Math.floor((20 + curentLevel * curentLevel * 2) * tierMultiplier[props.compagnon[0].tier]))
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
        if (props.compagnon[0].tier === 4) {
            setBaseAttack(80)
        } else if (props.compagnon[0].tier === 3) {
            setBaseAttack(40)
        } else if (props.compagnon[0].tier === 2) {
            setBaseAttack(20)
        } else {
            setBaseAttack(10)
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
    return (            
        <div className={"globalContainerCenter"}>
            {pokemon &&
                <>
                    <p>Combat</p>
                <div style={{ flexDirection: "row", flexWrap: "wrap", backgroundImage: `url(/gym.png)`, overflow: "overlay" }} className={"fightContainer"}>
                    <div className={"progressBarFightExternalVersus"}>
                        <div style={{ width: (currentHp / maxHp) * 100 + "%", backgroundColor: (currentHp / maxHp) * 100 < 20 ? "red" : (currentHp / maxHp) * 100 < 50 ? "orange" : "green"}} className={"progressBarFightInternal"}>
                        </div>
                        <p>{currentHp +"/" + maxHp +" PV"}</p>
                    </div>
                        <div style={{ width: "30%" }}>
                            <p className="fightName">{props.compagnon[0].pokemon}</p>
                            <div className="tierFight">
                                Nv.{props.compagnon[0].level}
                            </div>
                        <div className={`fightSpriteCardInvert ${!hasAppeared ? "spawnInvert" : ""} ${isAttacking ? "fightAttack" : ""}`} style={{ height: "200px", width: "100%", filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
                        </div>
                        <div style={{ width: "33%" }}>
                            <div className="fightSpriteCard" style={{ width: "100%", backgroundSize: "contain", backgroundImage: `url(/versus.png)` }} />
                        </div>
                        <div style={{ width: "30%" }}>
                        <p className="fightName">{pokemon.name}</p>
                        <div style={{display:"block",margin:"auto", backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        <div className={`fightSpriteCardEnemy ${isKO ? "koAnimation" : ""} ${!hasAppeared ? "spawn" : ""} ${isAttacking ? "hit" : ""}`} style={{ height: "200px", width: "100%", filter: negative === 1 && "invert(1)", backgroundSize: "contain", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)` }}>
                            {damageText && (
                                <div className={`damageText ${damageText.critical ? "critical" : ""}`}>
                                    -{damageText.value}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"progressBarFightExternalXp"}>
                        <div style={{ width: (currentXp / xpToNextLevel) * 100+"%" }} className={"progressBarFightInternalXp"}>
                        </div>
                        <p>{currentXp + " / " + xpToNextLevel}</p>
                    </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProgressBarFight
