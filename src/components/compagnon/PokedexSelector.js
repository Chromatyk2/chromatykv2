import moment from "moment";
function PokedexSelector({
    pokedex,
    companions = [],
    onSelect
}) {
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
                                <img
                                    loading="lazy"
                                    className="dexSprite"
                                    style={{
                                        filter:
                                            val.negative === 1
                                                ? "invert(1)"
                                                : "invert(0)"
                                    }}
                                    src={
                                        `/Sprites/${val.shiny === 1
                                            ? "Shiny"
                                            : "Normal"
                                        }/${val.pokemon
                                        }.gif`
                                    }
                                    alt={val.name}
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