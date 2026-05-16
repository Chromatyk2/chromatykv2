import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import { Navigate } from "react-router-dom";


function AuthService() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = "https://chromatykv2.netlify.app/";
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

    const encodeQueryString = (params) => {
        const queryString = new URLSearchParams();
        for (let paramName in params) {
            queryString.append(paramName, params[paramName]);
        }
        return queryString.toString();
    };

    const authentication = () => {
        const params = {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "code"
        };
        const queryString = encodeQueryString(params);
        const authenticationUrl = `https://id.twitch.tv/oauth2/authorize?${queryString}`;
        window.location.href = authenticationUrl;
    };

    const decodeQueryString = (string) => {
        const params = {};
        const queryString = new URLSearchParams(string);
        for (let [paramName, value] of queryString) {
            params[paramName] = value;
        }
        return params;
    };

    const getUrlParams = () => {
        const queryParameters = new URLSearchParams(window.location.search);
        return decodeQueryString(queryParameters);
    };

    const isAuthenticated = () => {
        const params = getUrlParams();
        if (Object.keys(params).length > 0) {
            setCookie('oauth', params.code, { days: 1 });
            Axios.post(
                'https://id.twitch.tv/oauth2/token',
                {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: params.code,
                    grant_type: "authorization_code",
                    redirect_uri: "https://chromatykv2.netlify.app"
                }
            )
                .then(
                    (result) => {
                        setCookie('token', result.data, { days: 1 });
                        Axios.get(
                            'https://api.twitch.tv/helix/users',
                            {
                                headers: {
                                    'Authorization': `Bearer ${result.data.access_token}`,
                                    'Client-Id': CLIENT_ID
                                }
                            }
                        )
                            .then(
                                (result) => {
                                    setCookie('user', result.data, { days: 1 });
                                }
                            )
                    }
                );
        }
        return params["access_token"] !== undefined;
    }

    useEffect(() => {
        isAuthenticated();
    }, []);

    return (
        <button className="loginButton" onClick={authentication}><i class="fa-brands fa-twitch"></i>Connexion</button>
    )
}
export default AuthService;
