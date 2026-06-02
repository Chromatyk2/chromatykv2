import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios'
import { useCookies } from 'react-cookie';


function ProgressBarFight(props) {
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

    const showDamage = (damage, isCritical) => {

        const angle =
            (-90 + (Math.random() * 80 - 40)) * Math.PI / 180;

        const distance = 120 + Math.random() * 80;

        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

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
    useEffect(() => {
        startFight();
        const interval = setInterval(() => {

                setIsAttacking(true);
                const tierMultiplier =
                    props.compagnon[0].tier === 4 ? 3 :
                        props.compagnon[0].tier === 3 ? 2 :
                            props.compagnon[0].tier === 2 ? 1.5 :
                                1;
                const baseAttack =
                    11 + (props.compagnon[0].level - 1) * (22.33 / 99);

                const attack = baseAttack * tierMultiplier * 10;

                const minDamage = Math.floor(attack * 0.8);
                const maxDamage = Math.floor(attack * 1.2);

                let damage = Math.floor(
                    Math.random() * (maxDamage - minDamage + 1)
                ) + minDamage;

                const critical = Math.random() < 0.05;
                if (critical) {
                    damage *= 2;
                }
                showDamage(damage, critical);
                createHitParticles()
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
            const userId = cookies.user.data[0].id;
            const tierMultiplierattack =
                pokemon.tier === 4 ? 2 :
                    pokemon.tier === 3 ? 1.75 :
                        pokemon.tier === 2 ? 1.5 :
                            1.25;

            const packChance = 0.000142 * (tierMultiplierattack / 2);
            const fragmentChance = 0.000569 * (tierMultiplierattack / 2);
            const boosterChance = 0.00341 * (tierMultiplierattack / 2);

            const roll = Math.random();

            let reward = null;

            if (roll < packChance) {
                reward = {
                    item: "Pack Safari",
                    slug: "box",
                    image: "/box.png"
                };
            } else if (roll < packChance + fragmentChance) {
                reward = {
                    item: "Fragement de Pack",
                    slug: "fragement",
                    image: "/fragment.png"
                };
            } else if (roll < packChance + fragmentChance + boosterChance) {
                reward = {
                    item: "Booster",
                    slug: "booster",
                    image: "/booster.png"
                };
            }

            if (reward) {
                Axios.post('/api/addCandy', {
                    user: cookies.user.data[0].id,
                    item: reward.item,
                    slug: reward.slug,
                    quantity: 1
                });

                setSessionReward(prev => {
                    const existing = prev.find(r => r.item === reward.item);

                    if (existing) {
                        return prev.map(r =>
                            r.item === reward.item
                                ? { ...r, quantity: r.quantity + 1 }
                                : r
                        );
                    }

                    return [...prev, { ...reward, quantity: 1 }];
                });
            }
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

                Axios.post('/api/updateXpCompagnon', {
                    xp: xpGain,
                    id: props.compagnon[0].id
                })
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
            setCurrentHp(12000)
            setMaxHp(12000)
        } else if (tierRoll < 0.11) {
            var tier = 3;
            setCurrentHp(6000)
            setMaxHp(6000)
        } else if (tierRoll < 0.41) {
            var tier = 2;
            setCurrentHp(3000)
            setMaxHp(3000)
        } else {
            var tier = 1;
            setCurrentHp(1500)
            setMaxHp(1500)
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
                    <div className={"rewardFightContainer"}>
                        <p style={{ width: "100%", margin: "0" }}>Récompense de session :</p>
                        {sessionReward.length > 0 &&
                                sessionReward.map(reward => (
                                    <div
                                        key={reward.item}
                                        style={{ top: "10px" }}
                                        className="rewardItem"
                                    >
                                        <img src={reward.image} alt={reward.item} />
                                        <p>
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
                        <div style={{width:"100%"}} className={`fightSpriteCardInvert ${props.compagnon[0].negative === 1 ? "shadowPokemon" : ""} ${!hasAppeared ? "spawnInvert" : ""} ${isAttacking && !isKO ? "fightAttack" : ""}`}>
                            {props.compagnon[0].negative === 1 && (
                                <>
                                    <div className="shadowAura" />
                                    <div className="redCloudsBack">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </>
                            )}
                            <img style={{ width: "100%" }} src={`/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif`} alt="" />
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
                                {currentHp}/{maxHp} PV
                            </span>
                        </div>
                        <div style={{ width: "50%", display: "block", margin: "auto", backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        <div className="fightSpriteWrapper">
                            <div
                                className={`fightSpriteCardEnemy
                                    ${isKO ? "koAnimation" : ""}
                                    ${!hasAppeared ? "spawn" : ""}
                                    ${isAttacking ? "hit" : ""}`}
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    filter: negative === 1 && "invert(1)",
                                    backgroundSize: "contain",
                                    backgroundImage: `url(/Sprites/${
                                        shiny === 1 ? "shiny" : "normal"
                                    }/${pokemon.number}.gif)`
                                }}
                            >

                            
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
                </div>
                </>
            }
        </div>
    )
}

export default ProgressBarFight
