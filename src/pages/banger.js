import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import $ from 'jquery';
import UniqueBoxV2 from "./uniqueBoxV2";

function Banger(props) {
    useEffect(() => {
        document.body.classList.add("banger-page");

        return () => {
            document.body.classList.remove("banger-page");
        };
    }, []);

    return (
        <>
        </>
    )
}

export default Banger
