import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Banger(props) {
    const [loading, setLoading] = useState(false);
    const [banger, setBanger] = useState(null);
    useEffect(() => {
        document.body.classList.add("banger-page");

        return () => {
            document.body.classList.remove("banger-page");
        };
    }, []);
    const openBanger = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const { data } = await Axios.get("/api/banger");

            setBanger(data);
        } catch (err) {
            console.error(err);
        } finally {
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
                    src="/basic.png"
                    alt="Banger Box"
                    className={loading ? "loading" : ""}
                />
            </button>

            {banger && (
                <div className="banger-result">
                    {banger.message}
                </div>
            )}
        </div>
    )
}

export default Banger
