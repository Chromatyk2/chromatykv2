import React,{useState, useEffect} from 'react';
import Axios from "axios";
import moment from "moment/moment";

function Shinydex() {

    const [shinydex, setShinydex] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getShinydex")
            .then(function(response) {
                setShinydex(response.data)
            })
    }, []);
    return (
        <>
            {shinydex &&
                <>
                    <p className="pseudoProfil">Shinydex de Chromatyk</p>
                    <p style={{textAlign: "center", color: "white"}}>Retrouve ici l'ensemble des shinys capturés en live
                        avec les liens des VODs</p>
                    <p style={{textAlign: "center", color: "white"}}>Certaines varitations et formes alternatives sont comptées séparéments</p>
                    <p style={{textAlign: "center", color: "white", marginBottom: "35px"}}>Total
                        : {shinydex.length}/1186 ({parseFloat(shinydex.length / 1186 * 100).toFixed(2)}%)</p>
                </>
            }
            <div className={"shinydexContainer"}>
                {shinydex &&
                    shinydex.map((val, key) => {
                        return (
                            <div className={"shinydexCard"}>
                                <div className={"shinydexName"}>#{val.idPkm} {val.pokemon}<br/><span className={"spanShinydex"}>{val.surnom}</span></div>
                                <div className={"shinydexSpriteContainer"}>
                                    <div>
                                        <img className={"shinydexSprite"} src={"/Shinydex/shiny/" + val.idPkm + ".gif"}/>
                                    </div>
                                    {val.lien !== null &&
                                        <a target={"_blank"} href={val.lien}><img className={"linkShinydex"} src={"/youtube.png"}/></a>
                                    }
                                </div>
                                <div className={"description"}>
                                {moment(val.date).utc().format('DD/MM/YYYY')}<br/><span className={"spanShinydex"}>{val.version}</span><br/>{val.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Shinydex;
