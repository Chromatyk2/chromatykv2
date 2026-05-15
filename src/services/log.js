import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import { Navigate } from "react-router-dom";



function Log() {
    useEffect(() => {
        window.location.href = "https://chromatykv2.netlify.app/";
    }, []);
}
export default Log;