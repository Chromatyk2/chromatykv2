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
    const [openedCards, setOpenedCards] = useState([]);
    const userId = cookies.user.data[0].id;

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

    const openBooster = async (setTcgdexId) => {

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

        setOpenedCards(
            data.openedCards
        );

    };
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
                    openedCards.length > 0 && (

                        <div className="openedCardsContainer">

                            <h2>
                                Cartes obtenues
                            </h2>

                            <div className="openedCardsGrid">

                                {openedCards.map(card => (

                                    <div
                                        key={card.tcgdex_id}
                                        className="openedCard"
                                    >

                                        <img
                                            src={`${card.image}/high.webp`}
                                            alt={card.tcgdex_id}
                                        />

                                        <p>
                                            {card.rarity}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )
                }
            </div>
        </div>
    )
}

export default Cards
