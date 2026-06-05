import "./Loader.css";

function Loader() {

    return (
        <div className="loaderContainer">

            <img
                src="/Sprites/shiny/25.gif"
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