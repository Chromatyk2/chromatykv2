import React from "react";
import "./LegalPages.css";

export default function Confidentialite() {
  return (
    <main className="legalPage">
      <article className="legalContent">
        <h1>Politique de confidentialité</h1>
        <p className="legalUpdated">Dernière mise à jour : 27 octobre 2026</p>

        <p>
          Cette politique décrit la manière dont Chromatyk traite les données
          personnelles nécessaires au fonctionnement du site et de ses
          fonctionnalités liées à Twitch et à la progression des joueurs.
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement est l’éditeur de Chromatyk, qui exploite
          le site à titre personnel.
        </p>
        <p>
          Contact : <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>
        </p>

        <h2>2. Données susceptibles d’être traitées</h2>
        <h3>Données liées à Twitch</h3>
        <p>
          Lorsqu’un utilisateur se connecte via Twitch, le site peut traiter les
          informations nécessaires à son identification, telles que son
          identifiant Twitch, son pseudonyme, son avatar si celui-ci est récupéré,
          et les informations techniques de session.
        </p>
        <h3>Données de jeu</h3>
        <p>
          Pour sauvegarder la progression, Chromatyk peut enregistrer le profil
          de jeu, l’inventaire, les ressources virtuelles, les cartes obtenues,
          les collections, les Pokémon capturés, les compagnons, les niveaux,
          l’expérience et les succès.
        </p>
        <h3>Données techniques</h3>
        <p>
          Des données techniques nécessaires à la connexion, à la gestion des
          sessions et à la sécurité peuvent être traitées. Leur nature dépend
          de la configuration réelle du serveur et des prestataires utilisés.
        </p>

        <h2>3. Finalités et bases légales</h2>
        <ul>
          <li>Authentifier les utilisateurs et gérer leur compte : exécution du service demandé.</li>
          <li>Sauvegarder et restituer la progression : exécution du service demandé.</li>
          <li>Assurer la sécurité et prévenir les abus : intérêt légitime, lorsqu’il est applicable et justifié.</li>
          <li>Répondre aux demandes et respecter les obligations légales : selon l’obligation ou la base légale applicable.</li>
        </ul>

        <h2>4. Connexion via Twitch</h2>
        <p>
          La connexion via Twitch permet d’identifier l’utilisateur et d’associer
          son compte à sa progression sur Chromatyk. Les données récupérées
          dépendent des autorisations et des fonctionnalités réellement utilisées.
          Chromatyk ne demande pas le mot de passe Twitch directement.
        </p>
        <p>
          L’utilisation de Twitch reste soumise aux conditions et à la politique
          de confidentialité de ce service.
        </p>

        <h2>5. Destinataires et prestataires</h2>
        <p>
          Les données peuvent être accessibles à l’éditeur et aux prestataires
          techniques nécessaires au fonctionnement du site, notamment Cloudflare
          pour le frontend et, selon la configuration, Clever Cloud pour le
          backend ou la base de données, ainsi qu’à Twitch pour les fonctions
          d’intégration concernées.
        </p>
        <p>Chromatyk ne vend pas les données personnelles à des fins publicitaires.</p>
        <p>
          Les éventuels transferts de données hors de l’Union européenne doivent
          être encadrés conformément à la réglementation applicable.
        </p>

        <h2>6. Durée de conservation</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire aux finalités
          pour lesquelles elles sont traitées. Les données du compte et la
          progression associée sont conservées tant que le compte demeure actif,
          sauf demande de suppression ou autre motif justifiant une durée différente.
        </p>
        <p>
          Les durées de conservation des sessions et des journaux techniques
          dépendent des paramètres réellement configurés chez les prestataires.
          Elles doivent être vérifiées et limitées à ce qui est nécessaire.
        </p>

        <h2>7. Droits des utilisateurs</h2>
        <p>
          Selon les conditions prévues par la réglementation, les utilisateurs
          peuvent demander l’accès à leurs données, leur rectification, leur
          effacement, la limitation du traitement, s’opposer à certains traitements
          et demander la portabilité lorsque ce droit est applicable. Ils peuvent
          également retirer leur consentement lorsqu’un traitement repose sur celui-ci.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>.
          Une réponse est généralement apportée dans un délai d’un mois, sous
          réserve des règles et exceptions applicables.
        </p>
        <p>
          Une réclamation peut être adressée à la CNIL :{" "}
          <a href="https://www.cnil.fr/" target="_blank" rel="noreferrer">www.cnil.fr</a>.
        </p>

        <h2>8. Suppression d’un compte</h2>
        <p>
          Chromatyk ne propose pas actuellement de bouton de suppression
          automatique du compte. Pour demander la suppression d’un compte et des
          données personnelles associées, écrivez à{" "}
          <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>.
        </p>
        <p>
          Indiquez le pseudonyme et, si possible, l’identifiant Twitch associé
          afin de permettre l’identification du compte. Des vérifications
          proportionnées peuvent être demandées pour éviter une suppression
          effectuée à la demande d’une personne non autorisée.
        </p>
        <p>
          La demande sera traitée dans les délais légaux. Certaines informations
          peuvent être conservées lorsqu’une obligation légale ou un motif prévu
          par la réglementation le justifie.
        </p>

        <h2>9. Sécurité</h2>
        <p>
          L’éditeur met en œuvre des mesures techniques et organisationnelles
          adaptées pour protéger les données. Aucune mesure ne peut toutefois
          garantir un risque nul.
        </p>

        <h2>10. Modification de la politique</h2>
        <p>
          Cette politique peut être mise à jour en cas d’évolution du site, de
          ses fonctionnalités ou de la réglementation. La date de mise à jour
          figure en haut de la page.
        </p>

        <h2>11. Contact</h2>
        <p>
          Pour toute question relative aux données personnelles :{" "}
          <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>
        </p>
      </article>
    </main>
  );
}
