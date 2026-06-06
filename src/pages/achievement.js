import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import moment from "moment";
import Fight from "../components/fight";
import { useAuth } from "../context/AuthContext";
import AchievementCard from "../components/achievement/AchievementCard";
function AchievementsPage() {
    const { user } = useAuth();
    const [
        achievements,
        setAchievements
    ] = useState([]);
    const [
        selectedCategory,
        setSelectedCategory
    ] = useState("ultimate");
    const categories =
        Object.entries(
            groupedAchievements
        );
    const currentCategory =
        groupedAchievements[
        selectedCategory
        ];
    useEffect(() => {
        if (
            !selectedCategory &&
            categories.length
        ) {
            setSelectedCategory(
                categories[0][0]
            );
        }
    }, [achievements]);
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
    const unlocked =
        achievements.filter(
            achievement =>
                achievement.completed
        ).length;
    const totalAchievements =
        achievements.length;
    const progress =
        totalAchievements > 0
            ? Math.floor(
                unlocked /
                totalAchievements * 100
            )
            : 0;
    const groupedAchievements =
        achievements.reduce(
            (groups, achievement) => {

                if (
                    !groups[
                    achievement.category
                    ]
                ) {

                    groups[
                        achievement.category
                    ] = {
                        label:
                            achievement.label,
                        icon:
                            achievement.icon,
                        achievements: []
                    };

                }

                groups[
                    achievement.category
                ].achievements.push(
                    achievement
                );

                return groups;

            },
            {}
        );
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
                <div className="achievementTabs">

                    {
                        categories.map(
                            ([category, group]) => (

                                <button
                                    key={category}
                                    className={
                                        `achievementTab ${selectedCategory ===
                                            category
                                            ? "active"
                                            : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setSelectedCategory(
                                            category
                                        )
                                    }
                                >

                                    {group.icon}
                                    {" "}
                                    {group.label}

                                </button>

                            )
                        )
                    }

                </div>
                {
                    currentCategory && (

                        <section
                            className="achievementSection"
                        >

                            <h2
                                className="achievementSectionTitle"
                            >

                                {
                                    currentCategory.icon
                                }

                                {" "}

                                {
                                    currentCategory.label
                                }

                            </h2>

                            <div
                                className="achievementGrid"
                            >

                                {
                                    currentCategory.achievements.map(
                                        achievement => (

                                            <AchievementCard
                                                key={achievement.code}
                                                achievement={
                                                    achievement.achievement
                                                }
                                                description={
                                                    achievement.description
                                                }
                                                rewardTitle={
                                                    achievement.reward_title
                                                }
                                                owned={
                                                    achievement.progress
                                                }
                                                total={
                                                    achievement.target
                                                }
                                                type={
                                                    achievement.category
                                                }
                                            />

                                        )
                                    )
                                }

                            </div>

                        </section>

                    )
                }
            </div>
        </div>
    );
}
export default AchievementsPage;