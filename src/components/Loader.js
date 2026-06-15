import "./Loader.css";
import React, { useState, useEffect } from 'react';

function Loader() {
    const [pokemonId] = useState(
        () => Math.floor(Math.random() * 1398) + 1
    );


    return (
        <div className="loaderContainer">

            <img
                src={`/Sprites/shiny/${pokemonId}.gif`}
                alt="Loading"
                className="loaderPokemon"
            />

            <div className="loaderText">
                Chargement...
            </div>

        </div>
    );

}

export default Loader;