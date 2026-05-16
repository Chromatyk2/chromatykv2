import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavBar(props) {
    const [cookies, setCookie] = useCookies();
    const [isExtended, setIsExtended] = useState(false);
    //useEffect(() => {
    //    if(typeof props.cookies.user !== "undefined"){
    //        Axios
    //        .get("/api/getProfil/"+props.cookies.user.data[0].id)
    //        .then(function(response) {
    //            if(response.data.length == 0){
    //                Axios.post('/api/addPkmPointRoulette',
    //                    {
    //                        user:props.cookies.user.data[0].login,
    //                        idUser: props.cookies.user.data[0].id,
    //                        nbToken: 6
    //                    }
    //                )
    //            }
    //        })
    //        Axios.post('/api/updateIdProfil',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //        Axios.post('/api/updateIdBadges',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //        Axios.post('/api/updateIdCaptures',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //        Axios.post('/api/updateIdCards',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //        Axios.post('/api/updateIdCompagnon',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //        Axios.post('/api/updateIdSkin',
    //            {
    //                user:props.cookies.user.data[0].login,
    //                idUser:props.cookies.user.data[0].id
    //            }
    //        )
    //    }
    //}, [props.cookies]);
    function deployNav() {
        if (isExtended) {
            document.getElementById("navBar").style.height = "0";
            setIsExtended(false);
        } else {
            document.getElementById("navBar").style.height = "fit-content";
            setIsExtended(true);
        }
    }
    return (
        <>
            <div id={"navBar"}>
                <Link className="navLink linkFromNav" to="/profil">
                    <img src={"/profil.png"} />
                    <p>Profil</p>
                </Link>
                {typeof cookies.user !== "undefined" &&
                    <>
                    <Link className="navLink linkFromNav" to="/combat">
                        <img src={"/punch.png"} />
                        <p>Combat</p>
                    </Link>
                    <Link className="navLink linkFromNav" to="/pokedex">
                        <img src={"/dex.png"} />
                        <p>Pokedex</p>
                    </Link>
                    <Link className="navLink linkFromNav" to="/compagnon">
                        <img src={"/doll.png"} />
                        <p>Compagnon</p>
                    </Link>
                    <Link className="navLink linkFromNav" to="/tcg/cartes">
                        <img src={"/card.png"} />
                        <p>Cartes</p>
                    </Link>
                    <Link className="navLink linkFromNav" to="/leaderboard">
                        <img src={"/vs.png"} />
                        <p>Communauté</p>
                    </Link>
                    </>
                }
                <Link className="navLink linkFromNav" to="/shiny">
                    <img src={"/shiny.png"} />
                    <p>Shiny Dex</p>
                </Link>
            </div>
            <div onClick={deployNav} className="halfCircle">
                <svg onClick={deployNav} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" height="55" width="55">
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0 -18 0" stroke-width="2"></path>
                    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" stroke-width="2"></path>
                    <path d="M3 12h6" stroke-width="2"></path>
                    <path d="M15 12h6" stroke-width="2"></path>
                </svg>
            </div>
        </>
  );
}

export default NavBar;
