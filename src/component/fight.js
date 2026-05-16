import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import Login from '../services/auth.services.js';

function Fight() {
    const [cookies, setCookie] = useCookies();
    return (
        <div className={"fightContainer"}>

        </div>
    )
}

export default Fight
