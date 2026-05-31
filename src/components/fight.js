import React, { useState, useEffect } from 'react';
import '../App.css'

function ProgressBarFight(props) {
    return (            
        <div className={"globalContainerCenter"}>
            <p>Compagnon</p>
            <div style={{ backgroundImage: `url(/gym.png)`, overflow: "overlay" }} className={"fightContainer"}>
                <p className="fightName">{props.compagnon[0].pokemon}</p>
                <div className="tierFight">
                    Nv.{props.compagnon[0].level}
                </div>
                <div className="fightSpriteCard" style={{ filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
            </div>
        </div>
    )
}

export default ProgressBarFight
