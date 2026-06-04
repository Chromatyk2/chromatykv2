import Axios from "axios";
import { useEffect, useState } from "react";
function TwitchLiveWidget() {
    const [isLive, setIsLive] = useState(false);
    const [title, setTitle] = useState("");
    const [minimized, setMinimized] = useState(
        localStorage.getItem("twitchMinimized") === "true"
    );

    const toggle = () => {
        const next = !minimized;

        setMinimized(next);
        localStorage.setItem("twitchMinimized", next);
    };

    useEffect(() => {

        const checkLive = () => {

            Axios.get("/api/twitch/live")
                .then((res) => {

                    setIsLive(res.data.live);
                    setTitle(res.data.title);

                });

        };

        checkLive();

        const interval =
            setInterval(checkLive, 30000);

        return () => clearInterval(interval);

    }, []);
    if (!isLive) return null;
    return (
        <>
            {minimized ? (
                <div
                    className="twitchLiveBadge"
                    onClick={toggle}
                >
                    🎥 LIVE
                </div>
            ) : (
                <div className="twitchWidget">
                    <div className="twitchWidgetHeader">
                            <span>🔴 {title}</span>

                        <button
                            className="twitchWidgetButton"
                            onClick={toggle}
                        >
                            —
                        </button>
                    </div>

                    <iframe
                        title="Twitch Stream"
                        src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr"
                        width="100%"
                        height="180"
                        allowFullScreen
                    />
                </div>
            )}
        </>
    );
}

export default TwitchLiveWidget;