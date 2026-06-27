import { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";

function Nostalpick() {
    const { user, loading } = useAuth();
    const [current, setCurrent] = useState(null);
    const [upcoming, setUpcoming] = useState([]);
    const [finished, setFinished] = useState([]);
    const [consoleName, setConsoleName] = useState("");
    const [jeu, setJeu] = useState("");
    const consoles = [
        "DREAMCAST",
        "GAMEGEAR",
        "GB",
        "GBA",
        "GBC",
        "MASTER SYSTEM",
        "MEGADRIVE",
        "N64",
        "NDS",
        "NES",
        "NGC",
        "PS1",
        "PS2",
        "PSP",
        "SNES",
        "WII"
    ];

    useEffect(() => {
        loadBangers();
    }, []);
    console.log(user);

    const loadBangers = async () => {
        try {
            const { data } = await Axios.get("/api/getBanger");

            setCurrent(data.current);
            setUpcoming(data.upcoming);
            setFinished(data.finished);
        } catch (err) {
            console.error(err);
        }
    };

    const addBanger = async (e) => {
        e.preventDefault();

        if (!consoleName || !jeu) {
            return;
        }

        try {
            const { data } = await Axios.post("/api/addBanger", {
                console: consoleName,
                jeu
            });

            setUpcoming(prev => [data, ...prev]);

            setConsoleName("");
            setJeu("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={"globalContainerCenter"}>
            <h1>Nostal'Pick</h1>
            {current &&
                <section className="current-game">
                    <h2 class="wood-sign">Jeu en cours</h2>

                    {current ? (
                        <div className="card">
                            <img style={{ width: "100%" }} alt={current.jeu} src={`/jaquettes/${current.console}/Jeu (${current.number}).png`} />
                            <p>{current.console}</p>
                            <p>{current.jeu}</p>
                            <p>Proposé par : {current.viewer}</p>
                        </div>
                    ) : (
                        <p>Aucun jeu en cours.</p>
                    )}
                </section>               
            }

            <section className="add-game">
                <h2 class="wood-sign">Ajouter un jeu</h2>

                <form onSubmit={addBanger}>
                    <div>
                        <label>Console</label>
                        <select
                            value={consoleName}
                            onChange={(e) => setConsoleName(e.target.value)}
                        >
                            <option value="">
                                Sélectionner une console
                            </option>

                            {consoles.map((console) => (
                                <option key={console} value={console}>
                                    {console}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Jeu</label>
                        <input
                            type="text"
                            value={jeu}
                            onChange={(e) =>
                                setJeu(e.target.value)
                            }
                            placeholder="Entrer le nom du jeu"
                        />
                    </div>

                    <button type="submit">
                        Ajouter au tirage
                    </button>
                </form>
            </section>

            <section className="upcoming-games">
                <h2 class="wood-sign">Jeux dans le tirage</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Console</th>
                            <th>Jeu</th>
                            <th>Ajouté par</th>
                            {user?.id === "80482655" && <th>ID</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {upcoming.map((game) => (
                            <tr key={game.id}>
                                <td>{game.console}</td>
                                <td>{game.jeu}</td>
                                <td>{game.viewer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="finished-games">
                <h2 class="wood-sign">Jeux terminés</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Console</th>
                            <th>Jeu</th>
                            <th>Proposé par</th>
                            <th>VOD</th>
                        </tr>
                    </thead>

                    <tbody>
                        {finished.map((game) => (
                            <tr style={{backgroundColor: user?.id === "80482655" && "red"}} key={game.id}>
                                <td>{game.console}</td>
                                <td>{game.jeu}</td>
                                <td>{game.viewer}</td>
                                {game.link !== null &&
                                    <td><a rel="noreferrer" target={"_blank"} href={game.link}><img alt="lien youtube" style={{width:"50px"}} src={"/youtube.png"} /></a></td>
                                }
                                {user?.id === "80482655" && <td>{game.number}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Nostalpick;