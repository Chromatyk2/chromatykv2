import { useState } from "react";
function TwitchLiveWidget() {
    const [minimized, setMinimized] = useState(
        localStorage.getItem("twitchMinimized") === "true"
    );

    const toggle = () => {
        const next = !minimized;

        setMinimized(next);
        localStorage.setItem("twitchMinimized", next);
    };

    const isLive = true; // remplacé plus tard par l'API Twitch

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
                        <span>🔴 Chromatyk en live</span>

                        <button
                            className="twitchWidgetButton"
                            onClick={toggle}
                        >
                            —
                        </button>
                    </div>

                    <iframe
                        title="Twitch Stream"
                        src="https://player.twitch.tv/?channel=jltomy&parent=chromatyk.fr"
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