import { createClient} from "./index.js"

export async function main() {
    console.log("PokeApi initialized");
    const pokeApi = createClient();
    
    console.log("Get a specific Pockemon:");
    const pockemon = await pokeApi.pockemon.get("pikachu")
    console.dir(pockemon, { depth: null });

    console.log("Pockemon List:");
    const pockemonList = await pokeApi.pockemon.list(10, 1);
    console.dir(pockemonList, { depth: null });

    console.log("Get Pockemon generation");
    const generation = await pokeApi.generation.get("generation-i");
    console.log("Generation:", generation);

    console.log("Get Pockemon generation list:");
    const generationList = await pokeApi.generation.list(5, 0);
    console.dir(generationList, { depth: null });

}

main().catch(console.error);