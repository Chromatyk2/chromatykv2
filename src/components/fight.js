import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import { useCookies } from 'react-cookie';
import ShadowSmokeFront from "./shadowSmokeFront";
import ShadowSmokeBack from "./shadowSmokeBack";


function Fight(props) {
    const [cookies, setCookie] = useCookies();
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [isAttacking, setIsAttacking] = useState(false);
    const [hasAppeared, setHasAppeared] = useState(false);
    const [baseAttack, setBaseAttack] = useState(null);
    const [currentHp, setCurrentHp] = useState(null);
    const [currentXp, setCurrentXp] = useState(props.compagnon[0].xp);
    const [maxHp, setMaxHp] = useState(null);
    const [isKO, setIsKO] = useState(false);
    const [curentLevel, setCurrentLevel] = useState(props.compagnon[0].level);
    const [damageText, setDamageText] = useState(null);
    const [particles, setParticles] = useState([]);
    const [sessionReward, setSessionReward] = useState([]);
    const pokemonContainerRef = useRef(null);
    const [nextFight, setNextFight] = useState(null);
    const showDamage = (
        damage,
        isCritical
    ) => {
        const angle =
            (-90 + (
                Math.random() * 80 - 40
            )) *
            Math.PI /
            180;
        const distance =
            120 +
            Math.random() * 80;
        const endX =
            Math.cos(angle) *
            distance;
        const endY =
            Math.sin(angle) *
            distance;
        setDamageText({
            value: damage,
            critical: isCritical,
            endX,
            endY,
        });
        createHitParticles();
        setTimeout(() => {
            setDamageText(null);
        }, 1000);
    };
    const createHitParticles = () => {

        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: Date.now() + i,

            startX: Math.random() * 60 - 30,
            startY: Math.random() * 60 - 30,

            offsetX: Math.random() * 250 - 125,
            offsetY: Math.random() * 180 - 90,

            size:
                Math.random() > 0.8
                    ? Math.random() * 12 + 10
                    : Math.random() * 6 + 4,

            rotation: Math.random() * 360,
        }));

        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => {
            setParticles(prev =>
                prev.filter(
                    p => !newParticles.some(np => np.id === p.id)
                )
            );
        }, 500);
    };
    function calculateDamage() {
        const tierMultiplier =
            props.compagnon[0].tier === 4
                ? 4
                : props.compagnon[0].tier === 3
                    ? 2.5 
                    : props.compagnon[0].tier === 2
                        ? 1.5
                        : 1;
        const baseAttack =
            11 +
            (
                props.compagnon[0].level -
                1
            ) *
            (
                22.33 / 99
            );
        const attack =
            baseAttack *
            tierMultiplier *
            10;
        const minDamage =
            Math.floor(
                attack * 0.8
            );
        const maxDamage =
            Math.floor(
                attack * 1.2
            );
        let damage =
            Math.floor(
                Math.random() *
                (
                    maxDamage -
                    minDamage +
                    1
                )
            ) +
            minDamage;
        const critical =
            Math.random() <
            0.05;
        if (critical) {
            damage *= 2;
        }
        return {
            damage,
            critical
        };
    }
    async function generateFight() {
        const response = await Axios.post("/api/fight/start");
        return response.data;
    }
    useEffect(() => {
        startFight();
    }, []);
    useEffect(() => {
        const interval =
            setInterval(() => {
                if (
                    isKO ||
                    !pokemon
                ) {
                    return;
                }
                setIsAttacking(true);
                const {
                    damage,
                    critical
                } = calculateDamage();
                setCurrentHp(
                    prevHp =>
                        Math.max(
                            0,
                            prevHp - damage
                        )
                );
                showDamage(
                    damage,
                    critical
                );
                setTimeout(() => {
                    setIsAttacking(false);
                }, 300);
            }, 2000);
        return () =>
            clearInterval(interval);
    }, [isKO, pokemon]);

    useEffect(() => {
        async function handleKO() {
            if (
                currentHp === null ||
                currentHp > 0 ||
                isKO ||
                !pokemon
            ) {
                return;
            }

            // Empêche plusieurs exécutions
            setIsKO(true);

            setTimeout(async () => {
                try {
                    setIsAttacking(false);

                    const response =
                        await Axios.post(
                            "/api/fight/kill",
                            {
                                pokemon
                            }
                        );

                    setCurrentLevel(
                        response.data.level
                    );

                    setCurrentXp(
                        response.data.xp
                    );

                    if (
                        response.data.rewards
                            ?.length > 0
                    ) {
                        setSessionReward(
                            prev => {
                                const updated = [...prev];

                                response.data.rewards.forEach(
                                    reward => {
                                        const existing =
                                            updated.find(
                                                r =>
                                                    r.item ===
                                                    reward.item
                                            );

                                        if (existing) {
                                            existing.quantity++;
                                        } else {
                                            updated.push({
                                                ...reward,
                                                quantity: 1
                                            });
                                        }
                                    }
                                );

                                return updated;
                            }
                        );
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 500);

            setTimeout(() => {
                startFight();
                setIsKO(false);
            }, 1500);
        }
        handleKO();
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
    async function startFight() {
        if (props.compagnon[0].level >= 100) {
            return;
        }
        try {
            setHasAppeared(false);
            let fight;
            // Si on a déjà un combat en réserve
            if (nextFight) {
                fight = nextFight;
            } else {
                fight = await generateFight();
            }
            // Préparer le suivant en arrière-plan
            generateFight().then(next => {
                setNextFight(next);
                const img = new Image();
                img.src =
                    `/Sprites/${next.shiny
                        ? "shiny"
                        : "normal"
                    }/${next.pokemon.number}.gif`;
            });
            setPokemon(fight.pokemon);
            setCurrentHp(fight.currentHp);
            setMaxHp(fight.maxHp);
            setHasAppeared(true);
        } catch (err) {
            console.error(err);
        }
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
            <h2 class="wood-sign">Arene de Combat</h2>
            <div style={{ flexDirection: "row", flexWrap: "wrap", backgroundImage: `url(/gym.png)`, overflow: "hidden" }} className={"fightContainer"}>
                <div style={{ top: "10px" }} onClick={exitFight} className={"fightActionsFlee"}>
                    < img src={"/doll.png"} />
                    <p>Partir</p>
                </div>
                {props.compagnon[0].level >= 100 &&
                    <p>Un pokémon level 100 ne peut pas combattre</p>
                }
            {pokemon &&
                <>
                    <div className={"rewardFightContainer"}>
                        <p style={{ width: "100%", margin: "0" }}>Récompense de session :</p>
                        {sessionReward.length > 0 &&
                                sessionReward.map(reward => (
                                    <div
                                        style={{ top: "10px" }}
                                        className="rewardItem"
                                    >
                                        <img src={"/"+reward.slug+".png"} />
                                        <p style={{bckground: "linear-gradient(#b87a3d,#8b5a2b)", borderRadius: "0 0 5px 5px", height: "14px", fontSize: "0.64rem"}}>
                                            x{reward.quantity}
                                        </p>
                                    </div>
                                ))
                        }
                     </div>
                        <div style={{ width: "30%" }}>
                        <p style={{ margin: 0, fontSize: "17px" }} className="fightName">{props.compagnon[0].pokemon}</p>
                            <div className="tierFight">
                            Nv.{curentLevel}
                            </div>
                        <div ref={pokemonContainerRef} style={{ width: "100%", filter:'drop-shadow(1px 1px 1px black)'}} className={`fightSpriteCardInvert ${!hasAppeared ? "spawnInvert" : ""} ${isAttacking && !isKO ? "fightAttack" : ""}`}>
                            {props.compagnon[0].negative === 1 && <ShadowSmokeBack targetRef={pokemonContainerRef} />}
                            {props.compagnon[0].negative === 1 && <ShadowSmokeFront targetRef={pokemonContainerRef} />}
                            <img style={{ maxHeight: "200px", maxWidth:"200px", width:"auto", height:"auto" }} className={props.compagnon[0].negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                src={`/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif`}
                                alt=""
                            />
                            <div className={"pokemon-shadow"}></div>
                        </div>
                    </div>
                        <div style={{ width: "33%" }}>
                            <div className="fightSpriteCard" style={{ width: "100%", backgroundSize: "contain", backgroundImage: `url(/versus.png)` }} />
                        </div>
                        <div style={{ position:"relative", width: "30%" }}>
                        <p style={{ margin: 0, fontSize: "17px" }} className="fightName">{pokemon.name}</p>
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
                                {currentHp} PV
                            </span>
                        </div>
                        <div style={{ width: "50%", display: "block", margin: "auto", backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        <div className="fightSpriteWrapper">
                            <div 
                                className={`fightSpriteCardEnemy
                                    ${isKO ? "koAnimation" : ""}
                                    ${!hasAppeared ? "spawn" : ""}
                                    ${isAttacking ? "hit" : ""} pokemonSprite`}
                                style={{
                                     width: "100%",
                                    filter: negative === 1 && "invert(1)"                                    
                                }}
                            >
                                {pokemon.negative === 1 && <ShadowSmokeBack targetRef={pokemonContainerRef} />}
                                {pokemon.negative === 1 && <ShadowSmokeFront targetRef={pokemonContainerRef} />}
                                <img style={{ maxHeight: "200px", maxWidth: "200px", width: "auto", height: "auto" }} className={pokemon.negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                    src={`/Sprites/${pokemon.shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif`}
                                    alt=""
                                />
                                <div className={"pokemon-shadow"}></div>

                            
                            </div>
                            {damageText && (
                                <div
                                    className={`damageText ${damageText.critical ? "critical" : ""
                                        }`}
                                    style={{
                                        "--endX": `${damageText.endX}px`,
                                        "--endY": `${damageText.endY}px`,
                                    }}
                                >
                                    -{damageText.value}
                                </div>
                            )}

                            {particles.map((particle) => (
                                <div
                                    key={particle.id}
                                    className="hitParticle"
                                    style={{
                                        left: `calc(50% + ${particle.startX}px)`,
                                        top: `calc(50% + ${particle.startY}px)`,

                                        width: `${particle.size * 2}px`,
                                        height: `${particle.size / 2}px`,

                                        "--dx": `${particle.offsetX}px`,
                                        "--dy": `${particle.offsetY}px`,
                                        "--rotation": `${particle.rotation}deg`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{width:"70%"}} className="hpBarContainer">
                        <div
                            className="hpBar"
                            style={{
                                width: `${(currentXp / xpToNextLevel) * 100}%`,
                                background:"linear-gradient(90deg,rgba(36, 70, 171, 1) 0%, rgba(2, 194, 232, 1) 100%)"
                            }}
                        />
                        <span className="hpText">
                            <p style={{ fontSize:"16px"} }>{parseFloat((currentXp / xpToNextLevel) * 100).toFixed(2) + " %"}</p>
                        </span>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default Fight
