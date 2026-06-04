function AuthService() {

    const CLIENT_ID =
        process.env.REACT_APP_CLIENT_ID;

    const authentication = () => {

        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: "https://chromatyk.fr/log",
            response_type: "code"
        });

        window.location.href =
            `https://id.twitch.tv/oauth2/authorize?${params}`;
    };

    return (
        <button
            className="loginButton"
            onClick={authentication}
        >
            <i className="fa-brands fa-twitch"></i>
            Connexion
        </button>
    );
}

export default AuthService;