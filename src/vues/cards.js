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
                const stats = progress[set.tcgdex_id];
                return (
                    <div key={set.id}>
                        <img
                            src={set.logo}
                            alt={set.name}
                            width={250}
                        />
                        <h3>{set.name}</h3>
                        <progress
                            value={stats?.owned || 0}
                            max={stats?.total || set.card_count}
                        />

                        <p>
                            {stats?.owned || 0} / {stats?.total || set.card_count}
                            {" "}
                            ({stats?.percent || 0}%)
                        </p>
                    </div>
                );

            })}
        </div>
    )
}

export default Cards
