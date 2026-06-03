import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Fight from "../components/fight";
function Cards() {
    //Cookies
    const [cookies, setCookie] = useCookies();
    const [collection, setCollection] = useState([])
    const [rotationSets, setRotationSets] = useState([])
    const [progress, setProgress] = useState({})
    const [now, setNow] = useState(Date.now());
    const [boosterCurrency, setBoosterCurrency] = useState(0);
    const userId = cookies.user.data[0].id;
    const [opening, setOpening] = useState(false);
    const [openedCards, setOpenedCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [showNewBadge,setShowNewBadge] =useState(false);
    const [isTransitioning,setIsTransitioning] =useState(false);
    const startOpening = (cards) => {setOpenedCards(cards);setCurrentCard(0);setRevealed(false);setOpening(true);

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
            }, 800);
        } else {
            setOpening(false);
        }
    };
    const openBooster = async (setTcgdexId) => {
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
            setBoosterCurrency(
                data.boosterCurrency
            );
            setProgress(
                data.progress
            );
            startOpening(
                data.openedCards
            );
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const loadData = async () => {
            const { data } = await Axios.get(
                `/api/card/init/${userId}`
            );
            setCollection(data.collection);
            setRotationSets(data.rotationSets);
            setProgress(data.progress);
            setBoosterCurrency(data.boosterCurrency);
        };
        loadData();
    }, [userId]);
    useEffect(() => {

        if (revealed) {

            const timeout =
                setTimeout(() => {

                    setShowNewBadge(true);

                }, 500);

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
    return (
        <div className={"globalContainerCenter"}>
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
                        <div
                            key={set.id}
                            className="packCard"
                        >
                            {isHot && (
                                <div className="hotBadge">
                                    🔥 HOT
                                </div>
                            )}
                            <img
                                src={set.logo}
                                alt={set.name}
                                className="packImage"
                            />
                            <div className="packOverlay">
                                <h2 className="packTitle">
                                    {set.name}
                                </h2>
                                {!isHot && (
                                    <div className="rotationTimer">
                                        ⏳ {getRemainingTime(set.end_date)}
                                    </div>
                                )}
                                <div className="packStats">
                                    <span>
                                        {stats.owned} / {stats.total}
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

                                <button
                                    className={`openPackButton ${boosterCurrency <= 0 ? "disabled" : ""
                                        }`}
                                    disabled={boosterCurrency <= 0}
                                    onClick={() => openBooster(set.tcgdex_id)}
                                >
                                    {boosterCurrency > 0 ? (
                                        <span className="buttonContent">
                                            Ouvrir x {boosterCurrency}
                                            <img
                                                src="/booster.png"
                                                alt="Booster"
                                                className="buttonBoosterIcon"
                                            />
                                        </span>
                                    ) : (
                                        "Aucun booster disponible"
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
                {
                    opening && (
                        <div className={`openingOverlay  ${revealed ? `tierBg${openedCards[currentCard]?.tier || 1}` : ""}`} onClick={nextCard}>
                            <div className="openingWrapper">
                                <div className={`card ${revealed ? "flipped" : ""} ${revealed ? `tier${openedCards[currentCard]?.tier || 1}` : ""}`}>
                                    <div className="cardInner">
                                        <div className="cardFront">
                                            <img src="/backCard.png" alt=""/>
                                        </div>
                                        <div className="cardBack">
                                            <img src={openedCards[currentCard]?.image +"/high.webp"}alt=""/>
                                            {
                                                showNewBadge &&
                                                openedCards[currentCard]?.isNew && (
                                                    <div className="newBadge">
                                                        ✨ NEW ✨
                                                    </div>
                                                )
                                            }
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
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cards
