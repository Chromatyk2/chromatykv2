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
                            {generation.name}
                        </h3>
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
    );
}
export default AchievementsPage;