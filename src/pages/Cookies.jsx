import React from "react";
import "./LegalPages.css";

export default function Cookies() {
  return (
    <main className="legalPage">
      <article className="legalContent">
        <h1>Politique relative aux cookies</h1>
        <p className="legalUpdated">Dernière mise à jour : 27 octobre 2026</p>

        <h2>1. Qu’est-ce qu’un cookie ?</h2>
        <p>
          Un cookie est un petit fichier enregistré sur le terminal d’un
          utilisateur lors de la consultation d’un site internet. D’autres
          technologies peuvent également être utilisées pour assurer le
          fonctionnement d’un service ou mémoriser des informations.
        </p>

        <h2>2. Utilisation sur Chromatyk</h2>
        <p>
          Chromatyk n’utilise actuellement aucun outil publicitaire ni outil
          d’analyse d’audience. Le site peut utiliser des cookies ou mécanismes
          similaires strictement nécessaires à son fonctionnement, notamment
          pour maintenir une session, authentifier un utilisateur et sécuriser
          les échanges avec le serveur.
        </p>
        <p>
          La liste exacte des cookies dépend de la configuration technique du
          site et des services tiers intégrés. Elle doit être vérifiée
          périodiquement.
        </p>

        <h2>3. Cookies strictement nécessaires</h2>
        <p>
          Les cookies strictement nécessaires à l’authentification ou à la
          fourniture d’un service expressément demandé par l’utilisateur peuvent
          être exemptés de consentement préalable, conformément à la réglementation
          applicable. Ils ne doivent pas être utilisés à des fins incompatibles
          avec cette nécessité.
        </p>

        <h2>4. Services tiers</h2>
        <p>
          Certaines fonctionnalités peuvent faire appel à des services tiers,
          notamment Twitch. Selon les fonctionnalités intégrées, ces services
          peuvent déposer leurs propres cookies ou utiliser d’autres traceurs.
          Il convient de vérifier les traceurs effectivement activés et de
          recueillir le consentement préalable lorsque la réglementation l’exige.
        </p>

        <h2>5. Consentement et choix de l’utilisateur</h2>
        <p>
          Si Chromatyk utilise des traceurs soumis au consentement préalable,
          ceux-ci ne doivent pas être activés avant le recueil du consentement.
          L’utilisateur doit pouvoir refuser aussi facilement qu’accepter et
          pouvoir modifier ou retirer son choix ultérieurement.
        </p>
        <p>
          Si le site n’utilise que des cookies exemptés de consentement, une
          bannière de consentement n’est pas nécessaire pour ces seuls cookies.
        </p>

        <h2>6. Paramètres du navigateur</h2>
        <p>
          L’utilisateur peut gérer certains cookies depuis les paramètres de
          son navigateur. Le blocage des cookies nécessaires peut empêcher le
          fonctionnement de certaines fonctionnalités, notamment la connexion.
        </p>

        <h2>7. Mise à jour</h2>
        <p>
          Cette politique pourra être mise à jour si de nouveaux services,
          cookies ou traceurs sont intégrés à Chromatyk.
        </p>

        <h2>8. Contact</h2>
        <p>
          Pour toute question concernant les cookies :{" "}
          <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>
        </p>
      </article>
    </main>
  );
}
