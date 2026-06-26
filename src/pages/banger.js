import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Banger(props) {
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);
    const [boxImage, setBoxImage] = useState("/basic.png");
    const [banger, setBanger] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        document.body.classList.add("banger-page");

        return () => {
            document.body.classList.remove("banger-page");
        };
    }, []);
    const openBanger = async () => {
        if (loading || opening) return;

        try {
            setLoading(true);
            setOpening(true);

            // La boîte tremble pendant 1 seconde
            await new Promise(resolve => setTimeout(resolve, 3000));

            const { data } = await Axios.get("/api/banger");

            setBanger(data);

            const roll = Math.random();
            if (roll < 0.01) {
                setBoxImage("/ultraOpen.png");
                setMessage('3 Pack Safari Plus gagnés ! ')
            } else if (roll < 0.03) {
                setBoxImage("/legendaryOpen.png");
                setMessage('1 Pack Safari Plus gagnés ! ')
            } else if (roll < 0.10) {
                setBoxImage("/epicOpen.png");
                setMessage('3 Pack Safari gagné ! ');
            } else if (roll < 0.25) {
                setBoxImage("/rareOpen.png");
                setMessage('2 Pack Safari gagné ! ');
            } else {
                setBoxImage("/basicOpen.png");
                setMessage('1 Pack Safari gagné ! ');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setOpening(false);
            setLoading(false);
        }
    };
    return (
        <div className="banger-container">
            <button
                className="banger-button"
                onClick={openBanger}
                disabled={loading}
            >
                <img
                    src={boxImage}
                    alt="Banger Box"
                    className={opening ? "shake" : ""}
                />
            </button>


            {banger && (
                
                <div className="bangerRevealOverlay">
                    <div className="skinRevealCard">
                        <div
                            className="skinRevealImage"
                            style={{
                                backgroundImage: `url("/jaquettes/${banger.console}/Jeu (${banger.number}).png")`,margin:"auto",height:"230px"
                            }}
                        />
                        <p>Proposé par {banger.viewer}</p>
                        <p>{message}</p>
                        </div>
                    </div>
            )}
        </div>
    )
}

export default Banger
