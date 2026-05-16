import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import { Navigate } from "react-router-dom";
import Login from 'auth.services.js';



function Log() {
    useEffect(() => {
        setTimeout(function () {
            window.location.href = "https://chromatykv2.netlify.app/";
        }, 2000);
    }, []);
    return (
        <Login />
    )
}
export default Log;