import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Pokedex() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [filteredPokedex, setFilteredPokedex] = useState(null);
    const [isShiny, setIsShiny] = useState("normal");
    const [isNegative, setIsNegative] = useState(0);
    const [gen, setGen] = useState(1);
    const [genList, setGenList] = useState([1,2,3,4,5,6,7,8,9])
    useEffect(() => {
        Axios
            .get("/api/getPokedex/"+cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
                setFilteredPokedex(response.data.filter(item => item.gen === 1 && item.shiny === 0 && item.negative === 0))
            })
    }, []);
    function filterGen(e) {
        setGen(e);
        if (e == 0) {
            setPokedex(pokedex.filter(item => item.gen === e))
        } else {
            setFilteredPokedex(pokedex.filter(item => item.gen === e))
        }
    }
    return (
        <div className={"globalContainer"}>
            <div className={"dexContainer"}>
                <div className={"genFilter"}>
                    <button className={gen === 0 && "active"} onClick={() => filterGen(0)} value={0}>Toutes</button>
                    {genList.map((val, key) => {
                        return (
                            <button className={gen === val && "active"} onClick={() => filterGen(val)} value={val}>Gen {val}</button>
                        )
                    })}

                </div>
                {pokedex &&
                    pokedex.filter(item => item.gen === gen).map((val, key) => {
                        return (
                            <>
                                <div className={"dexCard"}>
                                    <div className={"dexSpriteContainer"}>
                                        <span className={"dexNumber"}>#{val.pokemon}</span>
                                        <div>
                                            <img className={"dexSprite"} src={"/Sprites/" + isShiny + "/" + val.pokemon + ".gif"} />
                                        </div>
                                    </div>
                                    <div className={"dexDescription"}>
                                        <p className={"dexName"}>{val.name}</p>
                                        <p className={"dexDate"}>{moment(val.date).utc().format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>
                            </>

                        )
                    })
                }
            </div>
        </div>
    );
}

export default Pokedex;
