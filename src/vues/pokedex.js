import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Pokedex() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [isShiny, setIsShiny] = useState("normal");
    const [isNegative, setIsNegative] = useState(0);
    const [gen, setGen] = useState(1);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/"+cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
            })
    }, []);
    return (
        <>
            <div className={"dexContainer"}>
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
        </>
    );
}

export default Pokedex;
