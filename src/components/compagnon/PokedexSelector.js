import moment from "moment";
import { useState, useRef } from "react";
import ShadowSmokeFrontDex from "../shadowSmokeFrontDex";
import ShadowSmokeBackDex from "../shadowSmokeBackDex";
function PokedexSelector({
    pokedex,
    companions = [],
    onSelect
}) {
    const pokemonContainerRef = useRef(null);
    return (
        <>
            {pokedex?.map((val) => {
                const companion =
                    companions.find(
                        (item) =>
                            item.number ===
                            val.pokemon &&
                            item.shiny ===
                            val.shiny &&
                            item.negative ===
                            val.negative
                    );
                return (
                    <div
                        key={`${val.pokemon}-${val.shiny}-${val.negative}`}
                        onClick={() =>
                            onSelect?.(val)
                        }
                        className="dexCard"
                    >
                        <div className="dexSpriteContainer">

                            <span className="dexNumber">
                                #{val.pokemon}
                            </span>
                            <div>

                                <span className={"dexNumber"}>#{val.pokemon}</span>
                                {val.negative === 1 && <ShadowSmokeBackDex targetRef={pokemonContainerRef} />}
                                {val.negative === 1 && <ShadowSmokeFrontDex targetRef={pokemonContainerRef} />}
                                <img style={{ maxHeight: "63px", width: "auto", maxWidth: "100%" }} className={val.negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                    src={`/Sprites/${val.shiny === 1 ? "shiny" : "normal"}/${val.pokemon}.gif`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="dexDescription">
                            <p className="dexName">
                                {val.name}
                            </p>
                            <p className="dexDate">
                                {
                                    moment(
                                        val.date
                                    )
                                        .utc()
                                        .format(
                                            "DD/MM/YYYY"
                                        )
                                }
                            </p>
                            {companion && (
                                <p
                                    className="companionLevel"
                                >
                                    {
                                        companion.level === 100
                                            ? "⭐ Nv.100"
                                            : `Nv.${companion.level}`
                                    }
                                </p>
                            )}
                            {companion?.active === 1 && (
                                <p
                                    className="activeCompanion"
                                >
                                    Actif
                                </p>
                            )}
                        </div>

                    </div>

                );

            })}
        </>
    );
}
export default PokedexSelector;