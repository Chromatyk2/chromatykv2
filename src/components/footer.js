import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css'

function Footer(props) {
      return (
        <>
          <div className={"footerContainer"}>
            <p>© 2025 Pokémon. © 1995–2025 Nintendo/Creatures Inc./GAME FREAK Inc. est une marque déposée par The Pokémon Company International, Game Freak et Nintendo</p>
            <p>© Chromatyk 2023</p>
            <p>Les images appartiennent à leur auteur respectif. Site fait par un fan pour des fans.</p><Link className="navLink mentionLink" to="/Mentions">Mentions légales</Link>
          </div>
        </>
      );
  }
export default Footer
