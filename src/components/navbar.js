import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar(props) {
    const [isExtended, setIsExtended] = useState(false);
    const { user, loading } = useAuth();
    function deployNav() {
        if (isExtended) {
            document.getElementById("navBar").style.height = "0";
            document.getElementById("navBar").style.padding = "0";
            setIsExtended(false);
        } else {
            document.getElementById("navBar").style.height = "fit-content";
            document.getElementById("navBar").style.padding = "20px 0";
            setIsExtended(true);
        }
    }
    return (
        <>
            <div id={"navBar"}>
                <Link onClick={deployNav} className="navLink linkFromNav" to="/">
                    <img src={"/rope.png"} />
                    <p>Accueil</p>
                </Link>
                {user &&
                    <>
                        <Link onClick={deployNav} className="navLink linkFromNav" to="/profil">
                            <img src={"/profil.png"} />
                            <p>Profil</p>
                        </Link>
                        <Link onClick={deployNav} className="navLink linkFromNav" to="/inventaire">
                            <img src={"/bag.png"} />
                            <p>Inventaire</p>
                        </Link>
                        <Link onClick={deployNav} className="navLink linkFromNav" to="/safari">
                            <img src={"/honey.png"} />
                            <p>Safari</p>
                        </Link>
                        <Link onClick={deployNav} className="navLink linkFromNav" to="/pokedex">
                            <img src={"/dex.png"} />
                            <p>Pokedex</p>
                        </Link>
                        <Link onClick={deployNav} className="navLink linkFromNav" to="/compagnon">
                            <img src={"/doll.png"} />
                            <p>Compagnon</p>
                        </Link>
                    </>
                }
                <Link onClick={deployNav} className="navLink linkFromNav" to="/leaderboard">
                    <img src={"/vs.png"} />
                    <p>Communauté</p>
                </Link>
                <Link onClick={deployNav} className="navLink linkFromNav" to="/shiny">
                    <img src={"/shiny.png"} />
                    <p>Shiny Dex</p>
                </Link>
                <Link onClick={deployNav} className="navLink linkFromNav" to="/cartes">
                    <img src={"/card.png"} />
                    <p>Cartes</p>
                </Link>
                <Link onClick={deployNav} className="navLink linkFromNav" to="/succes">
                    <img src={"/trophee.png"} />
                    <p>Succès</p>
                </Link>
                <a style={{ backgroundColor: "rgb(180 10 255 / 21%)"}}
                    onClick={deployNav}
                    className="navLink linkFromNav"
                    href="https://twitch.tv/chromatyk"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/twitch.png" alt="" />
                    <p style={{ backgroundColor: "#8d4b8d"}}>Twitch</p>
                </a>
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
