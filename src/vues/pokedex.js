import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Shinydex() {
    const [cookies, setCookie] = useCookies();
    const [pokedex, setPokedex] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getPokedex/" + + cookies.user.data[0].id)
            .then(function (response) {
                setPokedex(response.data)
            })
    }, []);
    return (
        <>

        </>
    );
}

export default Shinydex;
