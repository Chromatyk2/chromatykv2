function AchievementsPage({achievements}) {
    const GEN_NAMES = {
        1: "Kanto",
        2: "Johto",
        3: "Hoenn",
        4: "Sinnoh",
        5: "Unys",
        6: "Kalos",
        7: "Alola",
        8: "Galar",
        9: "Paldea"
    };
    const achievementsDisplay =
        achievements?.normal.map(
            normal => {
                const shiny =
                    achievements.shiny.find(
                        s =>
                            s.gen ===
                            normal.gen
                    );
                const shadow =
                    achievements.shadow.find(
                        s =>
                            s.gen ===
                            normal.gen
                    );
                return {
                    gen:
                        normal.gen,
                    name:
                        GEN_NAMES[
                        normal.gen
                        ],
                    normal,
                    shiny,
                    shadow
                };
            }
        ) || [];
    const [achievements, setAchievements] =
        useState(null);
    useEffect(() => {
        loadAchievements();
    }, []);
    async function loadAchievements() {
        try {
            const response =
                await Axios.get(
                    `/api/profile/${id}/achievements`
                );

            setAchievements(
                response.data
            );
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="achievementsPage">
            <h2 className="wood-sign">
                Hall des Succès
            </h2>
            {achievements.map(
                generation => (
                    <div
                        key={generation.gen}
                        className="achievementGeneration"
                    >
                        <h3>
                            {
                                generation.name
                            }
                        </h3>
                        <div className="achievementGrid">
                            {generation.success.map(
                                success => (
                                    <AchievementCard
                                        key={
                                            success.title
                                        }
                                        {...success}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}