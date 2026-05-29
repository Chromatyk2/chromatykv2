import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { getColorSync, getPaletteSync } from 'colorthief';


function Leaderboard() {
    const [cookies, setCookie] = useCookies();
    const [leaderboard, setLeaderboard] = useState(null);
    const [color, setColor] = useState(1);
    const [colorList, setColorList] = useState(1);
    useEffect(() => {
        Axios.get("/api/getLeaderBoard/")
            .then(async (response) => {
                const skinsPromises = response.data.map((val) => {

                    return new Promise((resolve) => {

                        const img = new Image();

                        img.src = "/Skins/Trainer" + val.skin + ".png";

                        img.onload = () => {

                            const palette = getPaletteSync(img, { colorCount: 8 });

                            const color =
                                palette[Math.floor(Math.random() * palette.length)].hex();

                            resolve({
                                ...val,
                                color: color
                            });
                        };

                        img.onerror = () => {
                            console.log("Erreur image :", img.src);

                            resolve(null);
                        };
                    });
                });

                const newSkins = (await Promise.all(skinsPromises))
                    .filter(Boolean);
                setLeaderboard(newSkins)
            })
    }, []);
    return (
        <div className={"globalContainer"}>
            <div className={"leaderboardContainer"}>
            <p style={{ margin: 0 }} >Communauté</p>
            {leaderboard &&
                leaderboard.map((val, key) => {
                    return (
                        <Link class="leaderboardHeaderContainerLink" to={"/profil?user="+val.user}>
                        <div class={"leaderboardHeaderContainer"}>
                            <p className={"rank"}>{key+1}</p>
                            <div style={{width: "92%",display: "flex",justifyContent: "space-between"} }>
                                <div className={"profilHeader"}>
                                        <div style={{ width: "40px", height: "40px", backgroundColor: val.color, backgroundImage: `url("/Skins/Trainer${val.skin}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"profilPicture"}>
                                    </div>
                                    {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                                    <div className={"profilInfos"}>
                                        <p style={{ fontSize: "14px" }}>{val.login}</p>
                                        <p style={{ fontSize: "12px" }} className={"levelProfil"}>Niveau {val.level}</p>
                                    </div>
                                </div>
                                {val.number !== null &&
                                    <div className={"profilHeader"}>
                                        <div className={"profilInfos"}>
                                            <p style={{ fontSize: "14px", textAlign: "end" }}>{val.pokemon}</p>
                                            <p style={{ fontSize: "12px", textAlign: "end" }} className={"levelProfil"}>{val.shiny === 1 ? "Shiny" : val.negative === 1 ? "Négatif" : "Classique"}</p>
                                        </div>
                                            <div style={{ width: "40px", height: "40px", filter: val.negative === 1 ? "invert(1)" : "invert(0)", backgroundColor: val.color, backgroundImage: `url("/Sprites/${val.shiny === 1 ? "Shiny" : "Normal"}/${val.number}.gif")`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className={"compagnonPicture"}>
                                        </div>
                                        {/*<img className={"profilPicture"} style={{ background: color }} src={"/Skins/Trainer"+profil[0].skin+".png"} />*/}
                                    </div>
                                }
                            </div>
                        </div>
                        </Link>
                    )
                })
                }
            </div>
        </div>
    );
}

export default Leaderboard;
