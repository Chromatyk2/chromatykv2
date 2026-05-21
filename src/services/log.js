import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import { Navigate } from "react-router-dom";
import Login from './auth.services.js';



function Log() {
    useEffect(() => {
        setTimeout(function () {
            window.location.href = "https://chromatyk.fr/";
        }, 2000);
    }, []);
    return (

        <div className={"globalContainerCenter"}>
            <Login />
        </div>
    )
}
export default Log;