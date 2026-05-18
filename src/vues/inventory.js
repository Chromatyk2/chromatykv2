import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { useCookies } from 'react-cookie';

function Inventory(props) {
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        Axios.post('/api/createInventory', {
            user: cookies.user.data[0].id
        })
        .then(function (response) {
            Axios
            .get("/api/getInventory/" + cookies.user.data[0].id)
            .then(function (response) {
                console.log(response);
            })
        })
    }, []);
    return (
        <>
        </>
    )
}

export default Inventory
