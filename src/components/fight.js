import React, { useState, useEffect } from 'react';
import '../App.css'

function ProgressBarFight(props) {
    return (            
        <div className={"globalContainerCenter"}>
            <p>Combat</p>
            <div style={{ flexDirection: "row", flexWrap: "wrap", backgroundImage: `url(/gym.png)`, overflow: "overlay" }} className={"fightContainer"}>
                <div style={{width:"30%"}}>
                    <p className="fightName">{props.compagnon[0].pokemon}</p>
                    <div className="tierFight">
                        Nv.{props.compagnon[0].level}
                    </div>
                    <div className="fightSpriteCard" style={{height:"200px", width:"100%", filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
                </div>
                <div style={{ width: "33%" }}>
                    <div className="fightSpriteCard" style={{ width: "100%", backgroundSize: "contain", backgroundImage: `url(/versus.png)` }} />
                </div>
                <div style={{ width: "30%" }}>
                    <p className="fightName">{props.compagnon[0].pokemon}</p>
                    <div className="tierFight">
                        Nv.{props.compagnon[0].level}
                    </div>
                    <div className="fightSpriteCard" style={{ height: "200px", width: "100%", filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
                </div>
            </div>
        </div>
    )
}

export default ProgressBarFight
