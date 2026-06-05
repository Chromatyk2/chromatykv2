import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { getColorSync, getPaletteSync } from 'colorthief';
import moment from "moment";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileSkins from "../components/profile/ProfileSkins";
import ProfileCompanions from "../components/profile/ProfileCompanions";
import ProfileExpeditions from "../components/profile/ProfileExpeditions";
import Loader from "../components/Loader.js";

function Profil() {
    const [cookies] = useCookies();
    const [searchParams] = useSearchParams();
    const param = searchParams.get("user");
    const currentUser = param || cookies?.user?.id;
    const [profileData, setProfileData] = useState(null);
    const [tab, setTab] = useState(1);
    const isOwner = !param || cookies?.user?.id === currentUser;
    useEffect(() => {
        if (!currentUser) return;
        loadProfile();
    }, [currentUser]);
    async function loadProfile() {
        try {
            const response =
                await Axios.get(
                    `/api/profile/${currentUser}`
                );
            setProfileData(
                response.data
            );
        } catch (err) {
            console.error(err);
        }
    }
    if (!profileData) {
        return <Loader />;
    }
    return (
        <div className="globalContainerCenter">
            <h2 className="wood-sign">
                Carte de dresseur
            </h2>
            <div className={"profilContainer"}>
                <ProfileHeader
                    profile={profileData.profile}
                    companion={profileData.activeCompagnon}
                    color={profileData.color}
                />
                <ProfileTabs
                    tab={tab}
                    setTab={setTab}
                    profileData={profileData}
                 />
                <div className={"profilBody"}>
                    {tab === 1 && (
                        <ProfileStats
                            profileData={profileData}
                        />
                    )}
                    {tab === 2 && (
                        <ProfileSkins
                            profileData={profileData}
                            reload={loadProfile}
                            isOwner={isOwner}
                        />
                    )}
                    {tab === 3 && (
                        <ProfileCompanions
                            profileData={profileData}
                            reload={loadProfile}
                        />
                    )}
                    {tab === 4 && (
                        <ProfileExpeditions
                            profileData={profileData}
                            reload={loadProfile}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Profil;