function ProfileTabs({
    tab,
    setTab,
    profileData
}) {
    const skinsRemaining =
        Math.max(
            0,
            profileData.profile.level -
            profileData.skins.length
        );
    return (
        <div className="filterProfil">
            <button
                className={
                    tab === 1
                        ? "active"
                        : ""
                }
                onClick={() => setTab(1)}
            >
                Profil
            </button>
            <button
                className={
                    tab === 2
                        ? "active"
                        : ""
                }
                onClick={() => setTab(2)}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px"
                }}
            >
                Skins
                {skinsRemaining > 0 && (
                    <p
                        className="rank"
                        style={{
                            margin: 0,
                            marginLeft: "5px",
                            fontSize: "15px",
                            width: "1rem",
                            height: "1rem"
                        }}
                    >
                        {skinsRemaining}
                    </p>
                )}
            </button>
            <button
                className={
                    tab === 3
                        ? "active"
                        : ""
                }
                onClick={() => setTab(3)}
            >
                Compagnons N.100
            </button>
            <button
                className={
                    tab === 4
                        ? "active"
                        : ""
                }
                onClick={() => setTab(4)}
            >
                Expédition
            </button>
            <button
                className={
                    tab === 5
                        ? "active"
                        : ""
                }
                onClick={() => setTab(5)}
            >
                Mes Titres
            </button>
        </div>
    );
}
export default ProfileTabs;