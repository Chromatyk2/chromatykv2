import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Pokedex() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    const [isShiny, setIsShiny] = useState("normal");
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
            })
    }, []);
    return (
        <>
            {pokedex &&
                pokedex.map((val, key) => {
                    return (
                        <div className={"dexCard"}>
                            <span className={"dexName"}>{val.number}</span>
                            <img className={"dexSprite"} src={"/Sprites/" + isShiny + "/" + val.number + ".gif"} />
                            <p className={"dexName"}>{val.name}</p>
                            <p className={"dexDate"}>{moment(val.date).utc().format('DD/MM/YYYY')}</p>
                        </div >
                )
            }
        </>
    );
}

export default Pokedex;
