import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import { Tooltip } from "react-tooltip";
import PokedexTeam from "./pokedexTeam";
import Modal from "react-modal";
import $ from "jquery";

function ProgressBarFight() {
    return (            
        <progress className={"progressBarFight"} max="100" value="70">70%</progress>
    )
}

export default ProgressBarFight
