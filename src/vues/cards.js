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
    const userId = cookies.user.data[0].id;
    useEffect(() => {
        const loadData = async () => {
            const { data } = await Axios.get(
                `/api/card/init/${userId}`
            );
            setCollection(data.collection);
            setRotationSets(data.rotationSets);
            setProgress(data.progress);
        };
        loadData();
    }, [userId]);
    return (
        <div className={"globalContainerCenter"}>
            <div className="rotationGrid">

                {rotationSets.map(set => {

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

                            <img
                                src={set.logo}
                                alt={set.name}
                                className="packImage"
                            />

                            <div className="packOverlay">

                                <h2 className="packTitle">
                                    {set.name}
                                </h2>

                                <div className="packStats">

                                    <span>
                                        {stats.owned} / {stats.total}
                                    </span>

                                    <span>
                                        {stats.percent}%
                                    </span>

                                </div>

                                <div className="progressContainer">

                                    <div
                                        className="progressFill"
                                        style={{
                                            width: `${stats.percent}%`
                                        }}
                                    />

                                </div>

                                <button
                                    className="openPackButton"
                                    onClick={() => {
                                        console.log(
                                            "Ouverture du pack",
                                            set.tcgdex_id
                                        );
                                    }}
                                >
                                    OUVRIR
                                </button>

                            </div>

                        </div>

                    );

                })}

            </div>
        </div>
    )
}

export default Cards
