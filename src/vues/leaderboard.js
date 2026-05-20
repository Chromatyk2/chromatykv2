import React, { useState, useEffect } from 'react';
import Axios from "axios";
import moment from "moment/moment";
import { useCookies } from 'react-cookie';


function Leaderboard() {
    const [cookies, setCookie] = useCookies();
    const [leaderboard, setLeaderboard] = useState(null);
    useEffect(() => {
        Axios.get("/api/getLeaderBoard/")
            .then((response) => {
                setLeaderboard(response.data)
            })
    }, []);
    return (
        <div className={"globalContainer"}>
            <div className={"leaderboardContainer"}>
            <p style={{ margin: 0 }} >Communauté</p>
            {leaderboard &&
                leaderboard.map((val, key) => {
                    return (
                        <div class={"leaderboardHeaderContainer"}>
                            <p>{key}</p>
                            <div className={"profilHeader"}>
                                <div style={{width: "40px",height: "40px", backgroundColor: "rgba(0,0,0,0.3)", backgroundImage: `url("/Skins/Trainer${val.skin}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                                </div>
                                {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                                <div className={"profilInfos"}>
                                    <p style={{fontSize: "14px"}}>{val.login}</p>
                                    <p style={{ fontSize: "12px" }} className={"levelProfil"}>Niveau {val.level}</p>
                                </div>
                            </div>
                            <div className={"profilHeader"}>
                                <div className={"profilInfos"}>
                                    <p style={{ fontSize: "14px", textAlign: "end" }}>{val.pokemon}</p>
                                    <p style={{ fontSize: "12px", textAlign: "end" }} className={"levelProfil"}>{val.shiny === 1 ? "Shiny" : val.negative === 1 ? "Négatif" : "Classique"}</p>
                                </div>
                                <div style={{ width: "40px", height: "40px", filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundColor: "rgba(0,0,0,0.3)", backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"compagnonPicture"}>
                                </div>
                                {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
}

export default Leaderboard;
