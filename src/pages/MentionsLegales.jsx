import React from "react";
import "./LegalPages.css";

export default function MentionsLegales() {
  return (
    <main className="legalPage">
      <article className="legalContent">
        <h1>Mentions légales</h1>
        <p className="legalUpdated">Dernière mise à jour : 27 octobre 2026</p>

        <h2>1. Éditeur du site</h2>
        <p>
          Le site <strong>Chromatyk</strong>, accessible à l’adresse{" "}
          <a href="https://chromatyk.fr">https://chromatyk.fr</a>, est édité à
          titre non professionnel par un particulier.
        </p>
        <p>
          Contact : <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>
        </p>
        <p>
          L’éditeur peut demander à son hébergeur de préserver la confidentialité
          de son identité publique dans les conditions prévues par la loi pour
          la confiance dans l’économie numérique (LCEN), sous réserve de lui
          communiquer les informations requises.
        </p>

        <h2>2. Directeur de la publication</h2>
        <p>Le directeur de la publication est l’éditeur du site.</p>

        <h2>3. Hébergement</h2>
        <p>
          Le frontend du site est hébergé par <strong>Cloudflare Pages</strong>.
          Les services backend et la base de données peuvent être hébergés par
          <strong> Clever Cloud</strong>, selon la configuration technique du site.
        </p>
        <ul>
          <li>
            Cloudflare :{" "}
            <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer">
              https://www.cloudflare.com/
            </a>
          </li>
          <li>
            Clever Cloud :{" "}
            <a href="https://www.clever-cloud.com/" target="_blank" rel="noreferrer">
              https://www.clever-cloud.com/
            </a>
          </li>
        </ul>
        <p>
          Les informations précises relatives à l’hébergement doivent être
          vérifiées selon les services effectivement utilisés.
        </p>

        <h2>4. Propriété intellectuelle</h2>
        <p>
          Le code, les textes et les créations originales propres à Chromatyk
          sont protégés par les règles applicables en matière de propriété
          intellectuelle, sous réserve des droits des tiers.
        </p>
        <p>
          Les marques, noms, logos, personnages, illustrations et cartes
          appartenant à des tiers restent la propriété de leurs titulaires
          respectifs. Leur présence sur le site ne signifie pas que Chromatyk
          est affilié à ces titulaires.
        </p>

        <h2>5. Marques et contenus de tiers</h2>
        <p>
          Chromatyk est un projet indépendant. Il n’est pas affilié à Nintendo,
          The Pokémon Company, Game Freak ou Creatures Inc. Les marques et
          contenus cités appartiennent à leurs propriétaires respectifs.
        </p>
        <p>
          Certaines fonctionnalités peuvent utiliser des services tiers,
          notamment Twitch, soumis à leurs propres conditions d’utilisation.
        </p>

        <h2>6. Disponibilité du site</h2>
        <p>
          L’éditeur s’efforce de maintenir le site accessible, sans garantir une
          disponibilité permanente. Des interruptions peuvent survenir pour
          maintenance, mise à jour ou incident technique. Cette disposition ne
          limite pas les responsabilités qui ne peuvent légalement être exclues.
        </p>

        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant le site :{" "}
          <a href="mailto:chromatyk.contact@gmail.com">chromatyk.contact@gmail.com</a>
        </p>
      </article>
    </main>
  );
}
