export default function PokemonAura({ pokemonNumber }) {

    return (
        <div
            className="pokemonAura"
            style={{
                WebkitMaskImage: `url(/Masks/${pokemonNumber}.png)`,
                maskImage: `url(/Masks/${pokemonNumber}.png)`
            }}
        />
    );
}