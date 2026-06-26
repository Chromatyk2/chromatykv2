import React, { useState, useEffect } from 'react';
import Axios from 'axios';

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
