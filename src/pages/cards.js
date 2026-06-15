import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Fight from "../components/fight";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader.js";
function Cards() {
    useEffect(() => {
        const img = new Image();
        img.src = "/backCard.png";
    }, []);
    //Cookies
    const [openingLoading, setOpeningLoading] = useState(false);
    const { user, loading } = useAuth();
    const [cookies, setCookie] = useCookies();
    const [collection, setCollection] = useState([])
    const [loadedImages, setLoadedImages] = useState({});
    const [rotationSets, setRotationSets] = useState([])
    const [progress, setProgress] = useState({})
    const [now, setNow] = useState(Date.now());
    const [boosterCurrency, setBoosterCurrency] = useState(0);
    const [opening, setOpening] = useState(false);
    const [isShop, setIsShop] = useState(true);
    const [openedCards, setOpenedCards] = useState([]);
    const [ownedSets, setOwnedSets] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [showNewBadge, setShowNewBadge] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [globalProgress, setGlobalProgress] = useState(null);
    const [searchParams] = useSearchParams();
    const param = searchParams.get("user");
    const [showImpact, setShowImpact] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [loadingSet, setLoadingSet] = useState(false);
    const [revealedCards, setRevealedCards] = useState({});
    const startOpening = (cards) => {
        setOpenedCards(cards); setCurrentCard(0); setRevealed(false); setOpening(true);

    };
    const nextCard = () => {
        if (isTransitioning) {
            return;
        }
        // Retourne la carte
        if (!revealed) {
            setRevealed(true);
            return;

        }
        // Carte suivante
        if (
            currentCard <
            openedCards.length - 1
        ) {
            setIsTransitioning(true);
            // On remet le dos visible
            setRevealed(false);
            // On attend la fin du flip
            setTimeout(() => {
                setCurrentCard(
                    prev => prev + 1
                );
                setIsTransitioning(false);
            }, 400);
        } else {
            setOpening(false);
        }
    };
    const preloadCards = (cards) => {
        return Promise.all(
            cards.map(card => {
                return new Promise(resolve => {
                    const img = new Image();

                    img.onload = resolve;
                    img.onerror = resolve;

                    img.src = `${card.image}/high.webp`;
                });
            })
        );
    };
    const openBooster = async (setTcgdexId) => {
        setShowImpact(false);
        setOpeningLoading(true);
        setOpening(true);
        const startTime = Date.now();
        const userId = user.id;
        try {
            const { data } = await Axios.post(
                "/api/card/openBooster",
                {
                    userId,
                    setTcgdexId
                }
            );
            if (!data.success) {
                return;
            }
            await preloadCards(data.openedCards);
            setBoosterCurrency(
                data.boosterCurrency
            );
            setProgress(
                data.progress
            );
            startOpening(
                data.openedCards
            );
            setGlobalProgress(
                data.globalProgress
            );
        } catch (err) {
            console.error(err);
        } finally {

            const elapsed = Date.now() - startTime;

            if (elapsed < 500) {
                await new Promise(resolve =>
                    setTimeout(resolve, 500 - elapsed)
                );
            }

            setOpeningLoading(false);

        }
    };
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        const profileUser =
            param || user.id;
        setIsShop(!param);
        const loadData =
            async () => {
                try {
                    const { data } =
                        await Axios.get(
                            `/api/card/init/${profileUser}`
                        );
                    setCollection(
                        data.collection
                    );
                    setRotationSets(
                        data.rotationSets
                    );
                    setProgress(
                        data.progress
                    );
                    setBoosterCurrency(
                        data.boosterCurrency
                    );
                    setGlobalProgress(
                        data.globalProgress
                    );
                    setOwnedSets(
                        data.ownedSets
                    );
                } catch (err) {
                    console.error(
                        err
                    );
                }
            };
        loadData();
    }, [
        user?.id,
        param
    ]);
    useEffect(() => {

        if (revealed) {

            const timeout =
                setTimeout(() => {

                    setShowNewBadge(true);

                }, 200);

            return () =>
                clearTimeout(timeout);

        }

        setShowNewBadge(false);

    }, [revealed]);
    useEffect(() => {

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, []);
    const sortedSets = [...rotationSets].sort((a, b) =>
        new Date(b.release_date) -
        new Date(a.release_date)
    );
    const newestReleaseDate = Math.max(
        ...rotationSets.map(set =>
            new Date(set.release_date).getTime()
        )
    );
    function getRemainingTime(endDate) {
        const diff =
            new Date(endDate).getTime() - now;
        if (diff <= 0) {
            return "Terminé";
        }
        const days =
            Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours =
            Math.floor(
                (diff / (1000 * 60 * 60)) % 24
            );
        const minutes =
            Math.floor(
                (diff / (1000 * 60)) % 60
            );
        return `${days}j ${hours}h ${minutes}m`;
    }

    const openSet = async (set) => {
        const profileUser =
            param || user.id;
        try {
            setLoadingSet(true);

            const { data: cards } = await Axios.get(
                `/api/card/set/${profileUser}/${set}`
            );

            setSelectedSet({
                ...set,
                cards
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoadingSet(false);
        }
    }
        return (
            <div className={"globalContainerCenter"}>
                {
                    globalProgress && (
                        <div className="globalProgressCard">
                            <h2 class="wood-sign">
                                {isShop === true ?
                                    "Boutique de cartes"
                                    :
                                    "Collection de cartes"
                                }
                            </h2>
                            {sortedSets.length > 0 && (
                                <small
                                    style={{
                                        display: "block",
                                        marginBottom: "10px",
                                        opacity: 0.8,
                                        color: "#fff8dc",
                                        fontSize: "15px"
                                    }}
                                >
                                    Rotation #{sortedSets[0].rotation_number} • Du{" "}
                                    {new Date(sortedSets[0].start_date).toLocaleDateString("fr-FR")}{" "}
                                    au{" "}
                                    {new Date(sortedSets[0].end_date).toLocaleDateString("fr-FR")}
                                </small>
                            )}
                            <p>
                                {globalProgress.owned}
                                {" / "}
                                {globalProgress.total}
                            </p>
                            <div style={{ marginBottom: "15px" }} className="hpBarContainer">
                                <div className="hpBar" style={{ width: `${globalProgress.percent}%`, background: "linear-gradient(90deg,rgba(36,70,171,1) 0%, rgba(2,194,232,1) 100%)" }} />
                                <span className="hpText">
                                    <p style={{ fontSize: "16px" }}>
                                        {parseFloat(globalProgress.percent).toFixed(2)}
                                        {" %"}
                                    </p>
                                </span>
                            </div>
                        </div>
                    )
                }
                {!new URLSearchParams(window.location.search).has("user") &&
                    <div className="viewSwitcher">
                        <button className={isShop === true ? "active" : ""} onClick={() => setIsShop(true)}>
                            Boutique
                        </button>
                        <button className={isShop === false ? "active" : ""} onClick={() => setIsShop(false)}>
                            Collection
                        </button>
                    </div>
                }
                {isShop === true ?
                    <div className="rotationGrid">
                        {sortedSets.map(set => {
                            const isHot =
                                new Date(set.release_date).getTime() ===
                                newestReleaseDate;
                            const stats = progress[set.tcgdex_id] || {
                                owned: 0,
                                total: set.card_count,
                                percent: 0
                            };
                            return (
                                <div key={set.id} className="boosterCard"
                                    onClick={() =>
                                        openBooster(
                                            set.tcgdex_id
                                        )
                                    }>
                                    {isHot && (
                                        <div className="hotBadge">
                                            🔥 HOT
                                        </div>
                                    )}
                                    <img
                                        src={set.logo}
                                        alt={set.name}
                                        className="boosterImage"
                                    />
                                    <div className="boosterFooter">

                                        <div className="rotationTimer">
                                            {!isHot && (
                                                <>
                                                    ⏳ {getRemainingTime(set.end_date)}
                                                </>
                                            )}
                                        </div>
                                        <div className="progressInfos">
                                            <span>
                                                {stats.owned}
                                                {" / "}
                                                {stats.total}
                                            </span>
                                            <span>
                                                {stats.percent}%
                                            </span>
                                        </div>
                                        <div className="hpBarContainer">
                                            <div
                                                className="hpBar"
                                                style={{
                                                    width: `${stats.percent}%`,
                                                    background: "linear-gradient(90deg,rgba(36, 70, 171, 1) 0%, rgba(2, 194, 232, 1) 100%)"
                                                }}
                                            />
                                            <span className="hpText">
                                                <p style={{ fontSize: "16px" }}>{parseFloat(stats.percent).toFixed(2) + " %"}</p>
                                            </span>
                                        </div>

                                        <div className="progressBarContainer">

                                            <div
                                                className="progressBar"
                                                style={{
                                                    width:
                                                        `${stats.percent}%`
                                                }}
                                            />

                                        </div>

                                        <button
                                            className={`openBoosterButton ${boosterCurrency <= 0
                                                ? "disabled"
                                                : ""
                                                }`}
                                            disabled={
                                                boosterCurrency <= 0
                                            }
                                        >

                                            {
                                                boosterCurrency > 0
                                                    ? (
                                                        <span className="buttonContent">
                                                            x {boosterCurrency}
                                                            <img
                                                                src="/booster.png"
                                                                alt=""
                                                                className="buttonBoosterIcon"
                                                            />
                                                        </span>
                                                    )
                                                    : (
                                                        "Aucun booster disponible"
                                                    )
                                            }

                                        </button>

                                    </div>

                                </div>
                            );
                        })}
                        {opening &&
                            <div
                                className={`openingOverlay ${revealed ? `tierBg${openedCards[currentCard]?.tier || 1}` : ""}`}
                                onClick={!openingLoading ? nextCard : undefined}
                            >
                                {openingLoading ? (
                                    <Loader />
                                ) : (

                                        <div className="openingWrapper">
                                            <div onAnimationEnd={() => { if (openedCards[currentCard]?.tier === 6) { setShowImpact(true); } }} className={`card ${revealed ? "flipped" : ""} ${revealed ? `tier${openedCards[currentCard]?.tier || 1}` : ""}`}>
                                                {showImpact && (
                                                    <div className="impactEffect" />
                                                )}
                                                <div className="cardInner">
                                                    <div className="cardFront">
                                                        <img src="/backCard.png" alt="" />
                                                    </div>
                                                    <div className="cardBack">
                                                        <div className="cardArtwork">
                                                            <img
                                                                src={openedCards[currentCard]?.image + "/high.webp"}
                                                                alt=""
                                                            />

                                                            {openedCards[currentCard]?.tier >= 6 && (
                                                                <>
                                                                    <div className="holoEffect" />
                                                                    <div className="sparkles" />
                                                                </>
                                                            )}
                                                        </div>

                                                        {showNewBadge &&
                                                            openedCards[currentCard]?.isNew && (
                                                                <div className="newBadge">
                                                                    ✨ NEW ✨
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cardInfos">
                                                Carte
                                                {" "}
                                                {currentCard + 1}
                                                {" / "}
                                                {openedCards.length}
                                            </div>
                                            <div className="hint">
                                                {
                                                    !revealed
                                                        ? "Cliquer pour retourner"
                                                        : "Cliquer pour continuer"
                                                }

                                            </div>
                                        </div>

                                )}
                            </div>

                        }
                    </div>
                    :
                    <div className="collectionGrid">
                        {!selectedSet ? (
                            ownedSets?.map(set => (
                                <div key={set.tcgdex_id} className="boosterCard" onClick={() => openSet(set.tcgdex_id)}>
                                    <img src={set.logo} alt={set.name} className="boosterImage" />
                                    <div className="boosterFooter">
                                        <div className="progressInfos">
                                            <span>
                                                {set.owned}
                                                {" / "}
                                                {set.card_count}
                                            </span>
                                            <span>
                                                {set.percent}%
                                            </span>
                                        </div>
                                        <div className="hpBarContainer">
                                            <div
                                                className="hpBar"
                                                style={{
                                                    width: `${set.percent}%`,
                                                    background: "linear-gradient(90deg,rgba(36, 70, 171, 1) 0%, rgba(2, 194, 232, 1) 100%)"
                                                }}
                                            />
                                            <span className="hpText">
                                                <p style={{ fontSize: "16px" }}>{parseFloat(set.percent).toFixed(2) + " %"}</p>
                                            </span>
                                        </div>
                                        <div className="progressBarContainer">
                                            <div
                                                className="progressBar"
                                                style={{
                                                    width:
                                                        `${set.percent}%`
                                                }}
                                            />
                                        </div>
                                        <button className="openBoosterButton" onClick={() => openSet(set)}>
                                            <span className="buttonContent">
                                                Voir les cartes
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )
                            )
                        ) : (
                            <div className="setCollection">
                                <button className="backButton" onClick={() => setSelectedSet(null)}>
                                    ← Retour
                                </button>
                                <h2>{selectedSet.name}</h2>
                                <div className="cardsGrid">
                                    {
                                        [...selectedSet.cards]
                                            .sort(
                                                (a, b) =>
                                                    Number(a.localId) -
                                                    Number(b.localId)
                                            )
                                                .map(card => {
                                                    const revealed = revealedCards[card.id];
                                                    const owned = card.quantity > 0;
                                                    return(                                                        
                                                        <div style = {{ width: "200px" }}
                                                            className="cardArtwork"
                                                            onMouseMove={(e) => {
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                const x =
                                                                    ((e.clientX - rect.left) / rect.width) * 100;
                                                                const y =
                                                                    ((e.clientY - rect.top) / rect.height) * 100;
                                                                e.currentTarget.style.setProperty(
                                                                    "--x",
                                                                    `${x}%`
                                                                );
                                                                e.currentTarget.style.setProperty(
                                                                    "--y",
                                                                    `${y}%`
                                                                );
                                                            }}
                                                                    >
                                                            {!loadedImages[card.id] && (
                                                                <div className="cardPlaceholder" />
                                                            )}
                                                            <img
                                                                onClick={() => {
                                                                    if (!owned) {
                                                                        setRevealedCards(prev => ({
                                                                            ...prev,
                                                                            [card.id]: true
                                                                        }));
                                                                    }
                                                                }}
                                                                src={
                                                                    owned || revealed
                                                                        ? card.image + "/high.webp"
                                                                        : "/backCard.png"
                                                                }
                                                                alt=""
                                                                loading="lazy"
                                                                decoding="async"

                                                                className={`
                                                                    ${loadedImages[card.id] ? "loaded" : ""}
                                                                    ${!owned && revealed ? "grayscaleCard" : ""}
                                                                `}
                                                                onLoad={() =>
                                                                    setLoadedImages(prev => ({
                                                                        ...prev,
                                                                        [card.id]: true
                                                                    }))
                                                                }
                                                            />
                                                            {card.tier >= 6 && (
                                                                <>
                                                                    <div className="holoEffect" />
                                                                    <div className="sparkles" />
                                                                </>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )
                                    }
                                </div>
                            </div>
                        )
                        }
                    </div>
                }
            </div>
        )
    }


export default Cards
