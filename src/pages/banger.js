import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Banger(props) {
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);
    const [boxImage, setBoxImage] = useState("/basic.png");
    const [banger, setBanger] = useState(null);
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
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { data } = await Axios.get("/api/banger");

            setBanger(data);

            const roll = Math.random();
            if (roll < 0.01) {
                setBoxImage("/ultraOpen.png");
            } else if (roll < 0.03) {
                setBoxImage("/legendaryOpen.png");
            } else if (roll < 0.10) {
                setBoxImage("/epicOpen.png");
            } else if (roll < 0.25) {
                setBoxImage("/rareOpen.png");
            } else {
                setBoxImage("/basicOpen.png");
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
                <div
                    className="skinRevealImage"
                    style={{
                        backgroundImage: `url("/jaquettes/${banger.console}/${banger.number}.png")`
                    }}
                />
        </div>
    )
}

export default Banger
