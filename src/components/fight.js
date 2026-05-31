import React, { useState, useEffect } from 'react';
import '../App.css'

function ProgressBarFight() {
    return (            
        <div className={"globalContainerCenter"}>
            <p>Compagnon</p>
            <div style={{ backgroundImage: `url(/gym.png)`, overflow: "overlay" }} className={"fightContainer"}>
            </div>
        </div>
    )
}

export default ProgressBarFight
