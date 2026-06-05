import { useEffect } from "react";
import Axios from "axios";

function Log() {
        useEffect(() => {
        const code =
            new URLSearchParams(
                window.location.search
            ).get("code");
        if (!code) {
            window.location.href = "/";
            return;
        }
        Axios.post(
            "/api/auth/twitch",
            { code },
            {
                withCredentials: true
            }
        )
            .then(() => {
                window.location.href = "/";
            })
            .catch(console.error);

    }, []);
    return (
        <div className="globalContainerCenter">
            <h2 className="wood-sign">
                Connexion Twitch...
            </h2>

            <p>
                Authentification en cours.
            </p>
        </div>
    );

}
export default Log;