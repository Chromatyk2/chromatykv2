import { useEffect, useState } from "react";
import Axios from "axios";

function Nostalpick() {
    const [current, setCurrent] = useState(null);
    const [upcoming, setUpcoming] = useState([]);
    const [finished, setFinished] = useState([]);

    const [consoleName, setConsoleName] = useState("");
    const [jeu, setJeu] = useState("");

    useEffect(() => {
        loadBangers();
    }, []);

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

            setUpcoming(prev => [...prev, data]);

            setConsoleName("");
            setJeu("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={"globalContainerCenter"}>
            <h1>Nostal'Pick</h1>

            <section className="current-game">
                <h2 class="wood-sign">Jeu en cours</h2>

                {current ? (
                    <div className="card">
                        <img alt={current.jeu} src={`url("/jaquettes/${current.console}/Jeu (${current.number}).png")`} />
                        <p><strong>Console :</strong> {current.console}</p>
                        <p><strong>Jeu :</strong> {current.jeu}</p>
                        <p><strong>Ajouté par :</strong> {current.viewer}</p>
                    </div>
                ) : (
                    <p>Aucun jeu en cours.</p>
                )}
            </section>

            <section className="add-game">
                <h2 class="wood-sign">Ajouter un jeu</h2>

                <form onSubmit={addBanger}>
                    <div>
                        <label>Console</label>
                        <input
                            type="text"
                            value={consoleName}
                            onChange={(e) =>
                                setConsoleName(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>Jeu</label>
                        <input
                            type="text"
                            value={jeu}
                            onChange={(e) =>
                                setJeu(e.target.value)
                            }
                        />
                    </div>

                    <button type="submit">
                        Ajouter
                    </button>
                </form>
            </section>

            <section className="upcoming-games">
                <h2 class="wood-sign">Jeux à venir</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Console</th>
                            <th>Jeu</th>
                            <th>Ajouté par</th>
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
                            <th>Ajouté par</th>
                        </tr>
                    </thead>

                    <tbody>
                        {finished.map((game) => (
                            <tr key={game.id}>
                                <td>{game.console}</td>
                                <td>{game.jeu}</td>
                                <td>{game.viewer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Nostalpick;