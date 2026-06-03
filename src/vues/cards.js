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
            {rotationSets.map(set => {

                const stats = progress[set.tcgdex_id] || {
                    owned: 0,
                    total: set.card_count,
                    percent: 0
                };

                return (
                    <div key={set.id}>

                        <img src={set.logo} alt={set.name} width={250}/>
                        <h3>
                            {set.name}
                        </h3>
                        <p>
                            {stats.owned} / {stats.total}
                        </p>
                        <div style={{ width: "70%" }} className="hpBarContainer">
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
                    </div>
                );

            })}
        </div>
    )
}

export default Cards
