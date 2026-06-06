import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Fight from "../components/fight";
import { useAuth } from "../context/AuthContext";
import AchievementCard from "../components/achievement/AchievementCard";
function AchievementsPage() {
    const { user } = useAuth();
    const [
        achievements,
        setAchievements
    ] = useState([]);
    useEffect(() => {

        if (!user?.id) {
            return;
        }

        loadAchievements();

    }, [user?.id]);
    async function loadAchievements() {
        try {
            const response =
                await Axios.get(
                    `/api/profile/${user.id}/achievements`
                );
            setAchievements(
                response.data
            );
        } catch (err) {
            console.error(
                err
            );
        }
    }
    const allSuccess =
        achievements.flatMap(
            generation =>
                generation.success
        );

    const unlocked =
        allSuccess.filter(
            success =>
                success.owned >= success.total
        ).length;

    const totalAchievements =
        allSuccess.length;

    const progress =
        totalAchievements > 0
            ? Math.floor(
                unlocked /
                totalAchievements *
                100
            )
            : 0;
    return (
        <div className="globalContainerCenter">
        <div className="achievementsPage">
            <h2 className="wood-sign">
                Hall des Succès
            </h2>
            <div className="achievementSummary">

                <div className="achievementSummaryTitle">
                    🏆 {unlocked} / {totalAchievements}
                    {" "}
                    succès débloqués
                </div>

                <div className="achievementSummaryBar">

                    <div
                        className="achievementSummaryFill"
                        style={{
                            width:
                                `${progress}%`
                        }}
                    />

                </div>

                <div className="achievementSummaryPercent">
                    {progress}%
                </div>

            </div>
            {achievements.map(
                generation => (
                    <div
                        key={generation.gen}
                        className="achievementGeneration"
                    >

                        <div className="achievementGenerationHeader">

                            <h3>
                                {generation.name}
                            </h3>

                        </div>

                        <div
                            className="achievementGrid"
                        >

                            {generation.success.map(
                                success => (

                                    <AchievementCard
                                        key={
                                            `${generation.gen}-${success.type}`
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
        </div>
    );
}
export default AchievementsPage;