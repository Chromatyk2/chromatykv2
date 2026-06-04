import { useEffect } from "react";
import Axios from "axios";
import { useCookies } from 'react-cookie';

function Log() {

    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(() => {
        const code =
            new URLSearchParams(window.location.search)
                .get("code");

        if (!code) {
            window.location.href = "/";
            return;
        }
        Axios.post("/api/auth/twitch", {
            code
        })
            .then((res) => {

                setCookie(
                    "user",
                    res.data.user,
                    {
                        path: "/"
                    }
                );

                window.location.href = "/";
            });

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