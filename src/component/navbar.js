import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';

function NavBar(props) {
    const [expanded, setExpanded] = useState(false);
    const [cookies, setCookie] = useCookies();
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
  return (
    <div>
        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/">Accueil</Link>
        {typeof cookies.user !== "undefined" &&              
            <>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/profil">Profil</Link>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/compagnon">Compagnon</Link>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/pokedex">Pokedex</Link>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/allProfils">Communauté</Link>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/cartes">Mes cartes</Link>
                <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/boutique">Ouverture Booster</Link>
        </>
        }
        <Link style={{color:"gold"}} onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/shinydex">Shinydex</Link>
    </div>
  );
}

export default NavBar;
