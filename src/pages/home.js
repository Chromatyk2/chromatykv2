import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Login from '../services/auth.services.js';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function HomePage(props) {
    const [shinydex, setShinydex] = useState(null);
    const [onLoad, setOnload] = useState(true);
    const {user,loading} = useAuth();
    useEffect(() => {
        if (!loading) {
            loadHome();
        }
    }, [loading]);
    async function loadHome() {
        try {
            if (user) {
                const profile =
                    await Axios.get(
                        `/api/profile/${user.id}`
                    );
                if (
                    profile.data.profile === null
                ) {
                    await Axios.post(
                        "/api/createAccount"
                    );
                }
            }
            const shinyResponse =
                await Axios.get(
                    "/api/getShinydex"
                );
            setShinydex(
                shinyResponse.data.sort(
                    (a, b) => b.id - a.id
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setOnload(false);
        }
    }
    return (
        <div className="globalContainerCenter homePage">

            {/* Présentation */}
            <h1 className="wood-sign">
                Chromatyk - Ouvre des boosters Pokémon gratuits et capture des Pokémon
            </h1>

            {onLoad === false && (
                <>
                    <section className="homeHero">
                        <p className="welcomeText">
                            Bienvenue sur Chromatyk, le jeu Pokémon gratuit de la communauté Twitch !
                            Regarde les streams, gagne des ressources, capture des Pokémon,
                            combats-les et complète ta collection de cartes Pokémon.
                        </p>

                        <p>
                            Rejoins la communauté et participe à l'aventure sur{" "}
                            <a
                                href="https://twitch.tv/chromatyk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="homeActionLink"
                            >
                                Twitch
                            </a>{" "}
                            !
                        </p>

                        <a
                            href="https://twitch.tv/chromatyk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homePrimaryButton"
                        >
                            <img src="/twitch.png" alt="" />
                            <span>Rejoindre le stream</span>
                        </a>
                    </section>

                    {/* Les étapes du jeu */}
                    <section className="homeJourney">
                        <h2 className="wood-sign">Comment jouer ?</h2>

                        <div className="homeSteps">

                            {/* Étape 1 */}
                            <article className="homeStep">
                                <div className="homeStepNumber">01</div>

                                <img
                                    className="homeStepIcon"
                                    src="/twitch.png"
                                    alt=""
                                />

                                <h3>Regarde les streams</h3>

                                <p>
                                    Regarde Chromatyk sur Twitch et gagne des points
                                    de chaîne pour obtenir des ressources.
                                </p>

                                <a
                                    href="https://twitch.tv/chromatyk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="homeStepLink"
                                >
                                    Regarder le stream →
                                </a>
                            </article>

                            {/* Étape 2 */}
                            <article className="homeStep">
                                <div className="homeStepNumber">02</div>

                                <img
                                    className="homeStepIcon"
                                    src="/bag.png"
                                    alt=""
                                />

                                <h3>Récupère tes ressources</h3>

                                <p>
                                    Dépense tes points de chaîne pour obtenir des
                                    Packs Safari. Retrouve ensuite tes objets dans
                                    ton inventaire.
                                </p>

                                {user ? (
                                    <Link
                                        to="/inventaire"
                                        className="homeStepLink"
                                    >
                                        Voir mon inventaire →
                                    </Link>
                                ) : (
                                    <span className="homeStepLink">
                                        Connecte-toi pour jouer
                                    </span>
                                )}
                            </article>

                            {/* Étape 3 */}
                            <article className="homeStep">
                                <div className="homeStepNumber">03</div>

                                <img
                                    className="homeStepIcon"
                                    src="/honey.png"
                                    alt=""
                                />

                                <h3>Capture des Pokémon</h3>

                                <p>
                                    Utilise ton miel pour attirer un Pokémon sauvage,
                                    puis tente de le capturer avec une Safari Ball.
                                </p>

                                <Link to="/safari" className="homeStepLink">
                                    Partir en safari →
                                </Link>
                            </article>

                            {/* Étape 4 */}
                            <article className="homeStep">
                                <div className="homeStepNumber">04</div>

                                <img
                                    className="homeStepIcon"
                                    src="/doll.png"
                                    alt=""
                                />

                                <h3>Fais-les combattre</h3>

                                <p>
                                    Fais progresser tes compagnons grâce aux combats,
                                    gagne de l'expérience et récupère des boosters.
                                </p>

                                <Link to="/compagnon" className="homeStepLink">
                                    Voir mes compagnons →
                                </Link>
                            </article>

                            {/* Étape 5 */}
                            <article className="homeStep">
                                <div className="homeStepNumber">05</div>

                                <img
                                    className="homeStepIcon"
                                    src="/card.png"
                                    alt=""
                                />

                                <h3>Complète ta collection</h3>

                                <p>
                                    Ouvre tes boosters, découvre de nouvelles cartes
                                    et recherche les cartes les plus rares.
                                </p>

                                <Link to="/cartes" className="homeStepLink">
                                    Découvrir les cartes →
                                </Link>
                            </article>

                        </div>
                    </section>

                    {/* Dernier shiny capturé */}
                    <section className="homeShinySection">
                        <h2 className="wood-sign">
                            ✨ Dernier shiny capturé (en live)
                        </h2>

                        {shinydex && shinydex.length > 0 && (
                            <div className="shinydexCard">
                                <div className="shinydexName">
                                    #{shinydex[0].idPkm} {shinydex[0].pokemon}
                                    <br />

                                    <span className="spanShinydex">
                                        {shinydex[0].surnom}
                                    </span>
                                </div>

                                <div className="shinydexSpriteContainer">
                                    <div>
                                        <img
                                            alt={shinydex[0].pokemon}
                                            className="shinydexSprite"
                                            src={`/Sprites/Shiny/${shinydex[0].idPkm}.webp`}
                                        />
                                    </div>

                                    {shinydex[0].lien !== null && (
                                        <a
                                            rel="noreferrer"
                                            target="_blank"
                                            href={shinydex[0].lien}
                                        >
                                            <img
                                                alt="Voir la vidéo"
                                                className="linkShinydex"
                                                src="/youtube.png"
                                            />
                                        </a>
                                    )}
                                </div>

                                <div className="description">
                                    {moment(shinydex[0].date)
                                        .utc()
                                        .format("DD/MM/YYYY")}
                                    <br />

                                    <span className="spanShinydex">
                                        {shinydex[0].version}
                                    </span>

                                    <br />

                                    {shinydex[0].description}
                                </div>

                                <Link to="/shiny" className="homeStepLink">
                                    Découvrir le Shiny Dex →
                                </Link>
                            </div>
                        )}

                        {(!shinydex || shinydex.length === 0) && (
                            <p>
                                Les dernières captures chromatiques apparaîtront ici !
                            </p>
                        )}
                    </section>

                    {/* Explorer le site */}
                    <section className="homeExplore">
                        <h2 className="wood-sign">
                            Explore l'univers Chromatyk
                        </h2>

                        <div className="homeExploreLinks">

                            <Link to="/pokedex" className="homeExploreLink">
                                <img src="/dex.png" alt="" />
                                <span>Pokédex</span>
                            </Link>

                            <Link to="/shiny" className="homeExploreLink">
                                <img src="/shiny.png" alt="" />
                                <span>Shiny Dex</span>
                            </Link>

                            <Link to="/succes" className="homeExploreLink">
                                <img src="/trophee.png" alt="" />
                                <span>Succès</span>
                            </Link>

                            <Link to="/leaderboard" className="homeExploreLink">
                                <img src="/vs.png" alt="" />
                                <span>Classement</span>
                            </Link>

                        </div>
                    </section>
                </>
            )}
        </div>        
    )
}

export default HomePage
